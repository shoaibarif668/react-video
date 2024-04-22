import React, {useRef} from 'react'
import './app.css'
import video from "video.js";
import 'video.js/dist/video-js.css';
import Player from "video.js/dist/types/player";


const videoJsOptions  = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
        src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }],
    controlBar: {
        skipButtons: {
            backward: 10,
            forward:10
        }
    }
};

function App() {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<Player | null>(null);


    //Using "any" as videoJS is not exporting type for the event handler.
    function handleSeeking(event: any) {
        const videoCurrentWidth =  videoRef.current?.getBoundingClientRect().width
        const currentTime = playerRef.current?.currentTime()
        const windowWidth = window.innerWidth

        console.log(event.offsetX,"event.offsetX")
        console.log(playerRef.current?.isFullscreen_,'playerRef.current?.isFullscreen_')
        if (videoCurrentWidth && currentTime){
            //Checking on full screen separately as the video player now takes the entire window's size.
            if (playerRef.current?.isFullscreen_){
                //If the current click-x is less than third of the video's width, user has clicked on the left side
                if (event.offsetX <= (windowWidth / 3)){
                    playerRef.current?.currentTime(currentTime - 10)
                }
                //If the current click-x is greater than two-thirds of the video's width, user has clicked on the left side
                else if (event.offsetX >= (windowWidth - (windowWidth / 3))){
                    playerRef.current?.currentTime(currentTime + 10)
                }
            }else{
                //If the current click-x is less than third of the video's width, user has clicked on the left side
                if (event.offsetX <= (videoCurrentWidth / 3)){
                    playerRef.current?.currentTime(currentTime - 10)
                }
                //If the current click-x is greater than two-thirds of the video's width, user has clicked on the left side
                else if (event.offsetX >= (videoCurrentWidth - (videoCurrentWidth / 3))){
                    playerRef.current?.currentTime(currentTime + 10)
                }
            }
        }

    }


    React.useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current?.appendChild(videoElement);

            const player = playerRef.current = video(videoElement, {...videoJsOptions,
                userActions:  {
                doubleClick: handleSeeking
            }} , () => {
                playerRef.current = player;
            });

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;

            player.autoplay(videoJsOptions.autoplay);
            player.src(videoJsOptions.sources);
        }
    }, [videoJsOptions, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);
  return (
      <section className="wrapper">
          <div ref={videoRef} className="video-ref"/>
      </section>
  )
}

export default App
