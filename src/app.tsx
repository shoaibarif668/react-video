import './style/app.css'
import 'video.js/dist/video-js.css';
import useVideo from "./hooks/use-video.tsx";
import React, {useState} from "react";
import {VIDEO_JS_OPTIONS} from "./utils/constants";


function App() {
    const {handleSeekingOnTouch,videoRef,playerRef} = useVideo()

    const [url,setUrl] = useState(VIDEO_JS_OPTIONS.sources[0].src)
    function handleVideoUrl(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        playerRef.current?.src(url)
    }
  return (
      <section className="wrapper">
          <form onSubmit={handleVideoUrl}>
              <input type="url" onChange={e => setUrl(e.target.value)} required placeholder="Enter Video Url"
                     value={url}/>
              <button type="submit">Change Video Url</button>
          </form>
          <div ref={videoRef} className="video-ref" onTouchStart={handleSeekingOnTouch}/>
      </section>
  )
}

export default App
