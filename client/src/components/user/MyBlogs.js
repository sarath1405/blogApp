import React from 'react'
import NavbarHome from './NavbarHome';
import DisplayPBlog from './DisplayPBlog';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react' 

const MyBlogs = () => {

  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
        const authentication = async () => {
            const response = await fetch('https://blogapp14.onrender.com/auth', {
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

  useEffect(() => {
    const displayBlogs = async () => {
      const response = await fetch('https://blogapp14.onrender.com/getPersonalBlogs', {
        method : 'GET',
        headers : {'user' : username},
      })
      const data = await response.json();
      if(data.status === 'error') {
        setError(data.message);
      }
      else if(data.status === 'ok') {
        data.data.reverse();
        if(data.data.length > 0) {
          setError('')
          setBlogs(data.data);
        }
      }
    }

    displayBlogs();
  }, [username])

  const logout = () => {
    if(window.confirm('are you sure you want to logout?')) {
      localStorage.removeItem('token');
      navigate('/login')
    }
  }

  return (
    <div className='flex flex-col h-screen'>
        <div><NavbarHome username={username} avatar={avatar} logout={logout}/></div>
        {(blogs!==[] && username!=='' && avatar!=='')? 
          <>
          <div><Profile logout={logout} username={username} avatar={avatar}/></div>
          <div className="h-full lg:mt-[150px] mt-[130px] flex">
            <div className="p-6 grid lg:grid-cols-3 md:grid-cols-2 justify-center w-full h-fit">
              {
                (error ? <div className="text-lg font-nunito">{error}</div> : (blogs.length > 0) ?
                  blogs.map((blog) => {
                    return <DisplayPBlog user={blog.user} avatar={blog.avatar} title={blog.title} content={blog.content} description={blog.description} likes={blog.likes} id={blog._id} type={blog.type}/> 
                  }) 
                  : <img src="/images/loading.gif" alt="hello" className=' bg-transparent w-20 h-20'/>
                )
              }
            </div>
          </div>
          </> : 
          <div className='flex justify-center items-center mt-[80px] h-full bg-slate-200'>
            <img src="/images/loading.gif" alt="hello" className='  w-20 h-20 mt-5'/>
          </div>
        } 
    </div>
  )
}

export default MyBlogs