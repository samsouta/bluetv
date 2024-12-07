import { Button } from '@nextui-org/react';
import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useVoteVideoMutation } from '../../services/api/Voting';
import { Share2, ThumbsDown, ThumbsUp } from 'lucide-react';

const Voting = ({ handleShareClick }) => {
    const [voteVideo] = useVoteVideoMutation(); // Hook for mutation
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const data = useSelector((state) => state.home.data);
    // Check if data and data.id exist
    if (!data) {
        console.error('Error: Video data or ID is missing.');
        return null;
    }

    // Handle vote
    const handleVote = (vote) => {
        if (vote === 'like') {
            setIsLike(!isLike);
            if (isDislike) setIsDislike(false); // Ensure dislike is reset if like is clicked
        } else {
            setIsDislike(!isDislike);
            if (isLike) setIsLike(false); // Ensure like is reset if dislike is clicked
        }

        // Send vote to the API
        voteVideo({
            videoId: data,
            voteType: vote, // Either 'like' or 'dislike'
        })
            .unwrap()
            .then(() => {
                console.log(`Vote ${vote} successful for video ID ${data}`);
            })
            .catch((error) => {
                console.error('Vote failed:', error);
            });
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => handleVote('like')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isLike ? 'bg-primary-hover text-neutral-light' : 'hover:bg-primary-hover/10'
                }`}
            >
                <ThumbsUp className={`w-5 h-5 ${isLike ? 'fill-current' : ''}`} />
            </button>

            <button 
                onClick={() => handleVote('dislike')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isDislike ? 'bg-primary-hover text-neutral-light' : 'hover:bg-primary-hover/10'
                }`}
            >
                <ThumbsDown className={`w-5 h-5 ${isDislike ? 'fill-current' : ''}`} />
            </button>

            <button
                onClick={handleShareClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary-hover/10 transition-all"
            >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
            </button>
        </div>
    );
};

export default React.memo(Voting);