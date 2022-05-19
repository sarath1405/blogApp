import React from 'react'
import Navbar from './Navbar';
import {LoginIcon, UserIcon, KeyIcon} from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import Error from './Error'

const LoginPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      navigate('/home')
    } 
  }, [])

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('https://blogapp14.herokuapp.com/login', {
      method : 'POST',
      headers : {'content-Type' : 'application/json'},
      body : JSON.stringify({
        username,
        password
      })
    })

    const data = await response.json();
    if(data.status === 'ok') {
      setLoading(false);
      localStorage.setItem('token', data.data);
      navigate('/home')
    }
    else {
      setLoading(false);
      setError(data.message);
    }
  }

  const signup = () => {
    navigate('/signup');
  }

  const errorClose = () => {
    setError('');
  }

  return (
    <div className='flex flex-col w-full h-[100vh]'>
      <div><Navbar/></div>
      <div className="flex justify-center items-center mt-[80px] w-full h-full bg-blue-200">
        <div className="w-[85%] lg:w-[65%] h-[80%] rounded-xl shadow-xl flex items-center bg-white">
          <div className="w-full xl:w-[50%] h-full p-10">
            <form onSubmit={handleForm} className='flex flex-col items-center justify-center h-full'>
              <div className="flex items-center justify-evenly">
                <h4 className="font-nunito text-5xl">Login</h4>
                <LoginIcon className='w-9 h-9'/>
              </div>
              {error!=='' ? <Error error={error} click={errorClose}/>: '' }
              {loading? <img src="/images/loading.gif" alt="" className="w-9 h-9 mt-3" />:'' }
              <div className='md:w-[90%]'>
                <div className="flex border-2 border-slate-200 m-10 p-1 px-3 rounded-xl">
                  <UserIcon className='w-7 h-7 mr-3 text-slate-600'/>
                  <input value={username} onChange={(e) => setUsername(e.target.value)} className='border-0 outline-none overflow-hidden' type="text" placeholder='username' required/>
                </div>
                <div className="flex  border-2 border-slate-200 m-10 p-1 px-3 rounded-xl">
                  <KeyIcon className='w-7 h-7 mr-3 text-slate-600'/>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} className='border-0 outline-none' type="password" placeholder='password' required/>
                </div>
              </div>
              <button type='submit' className="bg-blue-800 text-xl font-nunito text-white w-[70%] p-2 rounded-2xl text-center border-2 border-blue-800 hover:bg-transparent hover:text-blue-800">
                Login
              </button>
              <p className="text-sm font-roboto mt-10">Not registered yet? <span onClick={signup} className='text-blue-800 cursor-pointer'>create an account</span></p>
            </form>
          </div>
          <div className="hidden xl:block w-[50%] h-full p-2">
            <img className='w-full rounded-xl h-full bg-blue-900 p-5 shadow-md shadow-slate-800' src="/images/login-img.png" alt="" />
          </div>
        </div> 
      </div>
    </div>
  )
}

export default LoginPage