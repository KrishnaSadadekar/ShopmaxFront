import React from 'react'

export default function DIrection({title}) {
    return (
        <div className="custom-border-bottom py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-0"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">{title}</strong></div>
                </div>
            </div>
        </div>
    )
}
