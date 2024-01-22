const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const fullscreenButton = document.createElement('button');
fullscreenButton.id = 'fullscreenButton';
fullscreenButton.innerText = 'Fullscreen';
document.body.appendChild(fullscreenButton);

fullscreenButton.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
  if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  }
}