import React from 'react'
import Navbar from './Navbar';
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      navigate('/home')
    } 
  }, [])

  return (
    <div className='flex flex-col w-full h-[100vh]'>
        <div><Navbar/></div>
        <div className="flex flex-col lg:flex lg:flex-row w-auto h-[100%] lg:mt-[80px] items-center justify-evenly mt-[80px] bg-blue-200">
            <div className="flex flex-col m-10 lg:w-[30%] w-[70%]">
                <p className="p-6 md:text-7xl text-5xl font-nycd text-center w-full">
                    Tell Your Story to the World
                </p>
                <p className="text-md font-roboto lg:mt-10 text-center">
                    Join with us! Login or Register. Write your story and share !!
                </p>
            </div>
            <div>
                <img className='lg:h-[500px] lg:w-[800px] h-[280px] w-[350px] bg-slate-100 rounded-xl' src="/images/home-img.png" alt="home" />
            </div>
        </div>
    </div>
  )
}

export default Home