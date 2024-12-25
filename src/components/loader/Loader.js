import React from 'react'
import { tailspin } from 'ldrs'
const Loader = () => {
    tailspin.register()
    return (
        <div className='loader'>
            <l-tailspin
                size="30"
                stroke="2"
                speed="1.3"
                color="#8b0000"
            ></l-tailspin>
        </div>
    )
}

export default Loader