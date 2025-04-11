const shayariDB = {
  Love: [
    "तेरे बिना अधूरी है ज़िंदगी मेरी...",
    "तू है तो सब कुछ है, वरना कुछ भी नहीं..."
  ],
  Birthday: [
    "जन्मदिन की ढेरों शुभकामनाएं...",
    "आपका दिन खुशियों से भरा हो..."
  ],
  Friendship: [
    "सच्चा दोस्त वही जो मुश्किल में काम आए...",
    "दिल से निभाई जाती है दोस्ती..."
  ],
  Sad: [
    "अब तुझसे क्या शिकवा करें...",
    "तन्हाई में भीगते हैं ख्वाब..."
  ]
};

window.onload = () => {
  const categorySelect = document.getElementById("categorySelect");
  Object.keys(shayariDB).forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
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
  const text = document.getElementById("shayariSelect").value;
  document.getElementById("shayariText").value = text;
}

function generateImage() {
  const file = document.getElementById("imageUpload").files[0];
  const text = document.getElementById("shayariText").value;
  const position = document.getElementById("positionSelect").value;
  const fontColor = document.getElementById("colorPicker").value;
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

      ctx.font = `${fontSize}px Devanagari, Arial`;
      ctx.fillStyle = fontColor;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";

      const x = canvas.width / 2;
      const y = position === "top" ? 60 : canvas.height - 30;

      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);

      const output = document.getElementById("outputImage");
      output.src = canvas.toDataURL();
      output.style.display = "block";

      document.getElementById("shareButtons").style.display = "flex";
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}
/* Add Font Awesome (place in <head>) */
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

/* Custom Button Styling */
.share-buttons-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.share-btn {
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* WhatsApp Button (Green) */
.whatsapp-btn {
  background: #25D366;
  color: white;
}

/* Facebook Button (Blue) */
.facebook-btn {
  background: #1877F2;
  color: white;
}

/* Instagram Button (Gradient Purple-Pink) */
.instagram-btn {
  background: linear-gradient(45deg, #405DE6, #833AB4, #C13584, #E1306C, #FD1D1D);
  color: white;
}

/* Download Button (Dark Gray) */
.download-btn {
  background: #333;
  color: white;
      }

function downloadImage() {
  const output = document.getElementById("outputImage");
  if (!output.src) return alert("पहले इमेज बनाएं!");

  // Trigger fake ad
  alert("Ad is loading... (Simulated)");

  const link = document.createElement("a");
  link.download = "shayari-image.png";
  link.href = output.src;
  link.click();
}

