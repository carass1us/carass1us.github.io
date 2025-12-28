document.addEventListener('DOMContentLoaded', () => {
    
    // --- ACCORDION LOGIC (UPDATED) ---
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            // Toggle class active
            item.classList.toggle('active');

            // Logika Dynamic Height
            if (item.classList.contains('active')) {
                // Jika aktif, set tinggi sesuai tinggi konten asli (scrollHeight)
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                // Jika tidak aktif, kembalikan ke 0
                content.style.maxHeight = "0";
            }
        });
    });

    // --- PDF MODAL LOGIC ---
    const modal = document.getElementById('pdf-modal');
    const closeBtn = document.querySelector('.close-modal');
    const pdfFrame = document.getElementById('pdf-frame');
    const viewButtons = document.querySelectorAll('.view-pdf-btn');
    const downloadLink = document.getElementById('download-link');

    // Fungsi membuka modal
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pdfUrl = btn.getAttribute('data-pdf');
            
            // Set sumber iframe ke URL PDF
            pdfFrame.src = pdfUrl;
            downloadLink.href = pdfUrl;
            
            // Tampilkan modal
            modal.style.display = 'block';
            
            // Non-aktifkan scroll pada body
            document.body.style.overflow = 'hidden';
        });
    });

    // Fungsi menutup modal
    function closeModal() {
        modal.style.display = 'none';
        pdfFrame.src = ''; // Clear source agar audio/video stop jika ada
        document.body.style.overflow = 'auto'; // Aktifkan scroll kembali
    }

    closeBtn.addEventListener('click', closeModal);

    // Tutup jika klik di luar area konten modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});