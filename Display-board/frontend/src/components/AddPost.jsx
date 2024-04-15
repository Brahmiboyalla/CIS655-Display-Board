import { useState, useRef } from "react";

function AddPost() {
  const [addPost,setAddPost] = useState();
  const [articleInfo, setArticleInfo] = useState({
    username:"",
    name:"",
    description:"",
    image:""
  })

  const descriptionTextareaRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setArticleInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }
  function handleFileChange(e){
    const file = e.target.files[0];
    setArticleInfo(prevState => ({
      ...prevState,
      image: file
    }));
  }
  function handleTextareaResize(e) {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }
  function handleSubmit(e)
  {
    e.preventDefault();

    const formData = new FormData(e.target);
    async function upload()
    {
        const response = await fetch("http://127.0.0.1:5000/add_post",{
        method: 'POST',
        body: formData
        });
        if(response.ok){
          const data = await response.json();
          console.log("user uploaded the article",data);
          setAddPost(false);
          setArticleInfo({
            name : "",
            username: "",
            description: "",
            image:""
          });
        }
        else{
          console.log("Error while sending the article");
        }
    }
    upload()
  }
  return (
    <div className="addpost">
        {
          addPost?
            <>
              <h2>POST INFORMATION</h2>
              <form onSubmit={handleSubmit}>
              <ul>
                  <li>
                      <label>User Name : </label><input type="text" name="username"
                      value={articleInfo.username} onChange={handleChange} required/>
                  </li>
                  <li>
                      <label>Article Name : </label><input type="text" name="name"
                      value={articleInfo.name} onChange={handleChange} required/>
                  </li>
                  <li>
                      <label>Description : </label><textarea name="description" 
                      value={articleInfo.description} onChange={handleChange} onInput={handleTextareaResize}required />
                  </li>
                  <li>
                  <label>Article Image : </label><input type="file" name="image" onChange={handleFileChange}/>
                  </li>
              </ul>
              <button type="submit">Send Post</button>
            </form>
            </>
          :
          <button onClick={(e)=>{e.preventDefault();setAddPost(true)}}>Add a Post + </button>
        }
      </div>
  )
}

export default AddPost;
