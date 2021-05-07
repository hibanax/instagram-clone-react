import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { SmoothProvider } from 'react-smooth-scrolling'
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([
    
 
  ]);

  // useEffect runs a piece of code based on a specific condition


  useEffect(() => {
    // this is where the code runs
    db.collection('posts').onSnapshot(snapshot => {
      // every time a new post is added, this code fires
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
}, []);

return (
  <SmoothProvider ease="0.2">
    <div className="App">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      <h1>HELLO LET'S BUILD AN INSTAGRAM CLONE APP WITH REACT ! </h1>

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }



      {/* Header */}
      {/*Posts*/}
      {/*Posts*/}


    </div>
  </SmoothProvider>
);
}

export default App;
