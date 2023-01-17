import React from 'react'
import Navbar from './Navbar';
import {LoginIcon, UserIcon, KeyIcon, StarIcon} from '@heroicons/react/outline'
import {StarIcon as StarIcon2} from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import Error from './Error'

const Feedback = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [star, setStar] = useState(0);
  const [feedback, setFeedback] = useState('');
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
    const response = await fetch('https://blogapp14.onrender.com/feedback', {
      method : 'POST',
      headers : {'content-Type' : 'application/json'},
      body : JSON.stringify({
        name,
        star,
        feedback
      })
    })

    const data = await response.json();
    if(data.status === 'ok') {
      setLoading(false);
      alert('Thank you for your valueble feedback!')
      setName('')
      setFeedback('')
      setStar(0)
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
          <div className="w-full lg:w-[50%] h-full p-10">
            <form onSubmit={handleForm} className='flex flex-col items-center justify-center h-full'>
              <div className="flex items-center justify-evenly">
                <h4 className="font-nunito text-5xl">Feedback</h4>
              </div>
              {error!=='' ? <Error error={error} click={errorClose}/>: '' }
              {loading? <img src="/images/loading.gif" alt="" className="w-9 h-9 mt-3" />:'' }
              <div className='md:w-[90%]'>
                <div className="flex border-2 border-slate-200 m-10 p-1 px-3 rounded-xl">
                  <UserIcon className='w-7 h-7 mr-3 text-slate-600'/>
                  <input value={name} onChange={(e) => setName(e.target.value)} className='border-0 outline-none overflow-hidden' type="text" placeholder='name' required/>
                </div>
                <div className="flex m-10 p-1 px-3 rounded-xl">
                  <div className="w-full flex justify-evenly">
                    {star < 1? <StarIcon className='w-7 h-7' onClick={() => setStar(1)}/> : <StarIcon2 className='w-7 h-7 text-yellow-500' onClick={() => setStar(0)}/>}
                    {star < 2? <StarIcon className='w-7 h-7' onClick={() => setStar(2)}/> : <StarIcon2 className='w-7 h-7 text-yellow-500' onClick={() => setStar(0)}/>}
                    {star < 3? <StarIcon className='w-7 h-7' onClick={() => setStar(3)}/> : <StarIcon2 className='w-7 h-7 text-yellow-500' onClick={() => setStar(0)}/>}
                    {star < 4? <StarIcon className='w-7 h-7' onClick={() => setStar(4)}/> : <StarIcon2 className='w-7 h-7 text-yellow-500' onClick={() => setStar(0)}/>}
                    {star < 5? <StarIcon className='w-7 h-7' onClick={() => setStar(5)}/> : <StarIcon2 className='w-7 h-7 text-yellow-500' onClick={() => setStar(0)}/>}
                  </div>
                </div>
                <div className="flex  border-2 border-slate-200 m-10 p-1 px-3 rounded-xl">
                  <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className='border-0 resize-none outline-none overflow-hidden w-full' rows='3' type="text" placeholder='feedback' required />
                </div>
              </div>
              <button type='submit' className="bg-blue-800 text-xl font-nunito text-white w-[70%] p-2 rounded-2xl text-center border-2 border-blue-800 hover:bg-transparent hover:text-blue-800">
                Submit
              </button>
            </form>
          </div>
          <div className="hidden lg:block w-[50%] h-full p-2">
            <img className='w-full rounded-xl h-full shadow-md shadow-slate-800' src="/images/feedback.gif" alt="" />
          </div>
        </div> 
      </div>
    </div>
  )
}

export default Feedback