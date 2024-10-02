// components/Loader.js
import React from 'react';

const CartLoader = ({ params }) => {
    return (
        <div className='loaderWrapperCart'>
            <div className='loader'>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
            </div>
            <p className='loadingText'>
                {params === 'en' ?
                    ' Loading...'
                    :
                    'تحميل...'}
            </p>
        </div>
    );
};

export default CartLoader;
