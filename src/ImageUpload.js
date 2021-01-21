import React from 'react'
import { Button } from '@material-ui/core';
import {useState} from 'react'

function ImageUpload() {

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    if(event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }
  const handleUpload = () =>{

  }
  return (
    <div>
      <input type="text" 
        onChange={(event) => setCaption(event.target.value)}
        placeholder="Caption for a image" 
        value={caption}/>
      <input type="file" onChange={handleChange}/>
      <Button onlick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload
