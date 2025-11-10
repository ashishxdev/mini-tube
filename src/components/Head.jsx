import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';
import { setSearchQuery as setGlobalSearchQuery } from "../utils/filterSlice";

const Head = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [Showsuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search)
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery])
      } else {
        getSearchSuggestions()
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }

  }, [searchQuery])

  const getSearchSuggestions = async () => {
    if (!searchQuery.trim()) return;

    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await data.json();

      // Check if json[1] exists and is an array
      if (Array.isArray(json[1])) {
        setSuggestions(json[1]);
        dispatch(cacheResults({ [searchQuery]: json[1] }));
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Search suggestion error:", err);
      setSuggestions([]);
    }
  };


  const toggleMenuHandler = () => {
    dispatch(toggleMenu())
  }
  return (
    <div className='grid grid-flow-col px-4 p-1 my-2 mx-auto shadow-lg items-center sticky top-0 w-[98vw] bg-[#0f0f0f] z-50 rounded-lg'>
      <div className='flex col-span-1 items-center cursor-pointer gap-3 md:gap-3'>
        <img
          onClick={() => toggleMenuHandler()}
          className='h-4 md:h-5 invert'
          src="https://cdn-icons-png.flaticon.com/512/6015/6015685.png" alt="menu" />
        <a href="/">
          <svg xmlns="http://www.w3.org/2000/svg" id="yt-ringo2-svg_yt9" width="120" height="20" viewBox="0 0 120 20" focusable="false" aria-hidden="true">
          <g>
          <path d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z" fill="#00CED1"></path>
          <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="white"></path>
          </g>
          <g id="youtube-paths_yt9">
          <path d="M36 18.9V6.5H38.3V8.2H38.4C38.7 7.5 39 7 39.4 6.7C39.8 6.4 40.3 6.3 40.9 6.3C41.5 6.3 42 6.4 42.4 6.7C42.8 7 43.1 7.5 43.4 8.2H43.5C43.8 7.5 44.2 7 44.7 6.7C45.2 6.4 45.7 6.3 46.3 6.3C47.2 6.3 47.9 6.6 48.4 7.2C48.9 7.8 49.2 8.7 49.2 9.9V18.9H46.6V10.5C46.6 9.9 46.5 9.5 46.3 9.2C46.1 8.9 45.8 8.8 45.4 8.8C45 8.8 44.7 9 44.4 9.3C44.1 9.6 44 10.1 44 10.7V18.9H41.4V10.4C41.4 9.9 41.3 9.5 41.1 9.2C40.9 8.9 40.6 8.8 40.2 8.8C39.8 8.8 39.5 9 39.2 9.4C38.9 9.8 38.8 10.3 38.8 11V18.9H36Z" fill="white"/>
          <path d="M52 6.5H54.6V18.9H52V6.5ZM53.3 2C53.7 2 54.1 2.1 54.4 2.4C54.7 2.7 54.8 3.1 54.8 3.5C54.8 3.9 54.7 4.3 54.4 4.6C54.1 4.9 53.7 5 53.3 5C52.9 5 52.5 4.9 52.2 4.6C51.9 4.3 51.8 3.9 51.8 3.5C51.8 3.1 51.9 2.7 52.2 2.4C52.5 2.1 52.9 2 53.3 2Z" fill="white"/>
          <path d="M58 18.9V6.5H60.3V8H60.4C60.7 7.4 61.1 6.9 61.6 6.6C62.1 6.3 62.7 6.2 63.3 6.2C64.3 6.2 65.1 6.5 65.6 7.1C66.1 7.7 66.4 8.6 66.4 9.8V18.9H63.8V10.4C63.8 9.8 63.7 9.4 63.4 9.1C63.1 8.8 62.7 8.7 62.2 8.7C61.7 8.7 61.3 8.9 60.9 9.3C60.5 9.7 60.3 10.2 60.3 10.9V18.9H58Z" fill="white"/>
          <path d="M69 6.5H71.6V18.9H69V6.5ZM70.3 2C70.7 2 71.1 2.1 71.4 2.4C71.7 2.7 71.8 3.1 71.8 3.5C71.8 3.9 71.7 4.3 71.4 4.6C71.1 4.9 70.7 5 70.3 5C69.9 5 69.5 4.9 69.2 4.6C68.9 4.3 68.8 3.9 68.8 3.5C68.8 3.1 68.9 2.7 69.2 2.4C69.5 2.1 69.9 2 70.3 2Z" fill="white"/>
          <path d="M74.8 18.9V8.5H72V6.5H74.8V2H77.4V6.5H80V8.5H77.4V15.5C77.4 16.5 77.8 17 78.5 17C78.9 17 79.3 16.9 79.6 16.8V18.7C79.1 18.9 78.5 19 77.8 19C75.8 19 74.8 17.9 74.8 16V18.9Z" fill="white"></path>
          <path d="M82 6.5V15.5C82 16.3 82.2 16.9 82.6 17.3C83 17.7 83.6 17.9 84.3 17.9C85 17.9 85.6 17.7 86 17.3C86.4 16.9 86.6 16.3 86.6 15.5V6.5H89.2V15.5C89.2 17 88.8 18.2 88 19C87.2 19.8 86.1 20.2 84.3 20.2C82.5 20.2 81.4 19.8 80.6 19C79.8 18.2 79.4 17 79.4 15.5V6.5H82Z" fill="white"></path>
          <path d="M93 18.9V1H95.6V7.7H95.7C96.1 6.9 97 6.3 98.3 6.3C100.3 6.3 101.6 7.8 101.6 10.4V15C101.6 17.6 100.3 19.1 98.3 19.1C97 19.1 96.1 18.5 95.7 17.7H95.6V18.9H93ZM95.6 12.7C95.6 14.3 96.2 15.3 97.4 15.3C98.6 15.3 99.2 14.3 99.2 12.7V12.7C99.2 11.1 98.6 10.1 97.4 10.1C96.2 10.1 95.6 11.1 95.6 12.7Z" fill="white"></path>
          <path d="M101 13.5H107.6C107.6 14.3 107.3 15 106.7 15.5C106.1 16 105.3 16.3 104.3 16.3C103.3 16.3 102.5 16 101.9 15.4C101.3 14.8 101 13.9 101 12.7V12.2C101 11 101.3 10.1 101.9 9.5C102.5 8.9 103.3 8.6 104.3 8.6C105.3 8.6 106.1 8.9 106.7 9.5C107.3 10.1 107.6 10.9 107.6 12H105C105 11.4 104.9 11 104.6 10.7C104.3 10.4 103.9 10.3 103.4 10.3C102.9 10.3 102.5 10.5 102.2 10.9C101.9 11.3 101.8 11.9 101.8 12.7C101.8 13.5 101.9 14.1 102.2 14.5C102.5 14.9 102.9 15.1 103.4 15.1C103.9 15.1 104.3 15 104.6 14.7C104.9 14.4 105 14 105 13.5H101Z" fill="white"></path>
          </g>
          </svg>
        </a>
      </div>
      <div className='flex md:justify-center w-full col-span-10 px-2 md:px-10'>
        <div className='flex'>
          <div className='relative'>
            <input className="px-3 md:px-5 w-[55vw] md:w-[40rem] border border-gray-400 rounded-l-full p-1.5 md:p-2 text-sm md:text-base text-[#747474] relative"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 0) {
                  setShowSuggestions(true);
                } else {
                  setShowSuggestions(false);
                }
              }}
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(setGlobalSearchQuery(searchQuery));
                  setShowSuggestions(false);
                }
              }}
              type="text"
              placeholder='Search'
            />
            {searchQuery.length > 0 && (
              <svg
                onClick={() => setSearchQuery("")}
                className='invert h-4 md:h-6 absolute right-2 top-2 md:top-2.5 cursor-pointer'
                focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
            )}

            <button className='absolute border border-gray-400 px-2 md:px-4 py-2 md:py-[8px] rounded-r-full bg-[#272727]'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" className="invert pointer-events: none; display: inherit; w-4 h-4 md:w-6 md:h-6"><path clipRule="evenodd" d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z" fillRule="evenodd"></path></svg>
            </button>
          </div>

          {/* If Showsuggestions is true then only show this */}
          {Showsuggestions && suggestions?.length > 0 && (
            <div className='absolute top-full bg-white text-black py-2 px-5 w-[55vw] md:w-[40rem] rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-9999'>
              <ul>
                {suggestions.map((s) => (
                  <li
                    key={s}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setSearchQuery(s);
                      setShowSuggestions(false);
                    }}
                    onClick={() => setSearchQuery(s)}
                    className='py-2 px-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                      focusable='false'
                      aria-hidden='true'
                      className='pointer-events-none w-4 h-4'
                    >
                      <path
                        clipRule='evenodd'
                        fillRule='evenodd'
                        d='M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z'
                      />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}


        </div>
      </div>

      <div className='hidden md:flex col-span-1 items-center gap-5'>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" className="pointer-events: none; display: inherit; width: 100%; height: 100%; invert"><path clipRule="evenodd" d="m13.497 4.898.053.8.694.4C15.596 6.878 16.5 8.334 16.5 10v2.892c0 .997.27 1.975.784 2.83L18.35 17.5H5.649l1.067-1.778c.513-.855.784-1.833.784-2.83V10c0-1.666.904-3.122 2.256-3.902l.694-.4.053-.8c.052-.78.703-1.398 1.497-1.398.794 0 1.445.618 1.497 1.398ZM6 10c0-2.224 1.21-4.165 3.007-5.201C9.11 3.236 10.41 2 12 2c1.59 0 2.89 1.236 2.993 2.799C16.79 5.835 18 7.776 18 10v2.892c0 .725.197 1.436.57 2.058l1.521 2.535c.4.667-.08 1.515-.857 1.515H15c0 .796-.316 1.559-.879 2.121-.562.563-1.325.879-2.121.879s-1.559-.316-2.121-.879C9.316 20.56 9 19.796 9 19H4.766c-.777 0-1.257-.848-.857-1.515L5.43 14.95c.373-.622.57-1.333.57-2.058V10Zm4.5 9c0 .398.158.78.44 1.06.28.282.662.44 1.06.44s.78-.158 1.06-.44c.282-.28.44-.662.44-1.06h-3Z" fillRule="evenodd"></path></svg>
        <img
          className='h-8 rounded-full'
          src="https://yt3.ggpht.com/HLswLwjnHFCOgHJhZs4HT4INJT_1NlmVOuGcqktJvbT7H5F1bmiDMvbYt4VcekUWMsqxsPl6oA=s88-c-k-c0x00ffffff-no-rj" alt="user" />
      </div>
    </div>
  )
}

export default Head
