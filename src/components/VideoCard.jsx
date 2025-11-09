import React, { useEffect, useState } from 'react';
import { GOOGLE_API_KEY } from '../utils/constants';

const VideoCard = ({ info }) => {
  const [channelLogo, setChannelLogo] = useState(null);

  if (!info) return null;

  const { snippet, statistics } = info;
  const { channelId, channelTitle, title, thumbnails } = snippet;
  useEffect(() => {
    const fetchLogo = async () => {
      const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${GOOGLE_API_KEY}`;

      const res = await fetch(url);
      const json = await res.json();

      const logo =
        json.items?.[0]?.snippet?.thumbnails?.default?.url ||
        json.items?.[0]?.snippet?.thumbnails?.high?.url;

      setChannelLogo(logo);
    };

    fetchLogo();
  }, [channelId]);

  const shortTitle = title.length > 73 ? title.substring(0, 73) + "..." : title;
  const formatViews = (views) =>{
    const num = Number(views);

    if(num >= 1000000) return (num/1000000).toFixed(1) + "M";
    if(num >= 1000) return (num/1000).toFixed(1) + "M";

    return num.toString();
  }

  return (
    <div className="p-3 m-auto w-100 shadow-lg rounded-lg hover:bg-[#272727]">
      {/* Video Thumbnail */}
      <img className="rounded-lg w-full" src={thumbnails.medium.url} alt="thumbnail" />

      {/* Channel logo + title */}
      <div className="flex items-start gap-3 mt-3 text-[16px]">
        {/* Channel Logo */}
        <img
          src={channelLogo}
          className="h-10 w-10 rounded-full"
          alt={channelTitle}
        />

        {/* Title and channel name */}
        <div>
          <p className="font-bold">{shortTitle}</p>
          <p className="text-sm text-gray-400 text-[14px]">{channelTitle}</p>
          <p className="text-sm text-gray-400 text-[14px]">{formatViews(statistics.viewCount)} views</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

export const AdVideoCard = ({ info }) => (
  <div className="border border-red-500 p-1 m-1">
    <VideoCard info={info} />
  </div>
);
