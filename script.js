const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');

const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');


const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Music (Database)
const songs = [
    {
      name: 'jacinto-1',
      displayName: 'Electric Chill Machine',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-3',
      displayName: 'Goodnight, Disco Queen',
      artist: 'Jacinto Design',
    },
    {
      name: 'metric-1',
      displayName: 'Front Row (Remix)',
      artist: 'Metric/Jacinto Design',
    },
  ];



//check if playing
let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "pause")
    music.play();
}



function pauseSong() {
    isPlaying= false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "play")
    music.pause();
}

//Even Listener
playBtn.addEventListener("click", () =>  isPlaying ? pauseSong() : playSong())


function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = `img/${song.name}.jpg`;
    music.src = `music/${song.name}.mp3`;

}

// current playing song index in DB
let currentSongIndexNumber = 0;

function prevSong() {
    if (currentSongIndexNumber === 0) {
        currentSongIndexNumber = songs.length;
    }

    currentSongIndexNumber--;
    loadSong(songs[currentSongIndexNumber]);
    playSong();

}
function nextSong() {
    if (currentSongIndexNumber === songs.length -1) {
        currentSongIndexNumber = -1;
    }
    currentSongIndexNumber++;
    loadSong(songs[currentSongIndexNumber]);
    playSong();

}


prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)




function updateProgressBar(e) {
    
        
        const {currentTime, duration} = e.srcElement;
        const percantageBar = currentTime / duration * 100
        progress.style.width = `${percantageBar}%`;

        // currentTimeElement and durationElement

        // currentTimeEl
        let minuteCurrentTime = Math.floor(currentTime / 60);
        let secondCurrentTime = Math.floor(currentTime % 60);
        
        if (secondCurrentTime < 10) {
            secondCurrentTime = `0${secondCurrentTime}`;
        }
        currentTimeEl.textContent = `${minuteCurrentTime}:${secondCurrentTime}`;
        
        // duration 
        let minuteDurationTime = Math.floor(duration / 60);
        let secondDurationTime = Math.floor(duration % 60);

        if (secondDurationTime < 10) {
            secondDurationTime = `0${secondDurationTime}`;
        }

        if (secondDurationTime) {
            durationEl.textContent = `${minuteDurationTime}:${secondDurationTime}`;
        }
    
}
music.addEventListener("timeupdate", updateProgressBar);


function setProgressBar(e) {
    const width = this.clientWidth; // total horizontal progress bar
    const clickX = e.offsetX; // user clicked horizontal place

    const {duration} = music;
    const currentTimerCalculator = clickX / width * duration;
    music.currentTime = currentTimerCalculator;
    
    // progress.style.width = `${ clickX / width * 100 }%`;

}

progressContainer.addEventListener("click", setProgressBar);