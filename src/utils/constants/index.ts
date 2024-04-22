

export const VIDEO_JS_OPTIONS  = {
    autoplay: true,
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
