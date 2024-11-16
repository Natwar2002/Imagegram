import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchPost } from "../services/fetchPost.js";
import Loader from "../components/Loader/Loader.jsx";
import { useNavigate } from "react-router-dom";
import Comments from "../components/CommentBox/Comments.jsx";
import { removeAuthToken } from "../helpers/cookieUtils.js";
import CreatePostPopup from "../components/CreatePostPopup/CreatePostPopup.jsx";
import { createLike } from "../services/createLike.js";
import { deleteLike } from "../services/deleteLike.js";

function Feed() {
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const [showComments, setShowComments] = useState(false);
    const [postId, setPostId] = useState("");
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

    const queryClient = useQueryClient();

    // Fetch posts
    const { data, isLoading, isError, error } = useQuery(['posts', page], () => fetchPost(page), {
        keepPreviousData: true,
    });

    // Like mutation
    const likeMutation = useMutation(createLike, {
        onMutate: async ({ postId }) => {
            await queryClient.cancelQueries(['posts', page]);
            const previousPosts = queryClient.getQueryData(['posts', page]);

            queryClient.setQueryData(['posts', page], (oldData) => {
                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        posts: oldData.data.posts.map((post) =>
                            post._id === postId
                                ? { ...post, totalLikes: post.totalLikes + 1, isLiked: true }
                                : post
                        ),
                    },
                };
            });

            return { previousPosts };
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['posts', page], context.previousPosts);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['posts', page]);
        },
    });

    // Unlike mutation
    const unlikeMutation = useMutation(deleteLike, {
        onMutate: async ({ postId }) => {
            await queryClient.cancelQueries(['posts', page]);
            const previousPosts = queryClient.getQueryData(['posts', page]);

            queryClient.setQueryData(['posts', page], (oldData) => {
                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        posts: oldData.data.posts.map((post) =>
                            post._id === postId
                                ? { ...post, totalLikes: post.totalLikes - 1, isLiked: false }
                                : post
                        ),
                    },
                };
            });

            return { previousPosts };
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['posts', page], context.previousPosts);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['posts', page]);
        },
    });

    const toggleLike = (postId, isLiked) => {  
        if (isLiked) {
            unlikeMutation.mutate({ postId, onModel: "Post" });
        } else {
            likeMutation.mutate({ postId, onModel: "Post" });
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <nav className="flex flex-col justify-between border-r border-gray-700 px-8 py-7 text-2xl">
                <div className="flex gap-3 items-center text-white">Imagegram</div>
                <div className="flex flex-col gap-6">
                    <div className="flex gap-3 items-center cursor-pointer" onClick={() => navigate('/profile')}>
                        <i className="fa-regular fa-user"></i>Profile
                    </div>
                    <div className="flex gap-3 items-center cursor-pointer" onClick={() => navigate('/feed')}>
                        <i className="fa-regular fa-compass"></i>Feed
                    </div>
                    <div className="flex gap-3 items-center cursor-pointer" onClick={() => setIsCreatePostOpen(true)}>
                        <i className="fa-solid fa-circle-plus"></i>Create
                    </div>
                    <CreatePostPopup isOpen={isCreatePostOpen} onClose={() => setIsCreatePostOpen(false)} />
                </div>
                <div className="flex gap-3 items-center cursor-pointer" onClick={() => {
                    removeAuthToken();
                    navigate('/');
                }}>
                    <i className="fa-solid fa-right-from-bracket"></i>Logout
                </div>
            </nav>
            <main className="flex-1 overflow-y-auto pt-12 px-4">
                <div className="flex flex-col items-start ml-[100px]">
                    {data?.data?.posts?.map((post) => (
                        <div key={post._id} className="flex flex-col gap-4 mb-5 pb-10 border-b border-gray-700 w-[500px]">
                            <span className="font-bold text-white flex items-center gap-2">
                                <img src={post?.user?.avatar} className="w-[30px] h-[30px] border rounded-full" alt="User Avatar" />
                                {post?.user?.username}
                            </span>
                            <img src={post.image} className="w-[468px] h-[468px]" alt="Post Content" />
                            <div className="flex gap-6 items-center">
                                <div className="flex gap-2 items-center cursor-pointer" onClick={() => toggleLike(post._id, post.isLiked)}>
                                    <i className={`fa-solid fa-heart ${post.isLiked ? 'text-red-500' : ''}`}></i>
                                    <p className="font-semibold">{post.totalLikes} {post.totalLikes === 1 ? "Like" : "Likes"}</p>
                                </div>
                                <div className="flex gap-2 items-center cursor-pointer" onClick={() => {
                                    setPostId(post._id);
                                    setShowComments(true);
                                }}>
                                    <i className="fa-regular fa-comment"></i>
                                    {post.comments.length > 0 && <p className="font-semibold">{post.totalComments} {post.totalComments === 1 ? "Comment" : "Comments"}</p>}
                                </div>
                            </div>
                            <div className="flex">
                                <span className="font-bold text-white mr-2">{post?.user?.username}</span>{post.caption}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-4 justify-center items-center">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                        className="btn btn-primary rounded-full px-12 text-lg"
                    >
                        Prev
                    </button>
                    <button
                        disabled={data?.data?.posts?.length === 0}
                        onClick={() => setPage(page + 1)}
                        className="btn btn-primary rounded-full px-12 text-lg"
                    >
                        Next
                    </button>
                </div>
                <Comments showComments={showComments} closeComment={() => setShowComments(false)} commentableId={postId} />
            </main>
        </div>
    );
}

export default Feed;