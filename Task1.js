document.addEventListener('DOMContentLoaded',(event)=>
{
    const videoPlayer=document.getElementById('videoPlayer');
    const playPauseButton=document.getElementById('playPause');
    const resolutionSelector=document.getElementById('resolutionSelector');
    constvideoSources=
    {
        144:'video_144p.mp4',
        240:'video_240p.mp4',
        320:'video_320p.mp4',
        480:'video_480p.mp4',
        720:'video_720p.mp4',
        1080:'video_1080p.mp4',
    };
    let doubleTapTimeout;
    let touchStartX;
    let touchStartTime;
    let touchStartY;
    let holding=false;
    let holdInterval;
    //Play/Pause functionality
    playPauseButton.addEventListener('click',()=>
    {
        
        togglePlayPause();
    });
    //Change video resolution
    resolutionSelector.addEventListener('change',(event)=>
    {
        const currentTime=videoPlayer.currentTime;
        const isPlaying=!videoPlayer.paused;
        const selectedResolution=event.target.value;
        videoPlayer.src=videoSources[selectedResolution];
        videoPlayer.currentTime=currentTime;
        if(isPlaying)
            {
                videoPlayer.play();
            }
    });
    function togglePlayPause()
    {
        if (videoPlayer.paused) 
            {
                videoPlayer.play();
                playPauseButton.textContent='Pause';
            }
            else
            {
                videoPlayer.pause();
                playPauseButtont.textContent='Play';
            } 
    }
    //Gesture controls
   let startX;
   let startTime;
    videoPlayer.addEventListener('touchstart',(event)=>
    {
        const touch=event.toches[0];
        touchStartX=touch.clientX;
        touchStartY=touch.clientY;
        touchStartTime=videoPlayer.currentTime;
        holding=false;
        holdInterval=setTimeout(()=>
        {
            holding=true;
            handleHold(touch.clientX);
        },500);//500ms threshold for press and hold
    });
    videoPlayer.addEventListener('touchend',(event)=>
    {
        clearTimeout(holdInterval);
        if (holding) 
        {
            clearInterval(holdInterval);
            return;   
        }
        const touch=event.changedTouches[0];
        const touchEndX=touch.clientX;
        const touchEndY=touch.clientY;
        //Detect double tap
        if (doubleTapTimeout && Math.abs(touchEndX-touchStartX)<30 && Math.abs(touchEndY-touchStartY<30)) 
        {
            handleDoubleTap(touchEndX);
            clearTimeout(doubleTapTimeout);
        }
        else
        {
            doubleTapTimeout=setTimeout(()=>
            {
                doubleTapTimeout=null;
            },300);
        }
    });
    function handleDoubleTap(X)
    {
        const videoWidth=videoPlayer.offsetWidth;
        const thirdWidth=videoWidth/3;
        if (X<thirdWidth) 
        {
           //Double tap on the left side
           videoPlayer.currentTime=Math.max(0,videoPlayer.currentTime-5);
        }
        else if (X>2*thirdWidth) 
        {
            //Double tap on the right side
            videoPlayer.currentTime=Math.min(videoPlayer.duration, videoPlayer.currentTime+10);
        }
        else
        {
            //Double tap in the middle
            togglePlayPause();
        }
    }
    function handleHold(X)
    {
        const videoWidth=videoPlayer.offsetWidth;
        if (X<videoWidth/2) 
        {
            //Hold on the left side
            holdInterval=setInterval(()=>
            {
                videoPlayer.currentTime=Math.max(0,videoPlayer.currentTime-0.1*3); //Rewind at 3x speed
            },100);
        }
        else
        {
            //Hold on the right side
            holdInterval=setInterval(()=>
            {
                videoPlayer.currentTime=Math.min(videoPlayer.duration,videoPlayer.currentTime+0.1*2); //Fast-forward at 2x speed
            },100);
        }
    }
    videoPlayer.addEventListener('touchmove',(event)=>
    {
        const touch=event.touches[0];
        const diffX=touch.clientX - startX;
        const newTime=startTime + (diffX/10);
        videoPlayer.currentTime=Math.max(0,Math.min(videoPlayer.onduration,newTime));
        if (holding)
        {
            clearInterval(holdInterval);
            const touch=event.touches[0];
            handleHold(touch.clientX);
        }
    });
    videoPlayer.addEventListener('dblclick',()=>
    {
        if (videoPlayer.requestFullscreen) 
        {
            videoPlayer.requestFullscreen();   
        }
        else if (videoPlayer.mozRequestFullscreen) 
        {
            videoPlayer.mozRequestFullscreen();   
        }
        else if (videoPlayer.webkitRequestFullscreen) 
        {
            videoPlayer.webkitRequestFullscreen();   
        }
        else if (videoPlayer.msRequestFullscreen) 
        {
            videoPlayer.msRequestFullscreen();   
        }
    });
});
