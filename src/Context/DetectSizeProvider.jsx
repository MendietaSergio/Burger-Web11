import React, { useState, useEffect, createContext, useContext } from "react";

const DetectSizeContext = createContext()
export const DetectSizeContextUse = () => {
    return useContext(DetectSizeContext)
}

export const DetectSizeProvider = ({ children }) => {
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
    return (
        <DetectSizeContext.Provider value={{ widthImg, setWidthImg }} >
            {children}
        </DetectSizeContext.Provider>
    )
}