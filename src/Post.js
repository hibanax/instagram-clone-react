import React from 'react';
import './Post.css';

function Post() {
    return (
        <div className="post">
            <h3>Username</h3>
            {/* header -> avatar + username */}

            <img 
            className="post__image" 
            src="https://images.unsplash.com/photo-1619977081345-756ebdafe46a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60">
            </img>
            
            {/* image */}

            <h4 className="post__text"><strong>HibanaX:</strong> Let's look for a natural beauty pattern! 🤩</h4>
            {/* username + caption */}
            
            {}
            
        </div>
    )
}

export default Post
