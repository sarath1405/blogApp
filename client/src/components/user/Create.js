import React from 'react'
import NavbarHome from './NavbarHome';
import DisplayBlog from './DisplayBlog';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import Error from './../Error';

const Create = () => {

  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
        const authentication = async () => {
            const response = await fetch('https://blogapp14.herokuapp.com/auth', {
                method : 'GET',
                headers : {
                    'x-access-token' : localStorage.getItem('token')
                }
            })

            const data = await response.json();
            if(data.status === 'error') {
              localStorage.removeItem('token');
              window.location.href = '/';
            }
            else {
              setUsername(data.username)
              setAvatar(data.avatar)
            }
        }
        authentication();
    }
    else window.location.href = '/';
  }, [])

  const logout = () => {
    if(window.confirm('are you sure you want to logout?')) {
      localStorage.removeItem('token');
      navigate('/login')
    }
  }

  const createBlog = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('https://blogapp14.herokuapp.com/create', {
        method : 'POST',
        headers : {'content-Type' : 'application/json'},
        body : JSON.stringify({
            username,
            avatar,
            title,
            content,
            description,
            type
        })
    })

    const data = await response.json();
    if(data.status === 'ok') {
        setLoading(false);
        alert('blog created successfully!');
        navigate('/home');
    }
    else {
        setLoading(false);
        setError(data.message);
    }
  }

  const errorClose = () => {
    setError('');
  }

  return (
    <div className='flex flex-col overflow-x-hidden'>
        <div><NavbarHome username={username} avatar={avatar} logout={logout}/></div>
        {username!==''? 
          <>
          <div><Profile logout={logout} username={username} avatar={avatar}/></div>
        <div className="w-screen h-full flex items-center p-10 flex-col lg:mt-[150px] mt-[130px] bg-slate-100">
            <div className="text-2xl font-nunito font-bold">
              Create Blog
            </div>
            {error!=='' ? <Error error={error} click={errorClose}/>: '' }
            {loading? <img src="/images/loading.gif" alt="" className="w-9 h-9 mt-3" />:'' }
            <form onSubmit={createBlog} className='flex flex-col items-center lg:w-[60%] w-full h-full lg:p-10 p-0'>
                <div className="flex md:flex-row flex-col h-full w-full justify-around items-center">
                  <textarea type="text" className='w-full border-2 border-black p-3 m-3 resize-none rounded-xl' cols='5' rows='3' onChange={(e) => setTitle(e.target.value)} value={title} placeholder='title' required/>
                  <textarea type="text" className='w-full border-2 border-black p-3 m-3 resize-none rounded-xl' cols='5' rows='3' onChange={(e) => setContent(e.target.value)} value={content} placeholder='content' required/>
                </div>
                <div className='w-full flex justify-center items-center m-3'>
                  <select value={type} onChange={(e) => setType(e.target.value)} id="" className='sm:w-[30%] w-[50%] border-2 border-slate-800 rounded-lg'>
                    {console.log(type)};
                    <option value="public" className=''>Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className='flex flex-col h-full w-full justify-around items-center'>
                  <textarea className='w-full m-3 h-full resize-none p-3 border-2 border-black rounded-xl' rows="15" type="description" onChange={(e) => setDescription(e.target.value)} value={description} placeholder='description' required/>
                </div>
              <button type="submit" className='bg-green-700 text-slate-100 w-fit px-3 py-1 rounded-lg hover:shadow-xl text-xl font-roboto'>create</button>
            </form>
        </div>
          </> : 
          <div className='flex justify-center items-center mt-[80px] h-full'>
            <img src="/images/loading.gif" alt="hello" className='  w-20 h-20 mt-5'/>
          </div>
        }
    </div>
  )
}

export default Create