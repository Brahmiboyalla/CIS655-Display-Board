import { useEffect, useState } from "react";

function DisplayPosts({changes,setChanges}) {
  const [posts,setPosts] = useState([])
  function fetchAllPosts()
  {
    const getposts=async()=>{
      const response = await fetch("http://127.0.0.1:5000/get_posts",{
      method : "GET",
      })
      if (response.ok) {
        const data = await response.json();
        console.log("posts fetched",data);
        setPosts(data);
      } else {
          console.log("Failed fetching the posts");
      }}
      getposts();
  }
  useEffect(fetchAllPosts,[]);
  useEffect(fetchAllPosts,[changes]);
  return (<>
    <div className="articles">
  <h2>Articles</h2>
  {posts.length > 0 ? (
    posts.map((post) => (
      <div key={post['_id']} className="blog">
        <img src={`http://127.0.0.1:5000/images/${post['image']}`} alt={post['name']} />
        <div className="blog-content">
          <div className="blog-info">
            <h3>{post['name']}</h3>
            <p>{post['description']}</p>
          </div>
          <div className="blog-meta">
            <span className="author">Author: {post['username']}</span>
            <span className="date">Date: {post['time']}</span>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No Articles Posted Yet</p>
  )}
</div>

  </>)
}

export default DisplayPosts;
