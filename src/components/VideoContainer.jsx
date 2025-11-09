import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEOS_API } from '../utils/constants'
import VideoCard from './VideoCard'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const searchQuery = useSelector((store) => store.filter.searchQuery);
  const [videos, setVideos] = useState([])

  useEffect(() => {
    getVideos()
  }, [])

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API)
    const json = await data.json()
    setVideos(json.items)
  }

  const filteredVideos =
    searchQuery?.trim()?.length > 0
      ? videos.filter((video) =>
          video?.snippet?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : videos

  return (
    <div className='grid grid-cols-1 md:flex md:flex-wrap'>
      {filteredVideos.map((video) => (
        <Link key={video.id} to={`/watch?v=${video.id}`}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  )
}

export default VideoContainer
