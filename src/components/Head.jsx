import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';

const Head = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [Showsuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search)
  const dispatch = useDispatch()

  useEffect(() =>{
    // API call

    // make an API call after every key press
    // but if the difference between 2 API Calls is < 200ms
    // decline the api call
    const timer = setTimeout(() => {
      if(searchCache[searchQuery]){
        setSuggestions(searchCache[searchQuery])
      } else {
        getSearchSuggestions()
      }
    },200)

    return () => {
      clearTimeout(timer)
    }

  },[searchQuery])

  const getSearchSuggestions = async () => {
    console.log("API CALL - " + searchQuery)
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
    const json = await data.json();
    // console.log(json[1])
    setSuggestions(json[1])

    // update cache
    dispatch(cacheResults({
      [searchQuery]: json[1]
    }))
  }


  const toggleMenuHandler = () => {
      dispatch(toggleMenu())
  }
  return (
    <div className='grid grid-flow-col p-5 m-2 shadow-lg items-center'>
      <div className='flex col-span-1 items-center cursor-pointer'>
        <img
        onClick={() => toggleMenuHandler()} 
        className='h-6'
        src="https://cdn-icons-png.flaticon.com/512/6015/6015685.png" alt="menu" />
        <a href="/">
        <img 
        className='h-8 mx-2'
        alt="youtube-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png" />
        </a>
      </div>
      <div className='col-span-10 px-10'>
        <div>
        <input className="px-5 w-1/2 border border-gray-400 rounded-l-full p-2" 
        value = {searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        type="text"
        placeholder='Search'/>
        <button className='border border-gray-400 px-4 py-2 rounded-r-full bg-gray-100'>
          🔍
        </button>
        </div>

        {/* If Showsuggestions is true then only show this */}
        {Showsuggestions && (
          <div className='absolute bg-white py-2 px-2 w-[30.5rem] rounded-lg shadow-lg border border-gray-100'>
          <ul>
            {suggestions.map(s => <li key="s" className='py-2 px-3 hover:bg-gray-100'>🔍 {s}</li>)}
          </ul>
        </div>)}
      </div>
      <div className='col-span-1'>
        <img
        className='h-8' 
        src="https://cdn-icons-png.flaticon.com/512/6914/6914292.png" alt="user" />
      </div>
    </div>
  )
}

export default Head
