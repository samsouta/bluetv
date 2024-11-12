import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaRegThumbsDown, FaThumbsDown, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { useVoteVideoMutation } from '../../../services/api/Voting';
import { useSelector } from 'react-redux';

const Voting = () => {
    const [voteVideo] = useVoteVideoMutation(); // hook for mutation
    const [isLike, setIsLike] = useState(false)
    const [isDislike, setIsDislike] = useState(false)
    const data = useSelector((state) => state.home.data);

    // handle vote
    const handleVote = (vote,id) => {
        if (id === "1") {
            setIsLike(!isLike)
        } else {
            setIsDislike(!isDislike)
        }
        // Send vote to the API (like or dislike)
        voteVideo({
            videoId: data.id,
            voteType: { type: vote },  // vote type (like or dislike)
        })
            .unwrap()  // Unwrap to handle success/failure
            .then(() => {
                console.log('Vote successful:');
                // Optionally update local state or show success message
            })
            .catch((error) => {
                console.error('Vote failed:', error);
                // Optionally show error message
            });
    };
    return (
        <div className=" flex gap-x-4" >
            <Button onClick={() => handleVote('like', "1")} isIconOnly color='primary' className={`  bg-white/5 montserrat`}>
                <FaRegThumbsUp className={` ${isLike ? " hidden" : " visible"} text-2xl text-blue-500`} />
                <FaThumbsUp className={` ${isLike ? " visible" : " hidden"} text-2xl text-blue-500`} />
            </Button>
            <Button onClick={() => handleVote('dislike', "2")} isIconOnly color='primary' className=" bg-white/5 montserrat ">
                <FaRegThumbsDown className={` ${isDislike ? " hidden" : " visible"} text-2xl text-blue-500`} />
                <FaThumbsDown className={` ${isDislike ? " visible" : " hidden"} text-2xl text-blue-500`} />
            </Button>
        </div>
    );
}

export default Voting;
