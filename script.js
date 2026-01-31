document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. ACCORDION LOGIC
    // =========================================
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });

    // =========================================
    // 2. PDF MODAL LOGIC
    // =========================================
    const modal = document.getElementById('pdf-modal');
    // Cek apakah modal ada di halaman untuk mencegah error
    if (modal) {
        const closeBtn = document.querySelector('.close-modal');
        const pdfFrame = document.getElementById('pdf-frame');
        const viewButtons = document.querySelectorAll('.view-pdf-btn');
        const downloadLink = document.getElementById('download-link');

        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const pdfUrl = btn.getAttribute('data-pdf');
                pdfFrame.src = pdfUrl;
                downloadLink.href = pdfUrl;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        function closeModal() {
            modal.style.display = 'none';
            pdfFrame.src = ''; 
            document.body.style.overflow = 'auto';
        }

        if(closeBtn) closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // =========================================
    // 3. MOBILE NAVIGATION LOGIC
    // =========================================
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            burger.classList.toggle('toggle');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach((link) => {
                    link.style.animation = '';
                });
            });
        });
    }

    // =========================================
    // 4. TYPING EFFECT LOGIC (UPDATED)
    // =========================================
    const typingTextElement = document.querySelector('.typing-text');

    // Pastikan elemennya ADA sebelum menjalankan logika
    if (typingTextElement) {
        const words = [
            "Hello :)",          // Inggris
            "你好 :)",            // Mandarin (Hanzi)
            "こんにちは ^_^",       // Jepang (Hiragana)
            "안녕하세요 :D",        // Korea (Hangul)
            "Привет ^u^",         // Rusia (Cyrillic)
            "Bonjour!~",        // Prancis
            "Hola :p",           // Spanyol
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            let typeSpeed = 150; 

            if (isDeleting) {
                // Menghapus
                typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 80; 
            } else {
                // Mengetik
                typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150; 
            }

            // Logika pergantian status
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Jeda saat kata selesai diketik
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; 
                typeSpeed = 500; // Jeda sebelum mengetik kata baru
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // Jalankan fungsi pertama kali
        typeEffect();
    } else {
        console.error("Element .typing-text tidak ditemukan di HTML!");
    }

    /* =========================================
    LIVE CLOCK LOGIC
    ========================================= */

    function updateClock() {
        const now = new Array();
        const dateObj = new Date(); // Ambil waktu sekarang

        // 1. FORMAT JAM (HH:MM:SS)
        // Kita pakai padStart(2, '0') biar kalau jam 9 jadi '09', bukan '9'
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0'); // Opsional, kalau mau detik
        
        // Update HTML Jam
        // Kalau mau tanpa detik, hapus bagian ":${seconds}" di bawah
        document.getElementById('clock-time').textContent = `${hours}:${minutes}:${seconds}`;

        // 2. FORMAT TANGGAL (Hari, Tanggal Bulan)
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const dayName = days[dateObj.getDay()];
        const dateNum = dateObj.getDate();
        const monthName = months[dateObj.getMonth()];
        const year = dateObj.getFullYear();

        // Update HTML Tanggal (Contoh: WED, 07 JAN 2026)
        document.getElementById('clock-date').textContent = `${dayName}, ${dateNum} ${monthName} ${year}`;
    }

    // Jalankan fungsi sekali saat web loading biar gak nunggu 1 detik baru muncul
    updateClock();

    // Jalankan ulang setiap 1000 milidetik (1 detik)
    setInterval(updateClock, 1000);

});

/* =========================================
   TEACHING SLIDES VIEWER LOGIC
   ========================================= */
const viewSlideBtns = document.querySelectorAll('.view-slides');
// Kita pakai modal yang sama dengan portfolio
const modal = document.getElementById('pdfModal'); 
const modalImg = document.getElementById('pdf-frame');
const captionText = document.getElementById('modal-title');
const downloadLink = document.getElementById('download-link');
const closeModal = document.querySelector('.close-modal');

if (viewSlideBtns) {
    viewSlideBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah scroll ke atas
            
            const pdfUrl = this.getAttribute('data-pdf');
            
            // Ambil judul dari elemen h3 di dekat tombol
            // (Traversing DOM: tombol -> parent action -> parent content -> cari h3)
            const title = this.closest('.syllabus-content').querySelector('h3').innerText;

            modal.style.display = "block";
            modalImg.src = pdfUrl;
            captionText.innerText = title; // Set judul modal sesuai materi
            downloadLink.href = pdfUrl;
            
            // Lock Scroll
            document.body.style.overflow = "hidden";
        });
    });
}

// Logic Close Modal (Sudah ada di script lama, tapi pastikan ini tercover)
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
        modalImg.src = ""; // Stop loading PDF
        document.body.style.overflow = "auto"; // Unlock scroll
    });
}

// Close kalau klik di luar modal
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
        modalImg.src = "";
        document.body.style.overflow = "auto";
    }
});