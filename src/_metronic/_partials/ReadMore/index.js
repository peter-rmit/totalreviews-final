import React from 'react'
import ReactReadMoreReadLess from "react-read-more-read-less";

const Index = ({ children }) => {
    return (
        <ReactReadMoreReadLess
            charLimit={70}
            readMoreText={"Read more ▼"}
            readLessText={"Read less ▲"}
            readMoreClassName={'text-primary'}
            readLessClassName={'text-primary'}
        >
            {children}
        </ReactReadMoreReadLess>
    )
}

export default Index;
