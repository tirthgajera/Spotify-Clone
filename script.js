let masterPlay = document.getElementById('masterPlay');
let songIndex = 0;
let audioelement = new Audio('songs/1.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay=Array.from(document.getElementsByClassName('songItemPlay'));
let masterSongName = document.querySelector('.masterSongName');
let currentTimeEl = document.getElementById('currentTime');
let totalDurationEl = document.getElementById('totalDuration');
let songs = [
    { songName: "song1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "5:34" },
    { songName: "song2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "4:12" },
    { songName: "song3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "3:45" },
    { songName: "song4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "4:56" },
    { songName: "song5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "3:21" },
    { songName: "song6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "2:50" },
    { songName: "song7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "4:09" },
    { songName: "song8", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: "3:59" },
    { songName: "song9", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: "4:44" },
    { songName: "song10", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "5:01" }
];
songItems.forEach((element, i) => {
    // Set cover and name
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

    // Set duration text
    const timestamp = element.getElementsByClassName("timestamp")[0];
    timestamp.childNodes[0].nodeValue = songs[i].duration + ' ';

    // Set the play button's id properly
    const playBtn = element.getElementsByClassName("songItemPlay")[0];
    playBtn.id = i.toString(); // Set the correct id
});


masterPlay.addEventListener("click", () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
        
    } else {
        audioelement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
     updateRotatingImage();
});

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}
audioelement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myProgressBar.value = progress;
     currentTimeEl.innerText = formatTime(audioelement.currentTime);
    totalDurationEl.innerText = formatTime(audioelement.duration);
});

myProgressBar.addEventListener('input', () => {
    audioelement.currentTime = (myProgressBar.value * audioelement.duration) / 100;
});
const makeAllPlay=()=>{
    songItemPlay.forEach((el)=>{
         el.classList.remove('fa-pause');
        el.classList.add('fa-play');

    })
}

// songItemPlay.forEach((element) => {
//     element.addEventListener("click", (e) => {
//         let clickedIndex = parseInt(e.target.id);

//         if (songIndex === clickedIndex && !audioelement.paused) {
//             // If the same song is playing, pause it
//             audioelement.pause();
//             e.target.classList.remove('fa-pause');
//             e.target.classList.add('fa-play');
//             masterPlay.classList.remove('fa-pause');
//             masterPlay.classList.add('fa-play');
//             gif.style.opacity = 0;
//         } else {
//             // Play new song or resume
//             makeAllPlay();
//             songIndex = clickedIndex;
//             e.target.classList.remove('fa-play');
//             e.target.classList.add('fa-pause');
//             audioelement.src = songs[songIndex].filePath;
//             audioelement.currentTime = 0;
//             audioelement.play();
//             masterSongName.innerText = songs[songIndex].songName;
//             gif.style.opacity = 1;
//             masterPlay.classList.remove('fa-play');
//             masterPlay.classList.add('fa-pause');
//         }
//     });
// });
songItemPlay.forEach((element) => {
    element.addEventListener("click", (e) => {
        let clickedIndex = parseInt(e.target.id);

        if (songIndex === clickedIndex) {
            // Same song clicked
            if (audioelement.paused) {
                // Just resume from where it was paused
                audioelement.play();
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                masterPlay.classList.remove('fa-play');
                masterPlay.classList.add('fa-pause');
                gif.style.opacity = 1;
                 updateRotatingImage();
            } else {
                // Pause the current song
                audioelement.pause();
                e.target.classList.remove('fa-pause');
                e.target.classList.add('fa-play');
                masterPlay.classList.remove('fa-pause');
                masterPlay.classList.add('fa-play');
                gif.style.opacity = 0;
                 updateRotatingImage();
            }
        } else {
            // Different song clicked, switch and play from beginning
            makeAllPlay();
            songIndex = clickedIndex;
            element.classList.remove('fa-play');
            element.classList.add('fa-pause');
            audioelement.src = songs[songIndex].filePath;
            audioelement.currentTime = 0;
            audioelement.play();
            masterSongName.innerText = songs[songIndex].songName;
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
             updateRotatingImage();
        }
    });
});
// document.getElementById('next').addEventListener("click",()=>{
//     if(songIndex>=9){
//         songIndex=0;
//     }else{
//         songIndex+=1;
//     }
//     masterSongName.innerText=songs[songIndex].songName;
//     audioelement.src=`songs/${songIndex+1}.mp3`;
//         audioelement.currentTime=0;
//         audioelement.play();
//         gif.style.opacity=1;
//         masterPlay.classList.remove('fa-play');
//         masterPlay.classList.add('fa-pause');
// })
document.getElementById('next').addEventListener("click", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    audioelement.src = songs[songIndex].filePath;
    audioelement.currentTime = 0;
    audioelement.play();
     updateRotatingImage();
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
     

    // Reset all play buttons
    makeAllPlay();
    // Set play icon to pause for current song
    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');
});

document.getElementById('previous').addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    audioelement.src = songs[songIndex].filePath;
    audioelement.currentTime = 0;
    audioelement.play();
     updateRotatingImage();
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
     

    // Reset all play buttons
    makeAllPlay();
    // Set play icon to pause for current song
    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');
});

function updateRotatingImage() {
  songItems.forEach((item, i) => {
    const img = item.querySelector('img');
    if (i === songIndex && !audioelement.paused) {
      img.classList.add('rotating');
    } else {
      img.classList.remove('rotating');
    }
  });
}
audioelement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;  // Loop back to first song
    } else {
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioelement.src = songs[songIndex].filePath;
    audioelement.currentTime = 0;
    audioelement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    updateRotatingImage();  // Update rotating image on song change
});