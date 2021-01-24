import './App.css';
import Post from './Post'
import { useState, useEffect } from "react"
import { auth, db } from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Input, Button } from '@material-ui/core';
import ImageUpload from './ImageUpload'
import Login from './Login'
import InstagramEmbed from 'react-instagram-embed';


// //Code for Modal
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

//Code for Modal

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([])
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  // const [openSignIn, setOpenSignin]= useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);


  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        setUser(authUser);
        if (authUser.displayName) {
          // dont update username
          console.log(authUser)
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }

      }else{
        //user logged out
        setUser(null)
      }
    })
  },[user, username])

  useEffect(() => {
    //every time new post is added this code gets called
    db.collection('posts').orderBy("timestamp","desc").onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
       id: doc.id,
      post: doc.data()
    })
    ));
    })
    
  },[])
  //runs everytime the posts changes like dependent. [] means runs on

   const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const signup = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false);
    

  }


  return (
    <div className="app">
      <div className="app_header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
        alt="instagram logo" className='app_headerImage'/>
        { user ? (
          <button type="button" onClick={() => auth.signOut()}>Logout</button>
          ): (
            <div className="login_contianer">
              <button type="button" onClick={handleOpen}>Signup</button>
              <Login />
            </div>
          )
        }
      </div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >

      <div style={modalStyle} className={classes.paper}>
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
              alt="instagram logo"/>
        
        <center>
          <form className="app_signup">
            <Input id="username" type="text" placeholder="username" value={username} 
                  onChange={(e) => setUsername(e.target.value)}/>
            <Input id="email" type="text" placeholder="email" value={email} 
                  onChange={(e) => setEmail(e.target.value)}/>
            <Input id="password" type="password" placeholder="password" value={password} 
                  onChange={(e) => setPassword(e.target.value)}/>
            <Button onClick={signup}>Signup</Button>
          </form>
        </center>
        
      </div>
      </Modal>

      <div className="app_posts">
        <div className="app_postsLeft">
          {
          posts.map(({id,post}) => (
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
          }
        </div>


        <div className="app_postsRight">
          <InstagramEmbed
            url='https://www.instagram.com/p/B_uf9dmAGPw'
            clientAccessToken='123|456'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      
      

      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ): (
        <h3>You need to login to upload</h3>
      )}
    </div>
    
  );
}

export default App;
