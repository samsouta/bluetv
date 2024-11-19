import { useState } from "react";

export const UseState = () => {
    const [videoPage, setVideoPage] = useState(false);
    const [photoPage, setPhotoPage] = useState(false);
    const [genrePage,setGenrePage] = useState(false)

    return {videoPage,setVideoPage,photoPage,setPhotoPage,genrePage,setGenrePage}
}