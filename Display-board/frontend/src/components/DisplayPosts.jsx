import { useEffect, useState } from "react";

function DisplayPosts() {
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
  return (<>
    <div className="lendlist">
      <h2><span>Items Ready To Lend</span></h2>
      {
        posts.length>0?
          (posts.map((item)=>(
            <div key={item['_id']} className="LendItemCard">
              <img src={`http://127.0.0.1:5000/images/${item['image']}`}/>
              <div className="LenditemInfo">
                <h2>Name : {item['name']}</h2>
                <p>Description: {item['description']}</p>
              </div>
            </div>
        )))
        :
        <h2>No Lended Items</h2>
      }
    </div>
  </>)
}

export default DisplayPosts;
