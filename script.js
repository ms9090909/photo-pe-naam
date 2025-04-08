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
  ],
  "Motivational": [
    "जो ठान लिया वो करके दिखाओ...",
    "कभी हार मत मानो...",
    "सपने वही जो नींद तोड़ दें...",
    "कोशिश करने वालों की हार नहीं होती...",
    "जहाँ चाह वहाँ राह..."
  ],
  "Sad": [
    "अब तुझसे क्या शिकवा करें...",
    "तन्हाई में भीगते हैं ख्वाब...",
    "तेरे बिना अधूरा हूं मैं...",
    "खुश रहो तुम, यही दुआ है...",
    "बिछड़ के भी तुझसे मोहब्बत है..."
  ],
  "Funny": [
    "पढ़ाई का क्या है, नींद आती है...",
    "मैं तो सोशल मीडिया का राजा...",
    "गर्लफ्रेंड हो या WIFI, सिग्नल कमजोर...",
    "पढ़ना है तो मजाक छोड़ो...",
    "सोते रहो, सपने आते रहेंगे..."
  ],
  "Attitude": [
    "हमसे जलने वाले भी कमाल करते हैं...",
    "शेर अपनी ताकत से राजा होता है...",
    "Attitude हमारा जन्मजात है...",
    "हम वो हैं जो दिल में उतरते हैं...",
    "हमसे पंगा नहीं लेने का..."
  ],
  "Good Morning": [
    "सुप्रभात! आपका दिन मंगलमय हो...",
    "नया दिन, नई शुरुआत...",
    "सुप्रभात! मुस्कराते रहो...",
    "हर सुबह एक नई आशा लाती है...",
    "खुश रहो हर सुबह की तरह..."
  ],
  "Good Night": [
    "शुभ रात्रि! मीठे सपने देखें...",
    "रात का चाँद आपके साथ हो...",
    "Good Night, Take Care...",
    "हर सपना हो पूरा... शुभ रात्रि!",
    "सो जाइए जनाब... रात काफी हो चुकी है..."
  ],
  "Romantic": [
    "तेरे ख्यालों में ही बीतते हैं दिन...",
    "तेरी हर बात में कुछ खास है...",
    "हर पल तुझसे जुड़ा रहता है दिल...",
    "तेरा नाम ही काफी है...",
    "तेरे साथ हर लम्हा खास है..."
  ]
};

window.onload = function () {
  const categorySelect = document.getElementById("categorySelect");
  for (let category in shayariDB) {
    const opt = document.createElement("option");
    opt.value = category;
    opt.textContent = category;
    categorySelect.appendChild(opt);
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

      ctx.font = "40px Devanagari, Arial";
      ctx.fillStyle = "white";
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

function shareOnWhatsApp() {
  const msg = encodeURIComponent(
    "मैंने अपनी फोटो पर शायरी लगाई है, आप भी ट्राय करो!\nWebsite: https://myshaadistyle.blogspot.com"
  );
  const link = `https://wa.me/?text=${msg}`;
  window.open(link, "_blank");
}
