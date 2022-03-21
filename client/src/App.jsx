import React from 'react'
import Navbar from './components/Navbar';
import Video from './components/Video';
import VideoColl from './components/VideoColl';
import Videoplayer from './components/Videoplayer';
import { Route, NavLink } from 'react-router-dom';

const App = () => {
  return (
    <>
        <div className="container">
            <Navbar/>
        </div>

        <Route exact path="/upload" component={Video}/>
        <Route exact path="/video" component={Videoplayer}/>
        <Route exact path="/" component={VideoColl}/>
    </>
  )
}

export default App