import React from 'react'
import Navbar from './Navbar';
import {CheckIcon, UserIcon, KeyIcon, XIcon} from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import Error from './Error';

const SignupPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(0);

  useEffect(() => {
    if(confirmPassword!=='') {
      if(confirmPassword===password) setShow(1);
      else setShow(2);
    }
    else setShow(0);
  }, [show, password, confirmPassword])

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('https://blogapp14.herokuapp.com/signup', {
      method : 'POST',
      headers : {'content-Type' : 'application/json'},
      body : JSON.stringify({
        username,
        password,
        confirmPassword,
        avatar
      })
    })

    const data = await response.json();
    if(data.status === 'ok') {
      setLoading(false);
      alert('sign up successful!');
      navigate('/login')
    }
    else {
      setLoading(false);
      setError(data.message);
    }
  }

  const login = () => {
    navigate('/login');
  }

  const errorClose = () => {
    setError('');
  }

  return (
    <div className='flex flex-col w-full h-[100vh]'>
      <div><Navbar/></div>
      <div className="flex justify-center items-center mt-[80px] w-full h-full bg-blue-200">
        <div className="w-[90%] lg:w-[70%] h-[90%] rounded-xl shadow-xl flex items-center bg-white">
          <div className="w-full xl:w-[50%] h-full p-10">
            <form onSubmit={handleForm} className='flex flex-col items-center justify-center h-full'>
              <div className="flex items-center justify-evenly">
                <h4 className="font-nunito text-5xl">Sign Up</h4>
                <img className='w-8 h-8' src="/images/add-user.png" alt="" />
              </div>
              {error!=='' ? <Error error={error} click={errorClose}/>: '' }
              {loading? <img src="/images/loading.gif" alt="" className="w-9 h-9 mt-3" />:'' }
              <div>
                <div className="flex  border-2 border-slate-200 m-10 p-1 px-3 rounded-xl">
                  <UserIcon className='w-7 h-7 mr-3 text-slate-600'/>
                  <input value={username} onChange={(e) => setUsername(e.target.value)} className='border-0 outline-none' type="text" placeholder='username' required/>
                </div>
                <div className="flex  border-2 border-slate-200 m-10 p-1 px-3 rounded-xl">
                  <KeyIcon className='w-7 h-7 mr-3 text-slate-600'/>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} className='border-0 outline-none' type="password" placeholder='create password' required/>
                </div>
                <div className="flex  border-2 border-slate-200 m-10 p-1 px-3 rounded-xl">
                  {show===0?<KeyIcon className='w-7 h-7 mr-3 text-slate-600'/> : 
                  show===1?<CheckIcon className='w-7 h-7 mr-3 text-green-600'/> : <XIcon className='w-7 h-7 mr-3 text-red-600'/>}
                  <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='border-0 outline-none' type="password" placeholder='confirm password' required/>
                </div>
              </div>
              <div className="flex w-full justify-evenly mb-10">
                {avatar===1 ? <img src="/images/avatar1.svg" className=' p-1 w-[50px] h-[50px] rounded-[100%] border-2 border-slate-800' onClick={() => setAvatar(1)} alt="" /> : <img src="/images/avatar1.svg" className='w-[50px] h-[50px] rounded-[100%] border-2 border-slate-100 hover:border-none' onClick={() => setAvatar(1)} alt="" />}
                {avatar===2 ? <img src="/images/avatar2.svg" className='p-1 w-[50px] h-[50px] rounded-[100%] border-2 border-slate-800' onClick={() => setAvatar(2)} alt="" /> : <img src="/images/avatar2.svg" className='w-[50px] h-[50px] rounded-[100%] border-2 border-slate-100 hover:border-none' onClick={() => setAvatar(2)} alt="" />}
                {avatar===3 ? <img src="/images/avatar3.svg" className='p-1 w-[50px] h-[50px] rounded-[100%] border-2 border-slate-800' onClick={() => setAvatar(3)} alt="" /> : <img src="/images/avatar3.svg" className='w-[50px] h-[50px] rounded-[100%] border-2 border-slate-100 hover:border-none' onClick={() => setAvatar(3)} alt="" />}
                {avatar===4 ? <img src="/images/avatar4.svg" className='p-1 w-[50px] h-[50px] rounded-[100%] border-2 border-slate-800' onClick={() => setAvatar(4)} alt="" /> : <img src="/images/avatar4.svg" className='w-[50px] h-[50px] rounded-[100%] border-2 border-slate-100 hover:border-none' onClick={() => setAvatar(4)} alt="" />}
                {avatar===5 ? <img src="/images/avatar5.svg" className='p-1 w-[50px] h-[50px] rounded-[100%] border-2 border-slate-800' onClick={() => setAvatar(5)} alt="" /> : <img src="/images/avatar5.svg" className='w-[50px] h-[50px] rounded-[100%] border-2 border-slate-100 hover:border-none' onClick={() => setAvatar(5)} alt="" />}
              </div>
              <button type='submit' className="bg-blue-800 text-xl font-nunito text-white w-[70%] p-2 rounded-2xl text-center border-2 border-blue-800 hover:bg-transparent hover:text-blue-800">
                Sign up
              </button>
              <p className="text-sm font-roboto mt-10">Already Registered? <span onClick={login} className='text-blue-800 cursor-pointer'>login here</span></p>
            </form>
          </div>
          <div className="hidden xl:block w-[50%] h-full p-2">
            <img className='w-full rounded-xl h-full bg-blue-900 shadow-md shadow-slate-800' src="/images/signup-img.png" alt="" />
          </div>
        </div> 
      </div>
    </div>
  )
}

export default SignupPage