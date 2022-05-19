import React from 'react'
import { XIcon } from '@heroicons/react/outline';

const Error = ({error, click}) => {
  return (
    <div className='w-full p-2 px-4 border-2 border-red-500 bg-red-200 flex items-center justify-between rounded-xl mt-5 font-nunito'>
        <span>{error}</span>
        <XIcon className='w-5 h-5 text-red-700 cursor-pointer hover:text-black duration-75' onClick={click}/>
    </div>
  )
}

export default Error