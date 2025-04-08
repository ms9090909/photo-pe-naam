const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');

let image = new Image();

document.getElementById('imageUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    image.onload = () => drawImage();
    image.src = event.target.result;
  };
  if (file) reader.readAsDataURL(file);
});

document.getElementById('shayariSelect').addEventListener('change', drawImage);
document.getElementById('fontSizeSelect').addEventListener('change', drawImage);
document.getElementById('colorSelect').addEventListener('change', drawImage);

function drawImage() {
  if (!image.src) return;

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const text = document.getElementById('shayariSelect').value;
  const fontSize = document.getElementById('fontSizeSelect').value;
  const fontColor = document.getElementById('colorSelect').value;

  if (text) {
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 4;
    ctx.fillText(text, canvas.width / 2, canvas.height - 50);
  }
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'shayari-image.png';
  link.href = canvas.toDataURL();
  link.click();
}

function shareImage() {
  canvas.toBlob((blob) => {
    const file = new File([blob], "shayari.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
        title: "My Shayari Image",
        text: "Check this Shayari Image!",
      });
    } else {
      alert("Sharing not supported on this device. Use Download.");
    }
  });
  }
