import React from 'react'
import NavbarHome from './NavbarHome';
import DisplayBlog from './DisplayBlog';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react' 

const Uhome = () => {

  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

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

  useEffect(() => {
    const displayBlogs = async () => {
      const response = await fetch('https://blogapp14.herokuapp.com/getBlogs', {
        method : 'GET',
        headers : {'user' : username},
      })
      const data = await response.json();
      if(data.status === 'ok') {
        data.data.reverse();
        if(data.data.length > 0) setBlogs(data.data);
        else setError('no blogs found!');
      }
      else setError(data.message);
    }

    displayBlogs();
  })

  const logout = () => {
    if(window.confirm('are you sure you want to logout?')) {
      localStorage.removeItem('token');
      navigate('/login')
    }
  }

  return (
    <div className='flex flex-col w-100'>
        <div><NavbarHome username={username} avatar={avatar} logout={logout}/></div>
        {(username!=='' && avatar!=='' && blogs!==[])? 
          <>
          <div><Profile logout={logout} username={username} avatar={avatar}/></div>
          <div><Profile logout={logout} username={username} avatar={avatar}/></div>
          <div className="h-full lg:mt-[150px] mt-[130px] flex">
            <div className="p-6 grid lg:grid-cols-3 md:grid-cols-2 justify-center w-full h-fit">
              {
                (error ? <div className="text-lg font-nunito">{error}</div> : (blogs.length > 0) ?
                  blogs.map((blog) => {
                    return <DisplayBlog  user={blog.user} username={username} avatar={blog.avatar} title={blog.title} content={blog.content} description={blog.description} id={blog._id}/> 
                  }) 
                  : ''
                )
              }
            </div>
          </div> 
          </> : 
          <div className='flex justify-center items-center mt-[80px] h-full'>
            <img src="/images/loading.gif" alt="hello" className='  w-20 h-20 mt-5'/>
          </div>
        }
    </div>
  )
}

export default Uhome