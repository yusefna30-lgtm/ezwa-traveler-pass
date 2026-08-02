// 1. التفعيل التلقائي وتجاوز شاشة التحقق عند قراءة الكرت
(function autoVerifyVault() {
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');

    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);

        const checkExist = setInterval(() => {
            const inputField = document.querySelector('input');
            const allElements = Array.from(document.querySelectorAll('button, div, a, span, input'));
            const submitBtn = allElements.find(el => el.textContent && el.textContent.includes('تحقق وتفعيل'));

            if (inputField) {
                inputField.value = serialFromUrl;
                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));
            }

            if (submitBtn) {
                submitBtn.click();
            }

            if (typeof window.unlockVault === 'function') {
                window.unlockVault(serialFromUrl);
            }

            if (inputField && submitBtn) {
                clearInterval(checkExist);
            }
        }, 100);

        setTimeout(() => clearInterval(checkExist), 4000);
    } else {
        const savedSerial = localStorage.getItem('ezwa_verified_serial');
        if (savedSerial && typeof window.unlockVault === 'function') {
            window.unlockVault(savedSerial);
        }
    }
})();

// 2. تفعيل الضغط على أزرار محاكاة الموقع (GPS Simulation) لفتح الأختام
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        const target = e.target;
        const buttonText = target.textContent ? target.textContent.trim() : '';

        // إذا تم الضغط على أي زر موقع أسفل الشاشة
        if (buttonText && (buttonText.includes('قصر') || buttonText.includes('حي') || buttonText.includes('مدائن') || buttonText.includes('بلدة'))) {
            unlockLocationCard(buttonText);
        }
    });
});

function unlockLocationCard(locationName) {
    // البحث عن بطاقة الموقع المطابقة وتحديث حالتها من LOCKED إلى UNLOCKED
    const allCards = document.querySelectorAll('div, section');
    allCards.forEach(card => {
        if (card.children.length < 5 && card.textContent.includes(locationName) && card.textContent.includes('LOCKED')) {
            card.innerHTML = card.innerHTML.replace(/LOCKED/g, '<span style="color: #d4af37; font-weight: bold;">UNLOCKED ✓</span>');
            card.style.borderColor = '#d4af37';
            card.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
        }
    });
}
