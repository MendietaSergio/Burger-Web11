import React, { useState, useEffect, createContext, useContext } from "react";

const DetectSizeContext = createContext()
export const DetectSizeContextUse = () => {
    return useContext(DetectSizeContext)
}

export const DetectSizeProvider = ({ children }) => {
    console.log(window.innerWidth);
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
    console.log(widthImg + " detectSize");
    return (
        <DetectSizeContext.Provider value={{ widthImg, setWidthImg }} >
            {children}
        </DetectSizeContext.Provider>
    )
}