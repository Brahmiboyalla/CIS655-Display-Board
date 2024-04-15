import Navigation from "./components/Navigation"
import DisplayPosts from "./components/DisplayPosts"
import AddPost from "./components/AddPost"

import { useState } from "react";

function App() {
  const [changes,setChanges] = useState(false);
  return (<>
    <Navigation />
    <AddPost changes={changes} setChanges={setChanges}/>
    <DisplayPosts changes={changes} setChanges={setChanges}/>
  </>
  );
}

export default App;
