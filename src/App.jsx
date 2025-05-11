import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./Components/Body"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import { Provider, useDispatch } from "react-redux"
import appStore from "./Utils/appStore"
import Feed from "./Components/Feed"
import Signup from "./Components/Signup"
import Connections from "./Components/Connections"
import Requests from "./Components/Requests"
import Chat from "./Components/Chat"



function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/" element={<Feed/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/connections" element={<Connections/>}/>
              <Route path="/requests" element={<Requests/>}/>
              <Route path="/chat/:targetUserId" element={<Chat/>}/>
            </Route>
          </Routes>
        </BrowserRouter> 
      </Provider>  
    </>
  )
}

export default App
