// scriptMusicPlayer.js
document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let tracks = ['data/music/neon-gaming-128925.mp3'];
    let currentTrackIndex = 0;

    audio.src = tracks[currentTrackIndex];
    audio.play(); // Reproduce la música al cargar la página

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playButton.textContent = '♫';
        } else {
            audio.pause();
            playButton.textContent = 'X ♫';
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
