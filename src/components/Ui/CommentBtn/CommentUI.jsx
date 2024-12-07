import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';  // prop-types ကို import လုပ်ပါ
import { MessageCircle, Eye } from 'lucide-react';
import { FaHeart } from 'react-icons/fa';
import { formatViews } from '../../../Utils/Formatview';
import Voting from '../Voting';
import { useGetCommentsQuery, usePostCommentMutation } from '../../../services/api/PostComment';
import Alert from '../Alert';

const getAlertContent = (type) => {
    switch (type) {
        case 'success':
            return {
                title: 'Success!',
                message: 'Your changes have been successfully saved.',
            };
        case 'error':
            return {
                title: 'Error',
                message: 'An error occurred while processing your request.',
            };
        case 'warning':
            return {
                title: 'Warning',
                message: 'Please review your information before proceeding.',
            };
        case 'info':
            return {
                title: 'Information',
                message: 'Your session will expire in 5 minutes.',
            };
        default:
            return {};
    }
};

const CommentUI = ({ movieId, ratingPercentage, relativeDate, handleShareClick, mdata }) => {
    const [newComment, setNewComment] = useState('');
    const [alerts, setAlerts] = useState({
        type: 'success',
        isOpen: false,
    });

    const [postComment, { isLoading}] = usePostCommentMutation();
    const { data: comments, isLoading: isFetchingComments, isError: fetchCommentsError } = useGetCommentsQuery(movieId);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            await postComment({
                moviesId: movieId,
                comment: {
                    movie_id: movieId,
                    comment: newComment
                }
            });
            window.location.reload();
            setAlerts({ type: "success", isOpen: true });
            setNewComment('');
        } catch (error) {
            console.error("Failed to post comment:", error);
        }
    };

    const commentList = Array.isArray(comments) ? comments : [];
    return (
        <div className="text-neutral-light">
            <div className="max-w-6xl mx-auto xl:mx-0 px-2 py-8">
                {/* Video Info Section */}
                <div className="bg-[#2b4242] backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg ring-1 ring-white/10">
                    <h1 className="text-md xl:text-2xl font-bold mb-2 text-neutral-light">
                        {mdata?.movie.title}
                    </h1>
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-neutral-medium" />
                                <span className="text-neutral-medium">
                                    {formatViews(mdata?.movie.view_count)}%
                                </span>
                            </div>
                            <span className="text-neutral-dark">•</span>
                            <span className="text-neutral-medium">{relativeDate}</span>
                            <span className="text-neutral-dark">•</span>
                            <span className="flex items-center montserrat">
                                <FaHeart className="text-2xl text-[#7d8f8b] mr-2" />
                                {ratingPercentage}
                            </span>
                        </div>
                        <Voting handleShareClick={handleShareClick} />
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-[#2b4242] max-h-[300px] overflow-y-scroll backdrop-blur-sm rounded-xl p-6 shadow-lg ring-1 ring-white/10">
                    <div className="flex items-center gap-2 mb-6">
                        <MessageCircle className="w-5 h-5 text-neutral-medium" />
                        <h2 className="text-xl font-semibold text-neutral-light">
                            {commentList.length} Comments
                        </h2>
                    </div>

                    <form onSubmit={handleCommentSubmit} className="flex gap-4 mb-8">
                        <img
                            src="https://i.pinimg.com/736x/54/db/c5/54dbc58a3014e8b438c3c8f149a410c9.jpg"
                            alt="TopFan"
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-hover"
                        />
                        <div className="flex-1">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full px-4 py-2 rounded-lg bg-[#2b4242] border border-neutral-darker/20 focus:outline-none focus:border-[#007c8e] focus:ring-1 focus:ring-[#007c8e] transition-colors text-neutral-light placeholder-neutral-medium"
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setNewComment('')}
                                    className="px-4 py-2 text-neutral-medium hover:bg-white/10 rounded-full transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#007c8e] cursor-pointer text-neutral-light rounded-full transition-colors disabled:opacity-50"
                                    disabled={!newComment.trim() || isLoading}
                                >
                                    {isLoading ? "posting" : "comment"}
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* Conditional Rendering */}
                    <div className="space-y-6 ">
                        {isFetchingComments ? (
                            <p className="text-neutral-medium">Loading comments...</p>
                        ) : fetchCommentsError ? (
                            <p className="text-red-500">Error loading comments. Please try again.</p>
                        ) : commentList.length === 0 ? (
                            <p className="text-neutral-medium">No comments yet.</p>
                        ) : (

                            commentList.map((comment) => (
                                <div key={comment.id} className="flex gap-4">
                                    <img
                                        src='https://i.pinimg.com/736x/54/db/c5/54dbc58a3014e8b438c3c8f149a410c9.jpg'
                                        alt={`topfan`}
                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-hover"
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-neutral-light">TopFan</h4>
                                        </div>
                                        <p className="mt-1 text-neutral-muted">{comment.comment}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* /// hidden  */}
            <Alert
                type={alerts.type}
                {...getAlertContent(alerts.type)}
                isOpen={alerts.isOpen}
                onClose={() => setAlerts((prev) => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
};


CommentUI.propTypes = {
    movieId: PropTypes.string.isRequired,
    ratingPercentage: PropTypes.string.isRequired,
    relativeDate: PropTypes.string.isRequired,
    handleShareClick: PropTypes.func.isRequired,
};

export default React.memo(CommentUI);
