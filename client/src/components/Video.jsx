import React, { useEffect, useState } from 'react'
import "./VideoUpload.css";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

const Video = () => {
  const [progress, setProgress] = useState(0);
  const [user, setuser] = useState({ title: "", thumbnail: "", video: "", description: ""});
  const [uploadFail, setuploadFail] = useState(0);
  const [doneUpload, setdoneUpload] = useState(0);

  const inputHandler = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setuser({ ...user, [name]: value });
  }

  const formHandler = async (e) => {
    e.preventDefault();
    const file = e.target[2].files[0];
    const file2 = e.target[3].files[0];
    uploadFiles(file);
    uploadFiles(file2);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (file.type.split("/")[0] === "image") {
            // console.log("Thumbnail File available at", downloadURL);
            setuser((prev) => { return { ...prev, thumbnail: downloadURL } });
          } else if (file.type.split("/")[0] === "video") {
            // console.log("Video File available at", downloadURL);
            setuser((prev) => { return { ...prev, video: downloadURL } });
          }
        })
      },
    );
  };

  useEffect(() => {
    postData();
  }, [user.video]);

  const postData = async (e) => {
    const title = user.title;
    const thumbnail = user.thumbnail;
    const video = user.video;
    const description = user.description;

    // console.log(title);
    // console.log(thumbnail);
    // console.log(video);

    const res = await fetch("/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description, thumbnail, video })
    });

    const data = await res.json();
    // console.log(data);
    if (data.status == 422) {
      console.log("Failed To Upload");
      setuploadFail(1);
    } else {
      console.log("Upload Done");
      setdoneUpload(1);

    }
  };

  return (
    <>
      <div className="container">
        <h1>Upload Videos</h1>
        <div className="upload_video_container">
          <form className="upload_video" onSubmit={formHandler} >
            <label>Video Title: </label>
            <input type="text" name="title" id="title" autoComplete="off" placeholder="Video Title" value={user.title} onChange={inputHandler} />
            <label>Video Description: </label>
            <input type="text" name="description" id="title" autoComplete="off" placeholder="Video Description" value={user.description} onChange={inputHandler} />
            <label>Upload Thumbnail: </label>
            <input type="file" class="custom-file-input" accept="image/*" />
            <label>Choose the video file:</label>
            <input type="file" className="custom-file-input" accept="video/*" />
            <div>
              <button type="submit" className="btn">Upload</button>
              {uploadFail == 1 ? <h3 style={{marginTop: "30px"}}>Upload Failed, Please Try Again</h3> : <></>}
            </div>

            {progress === 0 || uploadFail == 1 ? <></> : (
              <div className="upload_bar">
                <div className="upload_bar_status">
                  <div className="upload_bar_status_2" style={{ width: `${progress}%` }}></div>
                </div>
                <h3>Upload Done: {progress}%</h3>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default Video