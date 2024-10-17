console.log("sddv");
let songindex = 0;
let audioElement = new Audio('1x.mp3');
let play = document.getElementById("masterplay");
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersong = document.getElementById('mastersong');
let songitems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songName: 'oye oye', filePath: '0x.mp3', coverPath: 'oye oye 2.jpg' },
    { songName: "Me Hu Ek Bansuri", filePath: "1x.mp3", coverPath: "bansari.jpeg" },
    { songName: "Husn Hai Suhana", filePath: "2x.mp3", coverPath: "HUSN.jpeg" },
    { songName: "Chahun Mein ya naa", filePath: "3x.mp3", coverPath: "chahun.jpeg" },
    { songName: "Baby Girl", filePath: "4x.mp3", coverPath: "baby.jpeg" },
    { songName: "Sonali Sonali", filePath: "5x.mp3", coverPath: "sonali.jpg" },
    { songName: "Ramaiya Vastavaiya", filePath: "6x.mp3", coverPath: "ram.jpeg" },
    { songName: "Dekhechi Rupsagore Moner Manus", filePath: "7x.mp3", coverPath: "rupsagor.jpeg" }
];

songitems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songName;
});

play.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        play.classList.remove('fa-pause-circle');
        play.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
});

const makeAllplays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllplays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        mastersong.innerText = songs[songindex].songName;
        audioElement.src = `${songindex}x.mp3`;  // Correct use of template literal
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 7) {
        songindex = 0;
    } else {
        songindex += 1;
    }
    audioElement.src = `${songindex}x.mp3`;  // Correct use of template literal
    mastersong.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 7;  // Reset to the last song
    } else {
        songindex -= 1;
    }
    audioElement.src = `${songindex}x.mp3`;  // Correct use of template literal
    mastersong.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-pause-circle');
});
