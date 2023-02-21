import { useEffect, useState } from 'react'

export const DetectSize = () => {
    const [widthImg, setWidthImg] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [window.innerWidth]);

    const handleResize = () => {
        setWidthImg(window.innerWidth);
    };
    return (widthImg, setWidthImg)
}
