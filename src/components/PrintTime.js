import React from 'react';

const PrintTime = ({val}) => {
    const mind = val % (60 * 60);
    const minutes = Math.floor(mind / 60);
            
    const secd = val % 60;
    const seconds = Math.ceil(secd);

    return (
        <div>
            {minutes}분 {seconds}초
        </div>
    );
};

export default PrintTime;