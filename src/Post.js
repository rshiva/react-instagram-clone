import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase'
import {useState, useEffect} from 'react'
import firebase from 'firebase'
import Login from "./Login"

function Post({postId, user, username, caption, imageUrl}) {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if(postId){
      unsubscribe = db.collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      })
    }
    return () =>{
      unsubscribe();
    }
  }, [postId])

  const postComment = (e) => {
    e.preventDefault()
    if(user){
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
          text: comment,
          username: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment('');
      }else{
        alert("Login to comment")
      }
  }
  return (
    <div className='post'>
      <div className="post_header">
        <Avatar className='post_avatar'
          alt={username} 
          src="/static/images/avatar/1.jpg" />
        <h3>{username} </h3>
      </div>
      <img className="post_image" src={imageUrl}
       alt="sunset"/>
      <h4 className="post_caption"><strong>{username} : </strong> {caption}</h4>

      <div className="post_comments">
        {
          comments.map((comment) => (
            <p>
              <b>{comment.username}</b> {comment.text}
            </p>
          ))
        }
      </div>
      
      <form className='post_commentBox'> 
        <input type="text" className="post_commentInput"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="post_comment" onClick={postComment}>
         Post
        </button>
      </form>
    </div>
  )
}
export default Post