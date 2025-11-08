import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu, openMenu } from '../utils/appSlice'
import { useSearchParams } from 'react-router-dom'
import CommentsContainer from './CommentsContainer'
import LiveChat from './LiveChat'
import { GOOGLE_API_KEY } from '../utils/constants'
import { formatCount } from '../utils/helper'

const WatchPage = () => {

  const [searchParams] = useSearchParams();
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [videoData, setVideoData] = useState(null)
  const [comments, setComments] = useState([])
  const [isSubscribed, setIsSubscribed] = useState(false);
  // console.log(searchParams.get("v"))

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(closeMenu());

    return () => {
      dispatch(openMenu());
    };
  }, [dispatch]);

  useEffect(() => {
    const getVideoData = async () => {
      const videoId = searchParams.get("v")
      if (!videoId) return
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${GOOGLE_API_KEY}`)
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setVideoData(data.items[0])
          const channelId = data.items[0].snippet.channelId
          const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${GOOGLE_API_KEY}`)
          const channelData = await channelResponse.json()
          if (channelData.items && channelData.items.length > 0) {
            setVideoData(prev => ({
              ...prev,
              channelData: channelData.items[0]
            }))
            // console.log(channelData.items[0])
            const commentsResponse = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=20&key=${GOOGLE_API_KEY}`)
            const commentsData = await commentsResponse.json()
            if (commentsData.items) {
              setComments(commentsData.items)
            }
          }
        }
      }
      catch (error) {
        console.error("Error:", error)
      }
    }
    getVideoData()
  }, [searchParams])

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
        <h1 className='text-[20px] font-bold'>{videoData?.snippet?.title || 'Loading...'}</h1>
        <div className='flex justify-between items-center gap-4 mt-2'>
          <div className='flex items-center gap-3'>
            <img
              className='rounded-full h-9'
              src={videoData?.channelData?.snippet?.thumbnails?.default?.url} alt="channel logo" />
            <div className='grid'>
              <span className='text-[16px] text-white font-medium'>{videoData?.channelData?.snippet?.title}</span>
              <span className='text-[12px] text-gray-400'>
                {videoData?.channelData?.statistics?.subscriberCount ?
                  `${formatCount(videoData.channelData.statistics.subscriberCount)} subscribers`
                  : 'Loading...'}</span>
            </div>
            <button
              onClick={() => setIsSubscribed(!isSubscribed)}
              className='bg-white text-black px-3 py-2 rounded-full text-[14px] font-medium ml-5'
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
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
          <p className='mt-3 px-2 py-1'>{
            `${formatCount(videoData?.statistics?.viewCount)} views `}
            {videoData?.snippet?.publishedAt ?
              new Date(videoData.snippet.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) : ''}
          </p>
          <p className='p-2 h-20 overflow-y-auto'>{videoData?.snippet?.description}</p>
        </div>
      </div>
      <CommentsContainer comments={comments} />
    </div>
  )
}

export default WatchPage
