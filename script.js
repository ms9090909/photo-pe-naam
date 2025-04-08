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
      const color = document.getElementById("colorPicker").value;
      const fontSize = document.getElementById("fontSize").value;

      ctx.font = `${fontSize}px 'Noto Sans Devanagari', Arial`;
      ctx.fillStyle = color;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";

      const x = canvas.width / 2;
      const y = position === "top" ? 80 : canvas.height - 60;

      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);

      const outputImage = document.getElementById("outputImage");
      outputImage.src = canvas.toDataURL("image/png");
      outputImage.style.display = "block";
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function downloadImage() {
  const outputImage = document.getElementById("outputImage");
  if (!outputImage.src) return alert("पहले इमेज बनाएं!");

  const link = document.createElement("a");
  link.href = outputImage.src;
  link.download = "shayari-image.png";
  link.click();
}

function shareOnWhatsApp() {
  const outputImage = document.getElementById("outputImage");
  if (!outputImage.src) return alert("पहले इमेज बनाएं!");

  const msg = encodeURIComponent(
    "मैंने Shayari इमेज बनाई, आप भी बनाएं:\nhttps://ms9090909.github.io/photo-pe-naam/"
  );
  const link = `https://wa.me/?text=${msg}`;
  window.open(link, "_blank");
}
