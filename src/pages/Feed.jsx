import { useState } from "react";
import { useQuery } from "react-query";
import { fetchPost } from '../services/fetchPost.js';
import Loader from '../components/Loader/Loader.jsx'
import { useNavigate } from "react-router-dom";
import Comments from "../components/CommentBox/Comments.jsx";
import { removeAuthToken } from "../helpers/cookieUtils.js";
import CreatePostPopup from "../components/CreatePostPopup/CreatePostPopup.jsx";


function Feed() {
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const [showComments, setShowComments] = useState(false);
    const [currentComments, setCurrentComments] = useState([]);
    const [postId, setPostId] = useState("");
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

    function handleLogout() {
        removeAuthToken();
        navigate('/');
    }

    const { data, isLoading, isError, error } = useQuery(['posts', page], () => fetchPost(page));

    if(isError) {
        return <div>Error : {error.message}</div>
    }

    if(isLoading) {
        return <Loader />
    }

    function handleCommentClick(comments, id) {
        setPostId(id);
        setCurrentComments(comments);
        setShowComments(true);
    }

    function closeComment() {
        setShowComments(false);
        setCurrentComments([]);
    }

    function handleFeedIconClick() {
        navigate('/feed');
    }

    function openCreatePost() {
        setIsCreatePostOpen(true);
    }

    function closeCreatePost() {
        setIsCreatePostOpen(false);
    }
     
    return(
        <div className="flex h-screen overflow-hidden">
            <nav className="flex flex-col justify-between border-r border-gray-700 px-8 py-7 text-2xl">
                <div className="flex gap-3 items-center text-white">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s" alt="" className="w-8 h-8 border rounded-full"/>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex gap-3 items-center cursor-pointer">
                        <i className="fa-regular fa-user"></i>Profile
                    </div>
                    <div className="flex gap-3 items-center cursor-pointer" onClick={handleFeedIconClick}>
                        <i className="fa-regular fa-compass"></i>Feed
                    </div>
                    <div className="flex gap-3 items-center cursor-pointer" onClick={openCreatePost}>
                        <i className="fa-solid fa-circle-plus"></i>Create
                    </div>
                    <CreatePostPopup isOpen={isCreatePostOpen} onClose={closeCreatePost} />
                </div>
                <div className="flex gap-3 items-center cursor-pointer" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>Logout
                </div>
            </nav>
            <main className="flex-1 overflow-y-auto pt-12 px-4">
                <div className="flex flex-col items-start ml-[100px]">
                    {isLoading && <Loader/>}
                    {data && data?.data?.posts?.map((post) => (
                        <div key={post._id} className="flex flex-col gap-4 mb-5 pb-10 border-b border-gray-700 w-[500px]">
                            <span className="font-bold text-white">
                                <i className="fa-solid fa-user mr-2"> :</i>
                                {post?.user?.username}
                            </span>
                            <img 
                                src={post.image} 
                                className="w-[468px] h-[468px]"
                            />
                            <div className="flex gap-6 items-center">
                                <div className="flex gap-2 items-center">
                                    <i className="fa-regular fa-heart"></i>
                                    { post?.likes?.length > 0 && <p className="font-semibold">{post?.likes?.length} Likes</p> }
                                </div>
                                <div className="flex gap-2 items-center" onClick={() => handleCommentClick(post.comments, post._id)}>
                                    <i className="fa-regular fa-comment"></i>
                                    { post?.comments?.length > 0 && <p className="font-semibold">{ post?.totalComments } { post?.totalComments == 1 ? "Comment" : "Comments" }</p> }
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
                        onClick={() => setPage(page-1)}
                        className="btn btn-primary rounded-full px-12 text-lg"
                    >
                        Prev 
                    </button>
                    <button 
                        className="btn btn-primary rounded-full px-12 text-lg"
                        onClick={() => setPage(page+1)}
                        >
                            Next
                        </button>
                </div>
                <Comments comments={currentComments} showComments={showComments} closeComment={closeComment} postId={postId} />
            </main>

        </div>
    );
}

export default Feed;