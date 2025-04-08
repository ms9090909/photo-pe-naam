const shayariDB = {
  "Love": [
    "तेरे बिना अधूरी है ज़िंदगी मेरी...",
    "तू है तो सब कुछ है, वरना कुछ भी नहीं..."
  ],
  "Birthday": [
    "जन्मदिन की ढेरों शुभकामनाएं...",
    "आपका दिन खुशियों से भरा हो..."
  ],
  "Friendship": [
    "सच्चा दोस्त वही जो मुश्किल में काम आए...",
    "दिल से निभाई जाती है दोस्ती..."
  ]
};

window.onload = function () {
  const categorySelect = document.getElementById("categorySelect");
  for (let cat in shayariDB) {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  }
};

function updateShayariOptions() {
  const category = document.getElementById("categorySelect").value;
  const shayariSelect = document.getElementById("shayariSelect");
  shayariSelect.innerHTML = '<option value="">-- शायरी चुनें --</option>';
  if (shayariDB[category]) {
    shayariDB[category].forEach(shayari => {
      const opt = document.createElement("option");
      opt.value = shayari;
      opt.textContent = shayari;
      shayariSelect.appendChild(opt);
    });
  }
}

function fillShayari() {
  const shayari = document.getElementById("shayariSelect").value;
  document.getElementById("shayariText").value = shayari;
}

function generateImage() {
  const file = document.getElementById("imageUpload").files[0];
  const color = document.getElementById("colorPicker").value;
  const fontSize = document.getElementById("fontSize").value;

  if (!file) return alert("कृपया एक फोटो चुनें!");

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const text = document.getElementById("shayariText").value;
      const position = document.getElementById("positionSelect").value;

      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;

      const x = canvas.width / 2;
      const y = position === "top" ? 60 : canvas.height - 30;

      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);

      const output = document.getElementById("outputImage");
      output.src = canvas.toDataURL();
      output.style.display = "block";
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function downloadImage() {
  const output = document.getElementById("outputImage");
  if (!output.src) return alert("पहले इमेज बनाएं!");

  const link = document.createElement("a");
  link.download = "shayari-photo.png";
  link.href = output.src;
  link.click();
}

function shareWhatsApp() {
  const msg = encodeURIComponent("मैंने फोटो पर शायरी बनाई! आप भी बनाएं:\nhttps://myshaadistyle.blogspot.com");
  window.open(`https://wa.me/?text=${msg}`, "_blank");
}

function shareFacebook() {
  const url = encodeURIComponent("https://myshaadistyle.blogspot.com");
  const shareText = encodeURIComponent("फोटो पर शायरी बनाओ और शेयर करो!");
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${shareText}`, "_blank");
        }
