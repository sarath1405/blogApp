import React from 'react'
import {ChevronDownIcon, ChevronUpIcon, CogIcon, LogoutIcon, BookmarkIcon, UserCircleIcon, SearchIcon} from '@heroicons/react/outline'
import {useState} from 'react'
import { Link } from 'react-router-dom';

const Profile = ({username, avatar, logout}) => {

  const [drop, setDrop] = useState(false); 
  const [search, setSearch] = useState(''); 

  return (
    <>
    <div className='w-full mt-[80px] bg-slate-900 lg:h-[70px] h-[50px] flex justify-between items-center cursor-pointer shadow-lg px-3 fixed'>
        <div className='ml-2'>
        </div>
        <div className="lg:mr-10 mr-2 flex justify-center items-center" onClick = {() => setDrop(!drop)}>
            <img src={`/images/avatar${avatar}.svg`} className='lg:w-[50px] lg:h-[50px] w-[30px] h-[30px] rounded-[100%] border-2 border-slate-100 mr-2 lg:p-1 hover:p-0' alt="" />
            <h3 className='font-roboto lg:text-lg text-md mr-2 text-slate-100'>{username}</h3>
            {drop ? <ChevronUpIcon className='lg:w-5 lg:h-5 w-3 h-3 text-slate-400'/> : <ChevronDownIcon className='lg:w-5 lg:h-5 w-3 h-3 text-slate-400'/>}
        </div>
    </div>
    {drop ? 
      <div className="fixed lg:mt-[150px] mt-[130px] w-full flex justify-end items-center cursor-pointer">
        <ul className='lg:w-[230px] w-[160px] flex flex-col bg-slate-900 text-slate-100 px-4 py-3 rounded-b-md font-nunito shadow'>
          <li className='p-2 hover:bg-slate-800 rounded-md flex items-center' onClick={logout}><span><LogoutIcon className='lg:w-6 lg:h-6 w-5 h-5 mr-1 text-slate-400'/></span>Logout</li>
        </ul>
      </div> : ''
    }
    </>
  )
}

export default Profile