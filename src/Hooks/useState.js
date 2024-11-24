import { useState } from "react";

export const UseState = () => {
    const [videoPage, setVideoPage] = useState(false);
    const [photoPage, setPhotoPage] = useState(false);
    const [genrePage,setGenrePage] = useState('')
    const [mostView,setMostView] = useState(false)
    const [popular,setPopular] = useState(false)
    const [topRates,setTopRates] = useState(false)
    const [sideBarTap, setSideBarTap] = useState(false);


    return {videoPage,setVideoPage,
        photoPage,setPhotoPage,
        genrePage,setGenrePage,
        mostView ,setMostView,
        popular ,setPopular,
        topRates ,setTopRates,
        sideBarTap, setSideBarTap
    }
}