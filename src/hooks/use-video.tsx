import React, {useEffect, useRef} from "react";
import Player from "video.js/dist/types/player";
import {VIDEO_JS_OPTIONS} from "../utils/constants";
import video from "video.js";
import useVideoSeek from "./use-video-seek.tsx";



export default function useVideo() {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<Player | null>(null);
    const videoLastTap = useRef<number | null>(null)
    const {handleSeeking} = useVideoSeek()

    //Using "any" as videoJS is not exporting type for the event handler.
    function handleSeekingOnDblClick(event: any) {
        const windowWidth = window.innerWidth
        handleSeeking({
            isFullScreen:!!playerRef.current?.isFullscreen_,
            userTouchX:event.offsetX,
            windowWidth,
            videoRef: videoRef.current,
            playerRef: playerRef.current
        })
    }

    function handleSeekingOnTouch(e: React.TouchEvent) {
        const windowWidth = window.innerWidth
        //Calling the touch event only on the mobile screens.
        //---//
        //Also checking here if video has started because videojs handles it by default by not shooting the native videojs double click method when the video has not yet started
            //But in our case we are handling the seeking on mobile devices on our own, so we need to check if the video has started or not.
        if (windowWidth <= 767 && playerRef.current?.hasStarted_){
            //Single Click
            if (!videoLastTap.current) {
                //Starting a timeout for 5 ms and storing into the ref, so if a user taps second time the reference will not be falsy, and thus we can assume it as a double click.
                videoLastTap.current = setTimeout(function () {
                    videoLastTap.current = null;
                }, 500)
            //Double Click
            } else {
                clearTimeout(videoLastTap.current);
                videoLastTap.current = null;

                handleSeeking({
                    isFullScreen:!!playerRef.current?.isFullscreen_,
                    userTouchX:e.touches[0].clientX,
                    windowWidth,
                    videoRef: videoRef.current,
                    playerRef: playerRef.current
                })

            }
        }
    }


    useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current?.appendChild(videoElement);

            const player = playerRef.current = video(videoElement, {...VIDEO_JS_OPTIONS,
                userActions:  {
                    doubleClick: handleSeekingOnDblClick
                }} , () => {
                playerRef.current = player;
            });
        }
    }, [VIDEO_JS_OPTIONS, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return {
        handleSeekingOnTouch,
        videoRef, playerRef
    }
}
