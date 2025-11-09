export const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

export const YOUTUBE_VIDEOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + GOOGLE_API_KEY

export const YOUTUBE_SEARCH_API = "/api/search-suggestions?q="

export const LIVECHATCOUNT = 10;