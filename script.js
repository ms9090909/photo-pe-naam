let selectedImage = null;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

document.getElementById("imageUpload").addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      selectedImage = img;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function updateShayariOptions() {
  const category = document.getElementById("categorySelect").value;
  const shayariSelect = document.getElementById("shayariSelect");
  shayariSelect.innerHTML = "";

  const shayaris = {
    "romantic": ["तेरा नाम लूं जुबां से...", "तू मिले या ना मिले..."],
    "sad": ["दर्द ही मेरा नसीब है...", "आंसुओं से भरी ये ज़िन्दगी..."],
    "motivational": ["जो सपना देखा है उसे पूरा कर...", "हार मत मान, चल पड़..."]
  };

  if (shayaris[category]) {
    shayaris[category].forEach(text => {
      const option = document.createElement("option");
      option.value = text;
      option.textContent = text;
      shayariSelect.appendChild(option);
    });
  }
}

function fillShayari() {
  const selected = document.getElementById("shayariSelect").value;
  document.getElementById("shayariText").value = selected;
}

function generateImage() {
  if (!selectedImage) return alert("पहले फोटो अपलोड करें");

  ctx.drawImage(selectedImage, 0, 0);
  const text = document.getElementById("shayariText").value;
  const position = document.getElementById("positionSelect").value;
  const color = document.getElementById("colorPicker").value;
  const fontSize = document.getElementById("fontSize").value;

  ctx.fillStyle = color;
  ctx.font = `${fontSize}px 'Noto Sans Devanagari'`;
  ctx.textAlign = "center";

  const x = canvas.width / 2;
  const y = position === "top" ? fontSize : canvas.height - 30;

  const lines = text.split("\n");
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * (parseInt(fontSize) + 10));
  });

  const outputImg = document.getElementById("outputImage");
  outputImg.src = canvas.toDataURL("image/png");
  outputImg.style.display = "block";

  document.getElementById("shareOptions").style.display = "flex";
}

function downloadImage() {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "shayari-image.png";
  a.click();
}

function share(platform) {
  canvas.toBlob(blob => {
    const file = new File([blob], "shayari.png", { type: "image/png" });

    if (platform === "whatsapp") {
      const shareData = {
        files: [file],
        title: "Shayari Image",
        text: "देखो मेरी बनाई हुई शायरी!",
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData).catch(console.error);
      } else {
        alert("इस डिवाइस पर शेयर सपोर्ट नहीं करता");
      }
    } else {
      alert(`${platform} के लिए अलग शेयर विकल्प जल्द आएगा!`);
    }
  });
}
