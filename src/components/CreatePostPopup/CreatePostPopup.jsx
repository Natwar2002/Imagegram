import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../helpers/cookieUtils";
import Input from "../Inputs/Input";
import { createPost } from "../../services/createPost";

function CreatePostPopup({ isOpen, onClose }) {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const navigate = useNavigate();

    function handleImageChange(event) {
        setImage(event.target.files[0]);
    }

    function handleCaptionChange(event) {
        setCaption(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await createPost({ image, caption })

            if (response) {
                onClose();
                navigate('/feed');
            } else {
                console.error("Failed to create post:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-12 rounded-lg w-2/3 max-w-lg">
                <div className="flex justify-between items-start text-xl font-bold mb-8 text-white">
                    <h2>Create New Post</h2>
                    <button onClick={onClose}>
                        X
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="border border-gray-600 p-10 rounded-xl">
                    <div className="mb-4">
                        <label className="block text-white text-sm mx-4 my-3">Select Photo</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            required 
                            className="input input-bordered input-accent w-[500px] max-w-xs rounded-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm mx-4 my-3">Caption</label>
                        <Input 
                            value={caption} 
                            onChange={handleCaptionChange} 
                            required
                        />
                    </div>
                    <button className="btn btn-active btn-accent border rounded-full px-6 py-2 mt-4">Post</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePostPopup;