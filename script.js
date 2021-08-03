const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');


const music = document.querySelector('audio');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

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


