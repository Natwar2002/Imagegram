import { useState } from "react";

function Comments({ comments, showComments, closeComment }) {
    if (!showComments) return null;
    const [visibleReplies, setVisibleReplies] = useState({});

    const toggleRepliesVisibility = (commentId) => {
        setVisibleReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

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
                    {comments?.map((comment, index) => (
                        <li key={index} className="text-gray-300 mb-4">
                            <div className="flex justify-between">
                                <span className="text-white mr-2">
                                    <span className="font-bold">{comment?.userId?.username}</span>
                                    : {comment?.content?.trim()}
                                </span>
                                <i className="fa-regular fa-heart text-sm"></i>
                            </div>

                            <div className="flex text-[10px] mt-1 gap-4">
                                { comment?.likes && comment?.likes?.length > 0 && <div className="flex gap-1">
                                    <span>{comment?.likes?.length}</span>
                                    <span>{comment?.likes?.length == 1 ? "like" : "likes"}</span>
                                </div> }
                            
                                <div>Reply</div>
                            </div>

                            { visibleReplies[comment._id] && (
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

                            {comment?.replies?.length > 0 && <div onClick={()=> toggleRepliesVisibility(comment._id)}>
                                <button className="text-[10px] ml-4 text-blue-500">
                                    {visibleReplies[comment._id] ? "Hide Replies" : "Show Replies"}
                                </button>
                            </div>}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Comments;