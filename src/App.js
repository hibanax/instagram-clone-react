import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";

import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//states//

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  const [openSignIn, setOpenSignIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has loggedn in...
        console.log(authUser);
        setUser(authUser);

        // if (authUser.displayName) {
        //   // dont update username
        // } else {
        //   // if we just created someone update
        //   return authUser.updateProfile({
        //     displayName: username,
        //   });
        // }
      } else {
        // user has logged out
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  // useEffect runs a piece of code based on a specific condition
  useEffect(() => {
    // this is where the code runs
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // every time a new post is added, this code fires
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  // calling button method
  const signUp = (event) => {
    // preventing refreshing when we call signUp
    event.preventDefault();
    // setting user authentication in term of useState
    auth
      .createUserWithEmailAndPassword(email, password)
      // give back user credentials
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert.apply(error.message));
    // setting the module to close when you SignUp
    setOpen(false);
  };

  const signIn = (event) => {
    // preventing refreshing when we call signIn
    event.preventDefault();
    // signIn firebase method by email and password
    auth
      .signInWithEmailAndPassword(email, password)
      // catching the error
      .catch((error) => alert(error.message));
    // setting the module to close when you SignIn
    setOpenSignIn(false);
  };

  return (
    <div className="App">
      <div className="greetings">
        Hello {!user ? "Guest" : user.displayName} !
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {user ? (
          //  button method logout
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
            <Button onClick={() => setOpen(true)}>Sign up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            postId={id}
            user={user}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}

      {/* Header */}
      {/*Posts*/}
      {/*Posts*/}
    </div>
  );
}

export default App;
