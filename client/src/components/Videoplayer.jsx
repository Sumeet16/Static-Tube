import React, { useEffect, useState } from 'react'
import "./Videoplayer.css";
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { UilAngleLeftB } from '@iconscout/react-unicons'
import { UilThumbsUp } from '@iconscout/react-unicons'
import Moment from 'react-moment';

const Videoplayer = () => {
    const history = useHistory();
    const [url, seturl] = useState("");
    const [data, setdata] = useState([]);
    const [like, setlike] = useState(false);
    const createdTime = data.createdAt;
    const currentLikes = data.like;
    const findVideo = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('watch');
        const res = await fetch("/watch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id
            })

        })
        const data = await res.json();
        const videoURL = data.userResult.video;
        seturl(videoURL);
        setdata(data.userResult);
        return data;
    }
    
    useEffect(() => {
        findVideo();
    }, []);

    const homePage = () => {
        history.push("/");
    }

    const likeDislikeCount = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('watch');
        const count = currentLikes;
        const status = like;
        const res = await fetch("/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                count,
                status
            })
        });
        const data = await res.json();
        setdata(data.doc);
    }

    return (
        <div className="videoplayer">
            <UilAngleLeftB className="backArrow" onClick={homePage} />
            <ReactPlayer controls={true} playing={true} url={url} width='80%' height='75%' className='videoPlayer' />
            <div className="menu">
                <div className="first__row">
                    <div className="title__data">
                        <p className="title">{data.title}</p>
                        <p className="upload__on"><Moment fromNow>{createdTime}</Moment></p>
                    </div>

                    <div className="like__dislike__box">
                        <div className="like__box" onClick={() => { likeDislikeCount(); setlike(!like); }}>
                            <UilThumbsUp style={like === true ? { color: 'red' } : {}} />
                            <p className="like__count">{data.like}</p>
                        </div>
                    </div>
                </div>

                <div className="description__box">
                    <p className="heading">Description</p>
                    <p className="data">{data.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Videoplayer