import React from 'react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'

const Navbar = () => {

  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
      setNav(!nav);
  }

  const loginPage = () => {
    navigate('/login')
  }

  const signupPage = () => {
    navigate('/signup')
  }
    
  return (
    <div className='w-screen h-[80px] z-10 bg-slate-800 text-white tracking-wide fixed shadow-black shadow transition duration-100'>
        <div className="w-full h-full flex items-center justify-between">
            <img className='w-10 h-10 ml-3' src="/images/blogger.png" alt="" />
            <div className='text-3xl font-bold font-nunito flex pl-3 pr-5 sm:text-4xl'>BlogApp</div>
            <ul className="hidden lg:flex font-montserrat text-slate-300">
                <Link to='/'><li className='mx-4 text-mg hover:text-white hover:font-bold first-letter:capitalize transition duration-200 ease-in rounded-lg px-3 cursor-pointer py-1'>home</li></Link>
                <Link to='/feedback'><li className='mx-4 text-mg hover:text-white hover:font-bold first-letter:capitalize transition duration-200 ease-in rounded-lg px-3 cursor-pointer py-1 mr-8'>feedback</li></Link>
            </ul>
            <div className="lg:hidden mr-8 cursor-pointer flex justify-end" onClick={handleClick}>
                {
                    nav ? <XIcon className='w-8'/> : <MenuIcon className='w-8'/>
                }
            </div>
            <div className="hidden lg:flex justify-end w-full pr-10 transition duration-200">
                <button onClick={loginPage} className="rounded-xl px-5 py-2 hover:bg-slate-100 hover:text-black font-semibold transition duration-150">Login in</button>
                <button onClick={signupPage} className="bg-slate-100 text-black px-5 py-2 rounded-lg ml-7 font-semibold hover:bg-transparent border-2 border-b-slate-100 hover:text-white transition duration-150">Sign up</button>
            </div>
        </div>
        <ul className={nav ? 'absolute w-full bg-slate-800 lg:hidden': 'hidden'}>
            <Link to='/'><li className='text-md cursor-pointer mx-4 p-3 text-center hover:bg-slate-900 rounded-lg transition duration-100 ease-in-out'>home</li></Link>
            <Link to='/feedback'><li className='text-md cursor-pointer mx-4 p-3 text-center hover:bg-slate-900 rounded-lg transition duration-100 ease-in-out'>feedback</li></Link>
            <div className="flex flex-col justify-around mx-10 border-0 border-white transition duration-200 m-5">
                <button onClick={loginPage} className="border-2 my-3 border-b-slate-100 rounded-xl px-5 py-2 hover:bg-slate-100 hover:text-black font-semibold transition duration-150">Login in</button>
                <button onClick={signupPage} className="bg-slate-100 my-3 mb-5 text-black px-5 py-2 rounded-lg font-semibold hover:bg-transparent border-2 border-white hover:text-white transition duration-150">Sign up</button>
            </div>
        </ul>
    </div>
  )
}

export default Navbar