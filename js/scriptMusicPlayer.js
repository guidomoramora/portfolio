// scriptMusicPlayer.js
document.addEventListener("DOMContentLoaded", function() {
    const musicPath = 'data/music/';
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let tracks = [];
    let currentTrackIndex = 0;

    fetch(musicPath)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            tracks = Array.from(htmlDoc.querySelectorAll('a'))
                .map(link => link.href)
                .filter(href => href.endsWith('.mp3'));

            if (tracks.length > 0) {
                audio.src = tracks[currentTrackIndex];
            }
        })
        .catch(error => console.error('Error fetching the music files:', error));

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playButton.textContent = 'Pause';
        } else {
            audio.pause();
            playButton.textContent = 'Play';
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
        } else {
            currentTrackIndex = tracks.length - 1;
        }
        audio.src = tracks[currentTrackIndex];
        audio.play();
        playButton.textContent = 'Pause';
    });

    nextButton.addEventListener('click', () => {
        if (currentTrackIndex < tracks.length - 1) {
            currentTrackIndex++;
        } else {
            currentTrackIndex = 0;
        }
        audio.src = tracks[currentTrackIndex];
        audio.play();
        playButton.textContent = 'Pause';
    });

    audio.addEventListener('ended', () => {
        if (currentTrackIndex < tracks.length - 1) {
            currentTrackIndex++;
        } else {
            currentTrackIndex = 0;
        }
        audio.src = tracks[currentTrackIndex];
        audio.play();
    });
});
