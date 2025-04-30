function levelFinal() {
    gameRunning = false;
    stopTimer();
    currentUpdate = function () {};
    currentDraw = function () {}; 

    const video = document.createElement('video');
    video.src = '../Assets/final.mp4';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.style.display = "none";
    video.id = 'finalLevelVideo';
    document.body.appendChild(video);

    // Esperamos a que pueda reproducirse el video 
    video.addEventListener('canplay', () => {
        video.play();
        requestAnimationFrame(drawVideo);
    });

    // Dibujamos el video en el canvas
    function drawVideo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (video.readyState >= 2) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(drawVideo); // bucle propio
    }
}
