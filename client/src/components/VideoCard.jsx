import React from 'react'
import { UilPlay } from '@iconscout/react-unicons'
import { useHistory } from 'react-router-dom';
import "./VideoCard.css";

const VideoCard = ({video}) => {
  const history = useHistory();

  const videoWatch = (elem) => {
    history.push(`/video?watch=${elem}`);
  }

  return (
    <div className="video_container" onClick={() => {videoWatch(video._id)}}>
      <img src={video.thumbnail} alt="thumbnail" />
      <h3>{video.title}</h3>
      <div className="circle">
        <UilPlay className="video" />
      </div>
    </div>
  )
}

export default VideoCard