// Auto-load random shayari from selected category
document.getElementById("categorySelect").addEventListener("change", function () {
  const cat = this.value;
  if (cat !== "custom") {
    fetch(`shayari/${cat}.txt`)
      .then(res => res.text())
      .then(data => {
        const lines = data.split("\n").filter(Boolean);
        const random = lines[Math.floor(Math.random() * lines.length)];
        document.getElementById("shayariText").value = random;
      });
  } else {
    document.getElementById("shayariText").value = "";
  }
});

// Trigger canvas generation from custom button
function useCustomShayari() {
  const textarea = document.getElementById("shayariText");
  if (!textarea.value.trim()) {
    alert("कृपया अपनी शायरी पहले लिखें।");
    return;
  }
  generateImage();
}

// Listen for custom typing & switch category to 'custom'
document.getElementById("shayariText").addEventListener("input", () => {
  document.getElementById("categorySelect").value = "custom";
});

// Generate image with shayari overlay
function generateImage() {
  const canvas = document.getElementById("shayariCanvas");
  const ctx = canvas.getContext("2d");

  const file = document.getElementById("imageInput").files[0];
  if (!file) {
    alert("कृपया एक तस्वीर चुनें।");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const text = document.getElementById("shayariText").value;
      const pos = document.getElementById("positionSelect").value;

      ctx.font = "30px 'Noto Sans Devanagari', sans-serif";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.textAlign = "center";

      const x = canvas.width / 2;
      const y = pos === "top" ? 50 : canvas.height - 30;

      wrapText(ctx, text, x, y, canvas.width * 0.9, 40);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

// Optional: Word wrap the shayari text if too long
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      ctx.strokeText(line, x, y);
      ctx.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.strokeText(line, x, y);
  ctx.fillText(line, x, y);
}

// Share generated canvas with message
function shareImage() {
  const canvas = document.getElementById("shayariCanvas");
  const msg = "ये शायरी आपके लिए बनाई है! अपनी खुद की बनाएं: https://photopenaam.in";

  if (navigator.canShare && navigator.canShare({ files: [] })) {
    canvas.toBlob(blob => {
      const file = new File([blob], "shayari.png", { type: "image/png" });
      navigator.share({
        title: "शायरी फोटो",
        text: msg,
        files: [file]
      }).catch(console.error);
    });
  } else {
    alert("शेयरिंग सपोर्टेड नहीं है। आप इमेज डाउनलोड कर सकते हैं।");
  }
}
