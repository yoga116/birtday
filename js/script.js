document.addEventListener("DOMContentLoaded", () => {
  const musicOverlay = document.getElementById('music-overlay');
  const mainContent = document.getElementById('main-content');
  const startButton = document.getElementById('start-button');
  const bgMusic = document.getElementById('bg-music');

  // Fungsi untuk memulai website dan musik
  startButton.addEventListener('click', () => {
    // Memulai musik
    bgMusic.play().catch(error => {
      console.log("Autoplay ditolak oleh browser, butuh interaksi pengguna.", error);
    });

    // Menghilangkan overlay secara perlahan
    musicOverlay.style.opacity = '0';
    setTimeout(() => {
      musicOverlay.style.display = 'none';
    }, 1000); // Sesuaikan dengan durasi transisi di CSS

    // Menampilkan konten utama
    mainContent.style.opacity = '1';
    
    // Memulai efek ketik setelah konten muncul
    typeEffect();
  });

  /* ----- Efek Ketik ----- */
  const text = "Selamat ulang tahun ya, sayangku yang paling aku cintai 🎂💕 Semoga kamu selalu bahagia dan semua keinginanmu tercapai. Terus sama aku ya! 💖";
  const typingText = document.getElementById("typingText");
  let i = 0;
  let isTypingStarted = false;
  function typeEffect() {
    if (isTypingStarted) return; // Mencegah duplikasi
    isTypingStarted = true;
    
    function type() {
      if (i < text.length) {
        typingText.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 60);
      }
    }
    type();
  }

  /* ----- Fungsi Surat Cinta ----- */
  const openBtn = document.getElementById("openLetter");
  const closeBtn = document.getElementById("closeLetter");
  const loveLetter = document.getElementById("loveLetter");
  openBtn.addEventListener("click", () => {
    loveLetter.classList.add("show-message");
    loveLetter.classList.remove("hidden-message");
  });
  closeBtn.addEventListener("click", () => {
    loveLetter.classList.remove("show-message");
    loveLetter.classList.add("hidden-message");
  });

  /* ----- Efek Confetti ----- */
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const confettis = [];
  for (let i = 0; i < 100; i++) {
    confettis.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 4 + 2,
      dx: Math.random() - 0.5,
      dy: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 90%, 70%)`
    });
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach(c => {
      ctx.beginPath();
      ctx.rect(c.x, c.y, c.r, c.r * 1.5);
      ctx.fillStyle = c.color;
      ctx.fill();
    });
  }

  function updateConfetti() {
    confettis.forEach(c => {
      c.x += c.dx;
      c.y += c.dy;
      if (c.y > canvas.height) {
        c.y = -20;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  /* ----- Efek Kembang Api ----- */
  const fCanvas = document.getElementById("fireworksCanvas");
  const fCtx = fCanvas.getContext("2d");
  fCanvas.width = window.innerWidth;
  fCanvas.height = window.innerHeight;
  const fireworks = [];

  function Firework(x, y) {
    this.x = x; this.y = y; this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: x, y: y, dx: (Math.random() - 0.5) * 5, dy: (Math.random() - 0.5) * 5,
        life: 80, color: `hsl(${Math.random() * 360}, 100%, 60%)`
      });
    }
  }
  Firework.prototype.draw = function() {
    this.particles.forEach(p => {
      fCtx.globalAlpha = p.life / 80; fCtx.beginPath();
      fCtx.arc(p.x, p.y, 2, 0, Math.PI * 2); fCtx.fillStyle = p.color;
      fCtx.fill(); fCtx.globalAlpha = 1;
    });
  };
  Firework.prototype.update = function() {
    this.particles.forEach(p => {
      p.x += p.dx; p.y += p.dy; p.life -= 1;
    });
  };

  setInterval(() => {
    fireworks.push(new Firework(Math.random() * fCanvas.width, Math.random() * fCanvas.height / 2));
  }, 2500);

  function animateAll() {
    drawConfetti(); updateConfetti();
    fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);
    fireworks.forEach((fw, i) => {
      fw.draw(); fw.update();
      fw.particles = fw.particles.filter(p => p.life > 0);
      if (fw.particles.length === 0) fireworks.splice(i, 1);
    });
    requestAnimationFrame(animateAll);
  }
  animateAll();

  /* ----- Efek Hujan Hati ----- */
  const heartsContainer = document.getElementById("heartsContainer");
  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.innerHTML = "❤️";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 400);

  /* ----- Fungsi Kue Virtual ----- */
  const cake = document.getElementById("cake");
  cake.addEventListener("click", () => {
    alert("🎂 Ini potongan kue pertama untukmu, sayang. Make a wish! 💕");
  });

  /* ----- Penyesuaian Ukuran Jendela ----- */
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    fCanvas.width = window.innerWidth; fCanvas.height = window.innerHeight;
  });
});
