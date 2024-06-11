import Link from 'next/link'
import React from 'react';
import './commonLink.scss'

const CommonLink = ({ redirectTo = '#', linkText, linkClassName = '', borderColor, fill, stroke, variant }) => {

    return (
        <div className='flex gap-y-4 gap-x-2 sm:gap-x-8 items-center mt-7 rtl:flex-row-reverse'>
            <Link href={redirectTo}
                style={{ transition: "all ease-in-out 0.3s" }}
                className={` animated_btn ${borderColor ? "btn-border-" + borderColor : ""}  w-12 min-w-12 lg:w-16 min-h-12 h-12 lg:h-16`}>
                <svg className={`${variant ? " arrow-variant-" + variant : "arrow-variant-right"} `} xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21" fill="none">
                    <path d="M19.206 11.26H0.5V9.64899H19.206H20.3966L19.563 8.7989L12.7474 1.84907L13.8611 0.713909L23.4156 10.4502L13.8609 20.1949L12.7474 19.0599L19.563 12.1101L20.3966 11.26H19.206Z" fill={fill ? fill : "#101010"} stroke={stroke ? stroke : "#004132"} />
                </svg>
            </Link>
            <div className={` text-xl lg:text-2xl text-secondary-100  ${linkClassName}`}>
                {linkText}
            </div>
        </div>
    )

}

export default CommonLink