import React from 'react'
import { auth, db } from './firebase'
import { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Input, Button } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Login() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openSignIn, setOpenSignin]= useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const signInHandleOpen = () => {
    setOpenSignin(true);
  };

  const signInHandleClose = () => {
    setOpenSignin(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
    setOpenSignin(false);
  }

  return (
    <div>
    <button type="button" onClick={signInHandleOpen}>SignIn</button>

    <Modal
        open={openSignIn}
        onClose={signInHandleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >

      <div style={modalStyle} className={classes.paper}>
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
              alt="instagram logo"/>
        
        <center>
          <form className="app_signup">
            <Input id="email" type="text" placeholder="email" value={email} 
                  onChange={(e) => setEmail(e.target.value)}/>
            <Input id="password" type="password" placeholder="password" value={password} 
                  onChange={(e) => setPassword(e.target.value)}/>
            <Button onClick={signIn}>SignIn</Button>
          </form>
        </center>
        
      </div>
      </Modal>
    </div>
  )
}

export default Login
