import {videoSeekingType} from "../utils/types";


export default function useVideoSeek() {

    /**
     * Seeking forward or backward logic through click/ tap event.
     */
    function handleSeeking(params:videoSeekingType) {
        const {
            isFullScreen,
            windowWidth,
            userTouchX,
            videoRef,
            playerRef,
        } = params
        const videoCurrentWidth =  videoRef?.getBoundingClientRect().width
        const currentTime = playerRef?.currentTime()
        if (videoCurrentWidth && currentTime) {
            //Checking on full screen separately as the video player now takes the entire window's size.
            if (isFullScreen) {
                //If the current click-x is less than third of the screen's width, user has clicked on the left side
                if (userTouchX <= (windowWidth / 3)) {
                    playerRef?.currentTime(currentTime - 10)
                }
                //If the current click-x is greater than two-thirds of the screen's width, user has clicked on the left side
                else if (userTouchX >= (windowWidth - (windowWidth / 3))) {
                    playerRef?.currentTime(currentTime + 10)
                }
            } else {
                //If the current click-x is less than third of the video's width, user has clicked on the left side
                if (userTouchX <= (videoCurrentWidth / 3)) {
                    playerRef?.currentTime(currentTime - 10)
                }
                //If the current click-x is greater than two-thirds of the video's width, user has clicked on the left side
                else if (userTouchX >= (videoCurrentWidth - (videoCurrentWidth / 3))) {
                    playerRef?.currentTime(currentTime + 10)
                }
            }
        }
    }

    return {
        handleSeeking
    }
}
