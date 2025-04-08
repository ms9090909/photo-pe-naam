// Shayari Database
const shayariDB = {
  "Love": [
    "तेरे बिना अधूरी है ज़िंदगी मेरी...",
    "तू है तो सब कुछ है, वरना कुछ भी नहीं...",
    "दिल ने जिसे चाहा है, वो तू ही तो है...",
    "तेरी हँसी मेरी जान है...",
    "तेरे साथ हर पल हसीन है..."
  ],
  "Friendship": [
    "दोस्ती नाम है सुख-दुख की कहानी का...",
    "सच्चा दोस्त वही जो मुश्किल में काम आए...",
    "यारी वही जो हर मोड़ पर साथ निभाए...",
    "हंसते रहो दोस्तों की तरह...",
    "दिल से निभाई जाती है दोस्ती..."
  ],
  "Birthday": [
    "जन्मदिन की ढेरों शुभकामनाएं...",
    "आपका दिन खुशियों से भरा हो...",
    "जन्मदिन मुबारक हो मेरी जान...",
    "आपका हर ख्वाब पूरा हो...",
    "खुश रहो हमेशा, जन्मदिन की बधाई!"
  ]
  // You can extend more here
};

window.onload = () => {
  const categorySelect = document.getElementById("categorySelect");
  const shayariSelect = document.getElementById("shayariSelect");

  for (let category in shayariDB) {
    const opt = document.createElement("option");
    opt.value = category;
    opt.textContent = category;
    categorySelect.appendChild(opt);
  }

  categorySelect.addEventListener("change", () => {
    const selected = categorySelect.value;
    shayariSelect.innerHTML = '<option value="">-- शायरी चुनें --</option>';
    if (shayariDB[selected]) {
      shayariDB[selected].forEach(sh => {
        const opt = document.createElement("option");
        opt.value = sh;
        opt.textContent = sh;
        shayariSelect.appendChild(opt);
      });
    }
  });

  shayariSelect.addEventListener("change", () => {
    const selectedText = shayariSelect.value;
    document.getElementById("shayariText").value = selectedText;
  });
};

function generateImage() {
  const file = document.getElementById("imageUpload").files[0];
  const color = document.getElementById("colorPicker").value;
  const text = document.getElementById("shayariText").value;
  const position = document.getElementById("positionSelect").value;

  if (!file) return alert("कृपया एक फोटो चुनें!");

  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.font = `${Math.floor(canvas.height * 0.05)}px sans-serif`;
      ctx.fillStyle = color;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";

      const x = canvas.width / 2;
      const y = position === "top" ? 80 : canvas.height - 60;

      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);

      const output = document.getElementById("outputImage");
      output.src = canvas.toDataURL("image/png");
      output.style.display = "block";
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function downloadImage() {
  const output = document.getElementById("outputImage");
  if (!output.src) return alert("पहले इमेज बनाएं!");

  const link = document.createElement("a");
  link.href = output.src;
  link.download = "shayari-image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function shareWhatsApp() {
  const canvas = document.getElementById("canvas");
  const text = "मैंने Shayari इमेज बनाई है, आप भी बनाएं:\nhttps://myshaadistyle.blogspot.com";

  canvas.toBlob(blob => {
    const file = new File([blob], "shayari.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
        title: "Shayari Image",
        text: text
      });
    } else {
      const msg = encodeURIComponent(text);
      window.open(`https://wa.me/?text=${msg}`, "_blank");
    }
  });
}

function shareFacebook() {
  const url = encodeURIComponent("https://myshaadistyle.blogspot.com");
  const text = encodeURIComponent("फोटो पर शायरी बनाओ और शेयर करो!");
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, "_blank");
}

function shareInstagram() {
  alert("Instagram वेब शेयर अभी समर्थित नहीं है। कृपया इमेज डाउनलोड करके Instagram पर पोस्ट करें।");
}
