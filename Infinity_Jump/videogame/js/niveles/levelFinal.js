// Último nivel con fondo de video
function levelFinal() {
    const video = document.createElement('video');
    video.src = '../Assets/final.mp4';  
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    video.id = 'finalLevelVideo';
    document.body.appendChild(video);  

    video.addEventListener('canplay', () => {
        video.play();
    });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width = 1150;  
    const canvasHeight = canvas.height = 650;


    function draw() {
        if (video.readyState >= 2) {  
            ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight);  
        }
        requestAnimationFrame(draw);  
    }
    draw();
}
