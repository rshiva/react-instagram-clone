import React from 'react'
import { Button } from '@material-ui/core';
import {useState} from 'react'
import { storage , db } from './firebase'
import firebase from 'firebase';
import './imageUpload.css';

function ImageUpload({username}) {

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    if(event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }
  const handleUpload = () =>{
    const uploadImage = storage.ref(`images/${image.name}`).put(image);

    uploadImage.on("state_changed", (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
        console.log(error);
        alert(error.message)
    },
    () => {
      storage.ref("images").child(image.name).getDownloadURL()
      .then(url => {
          db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: username
          });
          setProgress(0);
          setCaption("");
          setImage(null);

      })
    }
    )
      
    
  }
  return (
    <div className="imageUpload">
      <progress value={progress} max="100" className="imageUpload_progress"/>
      <input type="text" 
        onChange={(event) => setCaption(event.target.value)}
        placeholder="Caption for a image" 
        value={caption}/>
      <input type="file" onChange={handleChange}/>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload
