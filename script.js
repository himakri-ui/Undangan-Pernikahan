// === 1. JAPANESE ENVELOPE / DOOR OPENING ANIMATION ===
function openInvitation() {
    const doorLeft = document.getElementById('door-left');
    const doorRight = document.getElementById('door-right');
    const doorContent = document.getElementById('door-content');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const mainContent = document.getElementById('main-content');

    // Fade out opening button card
    doorContent.classList.add('fade-out-content');

    // Slide doors open after delay
    setTimeout(() => {
        doorLeft.classList.add('door-open-left');
        doorRight.classList.add('door-open-right');
    }, 300);

    // Hide overlay & show main content
    setTimeout(() => {
        welcomeOverlay.classList.add('hidden');
        mainContent.classList.remove('opacity-0');
        
        // Trigger initial scroll reveal animations
        handleScrollReveal();
        
        // Auto play audio
        toggleAudio();
    }, 1100);
}

// === 2. BACKGROUND MUSIC CONTROLLER ===
const bgMusic = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;

function toggleAudio() {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.classList.remove('fa-compact-disc', 'fa-spin');
        musicIcon.classList.add('fa-music');
    } else {
        bgMusic.play().then(() => {
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-compact-disc', 'fa-spin');
        }).catch(() => {
            console.log("Audio autoplay restricted by browser.");
        });
    }
    isPlaying = !isPlaying;
}

// === 3. JAPANESE UKIYO-E WAVE & CLOUD CANVAS ANIMATION ===
const canvas = document.getElementById('japan-wave-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let waveOffset = 0;

function drawJapaneseWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    waveOffset += 0.015;

    // Draw Japanese Ukiyo-e Crest Wave Layer 1
    ctx.beginPath();
    ctx.fillStyle = 'rgba(2, 132, 199, 0.08)';
    for (let x = 0; x < canvas.width; x += 10) {
        const y = Math.sin(x * 0.005 + waveOffset) * 20 + canvas.height * 0.85;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();

    // Draw Japanese Wave Layer 2 (Gold Accent Waves)
    ctx.beginPath();
    ctx.fillStyle = 'rgba(245, 158, 11, 0.06)';
    for (let x = 0; x < canvas.width; x += 10) {
        const y = Math.cos(x * 0.008 + waveOffset * 1.2) * 15 + canvas.height * 0.88;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();

    requestAnimationFrame(drawJapaneseWaves);
}
drawJapaneseWaves();

// === 4. SCROLL REVEAL ANIMATION OBSERVER ===
function handleScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-scroll');
    const windowHeight = window.innerHeight;

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}
window.addEventListener('scroll', handleScrollReveal);

// === 5. COUNTDOWN TIMER ===
const targetDate = new Date('May 15, 2027 08:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "<p class='col-span-4 text-amber-300 font-bold'>Acara Telah Berlangsung</p>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// === 6. RSVP MESSAGES MANAGEMENT ===
const rsvpForm = document.getElementById('rsvp-form');
const messagesContainer = document.getElementById('messages-container');

const initialMessages = [
    { name: "Luffy", status: "Hadir", message: "Selamat Alif & Nia! Makanan resepnya harus yang enak ya!" },
    { name: "Nami", status: "Hadir", message: "Selamat atas pelayaran barunya! Semoga selalu bahagia & lancar rezekinya." }
];

function renderMessages() {
    messagesContainer.innerHTML = '';
    initialMessages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message-item';
        msgDiv.innerHTML = `
            <div class="flex items-center justify-between mb-1">
                <span class="font-bold text-xs text-slate-800">${msg.name}</span>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded ${
                    msg.status === 'Hadir' ? 'bg-emerald-100 text-emerald-700' : 
                    msg.status === 'Ragu' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                }">${msg.status}</span>
            </div>
            <p class="text-xs text-slate-600 font-light">${msg.message}</p>
        `;
        messagesContainer.prepend(msgDiv);
    });
}
renderMessages();

rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('rsvp-name').value.trim();
    const status = document.getElementById('rsvp-status').value;
    const message = document.getElementById('rsvp-message').value.trim();

    if (name && message) {
        initialMessages.push({ name, status, message });
        renderMessages();
        rsvpForm.reset();
        alert('Terima kasih! Konfirmasi dan doa Anda telah terkirim.');
    }
});

// === 7. COPY ACCOUNT NUMBER FUNCTION ===
function copyToClipboard() {
    const accountNumber = document.getElementById('account-number').innerText.replace(/\s+/g, '');
    navigator.clipboard.writeText(accountNumber).then(() => {
        const copyTextBtn = document.getElementById('copy-text');
        copyTextBtn.innerText = 'Berhasil Disalin!';
        setTimeout(() => {
            copyTextBtn.innerText = 'Salin Nomor Rekening';
        }, 2000);
    });
}