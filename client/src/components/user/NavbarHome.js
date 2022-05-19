import React from 'react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import {useState, useEffect} from 'react'
import {decodeToken} from 'react-jwt'
import {useNavigate, Link} from 'react-router-dom'

const NavbarHome = ({logout}) => {

  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const [username, setusername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [profile, setProfile] = useState(false)

  useEffect(() => {
    const data = decodeToken(localStorage.getItem('token'));
    setusername(data.username);
    setAvatar(data.avatar);
  }, []) 

  const handleClick = () => {
      setNav(!nav);
  }
  
  const dropProfile = () => {
      setProfile(!profile)
  }
    
  return (
    <div className='w-screen h-[80px] z-10 bg-slate-800 text-white tracking-wide fixed shadow-black shadow transition duration-100'>
        <div className="w-full h-full flex items-center justify-between">
            <img className='w-10 h-10 ml-3' src="/images/blogger.png" alt="" />
            <div className='text-3xl font-bold font-nunito flex pl-3 pr-5 sm:text-4xl'>BlogApp</div>
            <ul className="hidden lg:flex font-montserrat text-slate-300 w-full">
                <Link to='/home'><li className='mx-4 text-mg hover:text-white hover:font-bold first-letter:capitalize transition duration-200 ease-in rounded-lg px-3 cursor-pointer py-1'>home</li></Link>
                <Link to='/create'><li className='mx-4 text-mg hover:text-white hover:font-bold first-letter:capitalize transition duration-200 ease-in rounded-lg px-3 cursor-pointer py-1'>new Blog</li></Link>
                <Link to='/myblogs'><li className='mx-4 text-mg hover:text-white hover:font-bold first-letter:capitalize transition duration-200 ease-in rounded-lg px-3 cursor-pointer py-1 mr-8'>my Blogs</li></Link>
                <li onClick={logout} className='mx-4 text-mg hover:text-white hover:font-bold first-letter:capitalize transition duration-200 ease-in rounded-lg px-3 cursor-pointer py-1 mr-8'>Logout</li>
            </ul>
            <div className="lg:hidden mr-8 cursor-pointer flex justify-end" onClick={handleClick}>
                {
                    nav ? <XIcon className='w-8'/> : <MenuIcon className='w-8'/>
                }
            </div>
        </div>
        <ul className={nav ? 'absolute w-full bg-slate-800 lg:hidden pb-5': 'hidden'}>
            <Link to='/home'><li className='text-md cursor-pointer mx-4 p-3 text-center hover:bg-slate-900 rounded-lg transition duration-100 ease-in-out first-letter:capitalize'>home</li></Link>
            <Link to='/create'><li className='text-md cursor-pointer mx-4 p-3 text-center hover:bg-slate-900 rounded-lg transition duration-100 ease-in-out first-letter:capitalize'>new Blog</li></Link>
            <Link to='/myblogs'><li className='text-md cursor-pointer mx-4 p-3 text-center hover:bg-slate-900 rounded-lg transition duration-100 ease-in-out first-letter:capitalize'>my Blogs</li></Link>
            <li onClick={logout} className='text-md cursor-pointer mx-4 p-3 text-center hover:bg-slate-900 rounded-lg transition duration-100 ease-in-out first-letter:capitalize'>Logout</li>
        </ul>
    </div>
  )
}

export default NavbarHome