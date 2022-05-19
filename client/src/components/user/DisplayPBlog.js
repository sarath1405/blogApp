import React from 'react'

const DisplayPBlog = ({avatar, user, title, content, description, id}) => {

  const del = async () => {  
    if(window.confirm('are you sure you want to delete?')){
        const response = await fetch('https://blogapp14.herokuapp.com/delete', {
            method : 'POST',
            headers : {'content-Type' : 'application/json'},
            body : JSON.stringify({
                id : id
            })
        })
        const data = await response.json();
        if(data.status === 'ok') {
            alert('blog deleted successfully!');
        }
    }
  }  

  return (
    <div className='overflow-hidden p-5 border-2 border-orange-100 rounded-2xl shadow-lg m-5 bg-red-100'>
        <div className='flex items-center'>
          <img src={`/images/avatar${avatar}.svg`} className='h-11 w-11 rounded-[100%]' alt="" />
          <div className="block">
            <p className="font-nunito text-lg ml-2">{user}</p>
          </div>
          <div className="w-full flex justify-end items-center">
            <button className="bg-red-600 text-slate-100 rounded-lg px-3 py-1 mr-1 hover:bg-red-700" onClick={del}>
                Delete
            </button>
          </div>
        </div>
        <div className="mx-2 my-4">
          <p className="text-2xl uppercase">{title}</p>
          <p className='text-slate-500 text-sm first-letter:capitalize'>{content}</p>
        </div>
        <div className="mx-2 my-4 first-letter:capitalize">
          {description}
        </div>
    </div>
  )
}

export default DisplayPBlog