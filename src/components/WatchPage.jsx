import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu, openMenu } from '../utils/appSlice'
import { useSearchParams } from 'react-router-dom'
import CommentsContainer from './CommentsContainer'
import LiveChat from './LiveChat'
import { GOOGLE_API_KEY } from '../utils/constants'

const WatchPage = () => {

  const [searchParams] = useSearchParams();
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  // console.log(searchParams.get("v"))

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(closeMenu());

    return () => {
      dispatch(openMenu());
    };
  }, [dispatch]);

  useEffect(()=>{

  },[])

  return (
    <div className='flex flex-col ml-5'>
      <div className='flex'>
        <div>
          <iframe
            width="1000" height="500"
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <div className='flex-1'>
          <LiveChat />
        </div>
      </div>
      <div className='m-3 w-[1000px]'>
        <h1 className='text-[20px] font-bold'>Must do Topics for Java Developer | Accenture Interview Experience 2025</h1>
        <div className='flex justify-between items-center gap-4 mt-2'>
          <div className='flex items-center gap-3'>
            <img
              className='rounded-full h-9'
              src="https://yt3.ggpht.com/_RkDehlkjpNnK2uPqKBpBZZ6Pxb5p0XCsUIg3psh5sqQlE8mn3fPDHCMcp3oNU0wQiFSYva7Og=s88-c-k-c0x00ffffff-no-rj" alt="channel logo" />
            <div className='grid'>
              <span className='text-[16px] text-white font-medium'>Runtime Error</span>
              <span className='text-[12px] text-gray-400'>7.9k Subscribers</span>
            </div>
            <button className='bg-white text-black px-3 py-2 rounded-4xl text-[14px] font-medium ml-5'>Subscribe</button>
          </div>
          <div className='flex items-center gap-4 text-white mr-4'>
            <div className='flex'>
              <button
                onClick={() => {
                  setLiked(!liked)
                  if (!liked) setDisliked(false)
                }}
                className='bg-[#282828] px-4 py-2 rounded-l-4xl font-bold transition-colors hover:bg-[#3f3f3f]'
              >
                <img
                  className="h-6 invert"
                  src={liked ? "https://cdn-icons-png.flaticon.com/512/739/739231.png" : "https://cdn-icons-png.flaticon.com/512/126/126473.png"}
                  alt="like"
                />
              </button>
              <button
                onClick={() => {
                  setDisliked(!disliked)
                  if (!disliked) setLiked(false)
                }}
                className='bg-[#282828] px-4 py-2 rounded-r-4xl font-bold transition-colors hover:bg-[#3f3f3f]'
              >
                <img
                  className="h-6 invert"
                  src={disliked ? "https://cdn-icons-png.flaticon.com/512/9334/9334003.png" : "https://cdn-icons-png.flaticon.com/512/4466/4466315.png"}
                  alt="dislike"
                />
              </button>
            </div>
            <div className='flex gap-2 bg-[#282828] px-3 py-2 rounded-4xl font-bold'>
              <img className="h-6 invert" src="https://cdn-icons-png.flaticon.com/512/2550/2550209.png" alt="" />
              <span>Share</span>
            </div>
            <div className='flex gap-2 bg-[#282828] px-3 py-2 rounded-4xl font-bold'>
              <img className="h-6 invert" src="https://cdn-icons-png.flaticon.com/512/2989/2989976.png" alt="" />
              <span>Download</span>
            </div>
          </div>
        </div>
        <div className='w-[980px] bg-[rgba(39,39,39,1)] rounded-lg text-[14px]'>
          <p className='mt-3 px-2 py-1'>2,010 views  Nov 2, 2025</p>
          <p className='p-2'>description</p>
        </div>
      </div>
      <CommentsContainer />
    </div>
  )
}

export default WatchPage
