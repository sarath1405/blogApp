import React from 'react'

const DisplayBlog = ({avatar, user, username, title, content, description, id}) => {
  return (
    <div className='p-5 border-2 m-5 border-slate-200 rounded-2xl shadow-lg  overflow-auto bg-blue-100'>
        <div className='flex items-center'>
          <img src={`/images/avatar${avatar}.svg`} className='h-11 w-11 rounded-[100%]' alt="" />
          <div className="block">
            <p className="font-nunito text-lg ml-2">{user}</p>
          </div>
        </div>
        <div className="mx-2 my-4">
          <p className="text-2xl uppercase">{title}</p>
          <p className='text-slate-500 text-sm first-letter:capitalize '>{content}</p>
        </div>
        <div className="mx-2 my-4 first-letter:capitalize">
          {description}
        </div>
    </div>
  )
}

export default DisplayBlog