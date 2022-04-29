import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import './VideoColl.css';

const VideoColl = () => {
  const [videoData, setvideoData] = useState([]);
  // console.log('====================================');
  // console.log(videoData);
  // console.log('====================================');

  const callVideoData = async (type) => {
    try {
      const url = type === "start" ? "/video" : "/more"
      const res = await fetch(url, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      const result = data.data;
      setvideoData([...videoData, ...result]);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const type = "start";
    callVideoData(type);
  }, []);

  const viewMore = () => {
    callVideoData();
  }

  return (
    <>
      <form method='GET'>
        <div className="main-contaier">
          {videoData.map((video, key) => {
            return (
              <VideoCard video={video} key={key} />
            )
          })}
        </div>
      </form>
      {videoData.length > 8 ? <button onClick={viewMore}>View More</button> : <></>}
    </>
  )
}

export default VideoColl