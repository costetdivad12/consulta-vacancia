import React from 'react';

const Loading = () => {
    return (
        // backgroundColor: 'rgba(0,0,0,0.6)
        <div style={{ display: 'flex' , justifyContent: 'center' , height: '100vh' , width:'100hvh', alignItems:'center' }}>
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading