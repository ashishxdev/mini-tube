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
    <div className='grid grid-flow-col pl-4 p-1 m-2 shadow-lg items-center'>
      <div className='flex col-span-1 items-center cursor-pointer gap-3'>
        <img
        onClick={() => toggleMenuHandler()} 
        className='h-5 invert'
        src="https://cdn-icons-png.flaticon.com/512/6015/6015685.png" alt="menu" />
        <a href="/">
        <img 
        className='h-6 mx-2 invert'
        alt="youtube-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png" />
        </a>
      </div>
      <div className='flex justify-center w-full col-span-10 px-10'>
        <div className='flex'>
        <div className='relative'>
        <input className="px-5 w-[40rem] border border-gray-400 rounded-l-full p-2" 
        value = {searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        type="text"
        placeholder='Search'
        />
        {searchQuery.length > 0 && (
        <svg 
        onClick={() => setSearchQuery("")}
        className='h-6 absolute right-3 top-2 cursor-pointer'
        focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
        )}
        </div>
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

      <div className='col-span-1 flex items-center gap-3'>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" className="pointer-events: none; display: inherit; width: 100%; height: 100%; invert"><path clip-rule="evenodd" d="m13.497 4.898.053.8.694.4C15.596 6.878 16.5 8.334 16.5 10v2.892c0 .997.27 1.975.784 2.83L18.35 17.5H5.649l1.067-1.778c.513-.855.784-1.833.784-2.83V10c0-1.666.904-3.122 2.256-3.902l.694-.4.053-.8c.052-.78.703-1.398 1.497-1.398.794 0 1.445.618 1.497 1.398ZM6 10c0-2.224 1.21-4.165 3.007-5.201C9.11 3.236 10.41 2 12 2c1.59 0 2.89 1.236 2.993 2.799C16.79 5.835 18 7.776 18 10v2.892c0 .725.197 1.436.57 2.058l1.521 2.535c.4.667-.08 1.515-.857 1.515H15c0 .796-.316 1.559-.879 2.121-.562.563-1.325.879-2.121.879s-1.559-.316-2.121-.879C9.316 20.56 9 19.796 9 19H4.766c-.777 0-1.257-.848-.857-1.515L5.43 14.95c.373-.622.57-1.333.57-2.058V10Zm4.5 9c0 .398.158.78.44 1.06.28.282.662.44 1.06.44s.78-.158 1.06-.44c.282-.28.44-.662.44-1.06h-3Z" fill-rule="evenodd"></path></svg>
        <img
        className='h-8 rounded-full' 
        src="https://yt3.ggpht.com/HLswLwjnHFCOgHJhZs4HT4INJT_1NlmVOuGcqktJvbT7H5F1bmiDMvbYt4VcekUWMsqxsPl6oA=s88-c-k-c0x00ffffff-no-rj" alt="user" />
      </div>
    </div>
  )
}

export default Head
