import Player from "video.js/dist/types/player";


export type videoSeekingType = {
    isFullScreen: boolean,
    windowWidth: number,
    userTouchX: number,
    videoRef: HTMLDivElement | null,
    playerRef:Player | null
}
