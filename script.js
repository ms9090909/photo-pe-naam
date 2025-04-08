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

function shareWhatsApp() {
  const output = document.getElementById("outputImage");
  if (!output.src) return alert("पहले इमेज बनाएं!");

  const msg = encodeURIComponent("मैंने Shayari फोटो बनाई है। देखो और ट्राय करो!");
  const link = `https://wa.me/?text=${msg}%0A${output.src}`;
  window.open(link, "_blank");
}

function shareFacebook() {
  const link = "https://myshaadistyle.blogspot.com";
  const shareText = "मैंने Shayari फोटो बनाई है। आप भी बनाओ!";
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(shareText)}`,
    "_blank"
  );
}

function shareInstagram() {
  alert("Instagram पर डायरेक्ट इमेज शेयर नहीं हो सकता। पहले डाउनलोड करें और फिर इंस्टा पर शेयर करें।");
      }
