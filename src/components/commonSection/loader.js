// components/Loader.js
import React from 'react';

const Loader = ({ params }) => {
    return (
        <div className='loaderWrapper'>
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

export default Loader;
