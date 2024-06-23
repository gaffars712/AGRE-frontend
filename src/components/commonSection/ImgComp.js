"use client"
import Image from "next/image";
import React from "react";

const ImgComp = ({ src, index, width, height, className, imageUrl, selectedImage }) => {


    return (
        <>
            <Image src={src}  alt={`image ${index}`} width={width} height={height} className={className} style={{ boxShadow: `${imageUrl == selectedImage ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' : ''}`, cursor: 'pointer' }} />
        </>
    )
};
export default ImgComp;