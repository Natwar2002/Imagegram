import { useState } from "react";
import { createComment } from '../../services/createComment.js';
import { useQuery } from "react-query";
import Loader from "../Loader/Loader.jsx";
import {getAllCommentsOfAPost} from '../../services/getAllCommentsOfAPost.js';

function Comments({ showComments, closeComment, commentableId }) {
    if (!showComments) return null;
    const [content, setContent] = useState('');
    const [visibleReplies, setVisibleReplies] = useState({});

    const { data: comments, isLoading, isError, error } = useQuery(
        ['comments', commentableId],
        () => getAllCommentsOfAPost(commentableId),
        { enabled: !!commentableId } // Only run query if commentableId exists
    );

    if(isError) {
        return <div>Error : {error.message}</div>
    }

    if(isLoading) {
        return <Loader />
    }

    const toggleRepliesVisibility = (commentId) => {
        setVisibleReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    function handleCommentContent(e) {
        setContent(e.target.value);
    }

    async function handleSubmit(e) {        
        e.preventDefault();
        try {
            const comment = await createComment({ content, onModel: "Post", commentableId });
            setContent('');
        } catch (error) {
            console.log("Error creating the comment: ",error);
        }
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg w-2/3 max-w-lg">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold mb-4 text-white">Comments</h2>
                    <button onClick={closeComment} className="text-white mb-4">
                        X
                    </button>
                </div>
                <ul>
                    {comments?.data?.map((comment) => (
                        <li key={comment._id} className="text-gray-300 mb-4">
                            <div className="flex justify-between">
                                <div className="mr-2">
                                    <p className="flex items-center gap-2">
                                        <img src={comment?.userId?.avatar} className="w-[30px] h-[30px] border rounded-full"/>
                                        <span>{comment?.userId?.username}</span>
                                        <span className="text-gray-500">{comment?.content?.trim()}</span>
                                    </p>
                                </div>
                                <i className="fa-regular fa-heart text-sm"></i>
                            </div>

                            <div className="flex text-[10px] mt-1 gap-4">
                                { comment?.likes && comment?.likes?.length > 0 && <div className="flex gap-1">
                                    <span>{comment?.likes?.length}</span>
                                    <span>{comment?.likes?.length == 1 ? "like" : "likes"}</span>
                                </div> }
                            
                                <div>Reply</div>
                            </div>

                            { visibleReplies[comment?._id] && (
                                <ul className="ml-5 mt-2">
                                    {comment.replies.map((reply) => (
                                        <li key={reply._id} className="text-gray-400 mb-2">
                                            <div>
                                                <span className="font-bold text-white mr-2">{reply.userId.username}</span>
                                                <span>{reply?.content?.trim()}</span>
                                            </div>
                                            <div className="flex text-[10px] mt-1 gap-4">
                                                { reply?.likes && reply?.likes?.length > 0 && <div className="flex gap-1">
                                                    <span>{reply?.likes?.length}</span>
                                                    <span>{reply?.likes?.length == 1 ? "like" : "likes"}</span>
                                                </div> }
                                            
                                                <div>Reply</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {comment?.replies?.length > 0 && <div onClick={() => toggleRepliesVisibility(comment._id)}>
                                <button className="text-[10px] ml-4 text-blue-500">
                                    {visibleReplies[comment._id] ? "Hide Replies" : "Show Replies"}
                                </button>
                            </div>}

                        </li>
                    ))}
                </ul>
                <form className="border-t border-gray-600 flex" onSubmit={handleSubmit}>
                    <input 
                        className="w-full bg-inherit outline-none"
                        value={content}
                        onChange={handleCommentContent}
                        placeholder="Add a comment..."
                        required
                    />
                    <button type="submit" className="text-blue-700">Post</button>
                </form>
            </div>
        </div>
    );
}

export default Comments;
