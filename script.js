window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');

    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        // 1. حفظ الرقم في الذاكرة المحلية
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);

        // 2. تعبئة الحقل بالرقم التسلسلي
        const inputField = document.querySelector('input');
        if (inputField) {
            inputField.value = serialFromUrl;
        }

        // 3. محاولة تشغيل دالة الضغط على الزر إن وجدت
        const allElements = Array.from(document.querySelectorAll('button, div, a, input'));
        const btn = allElements.find(el => el.textContent && el.textContent.includes('تحقق وتفعيل'));
        if (btn) {
            btn.click();
        }

        // 4. إخفاء شاشة التحقق المباشرة من الواجهة برمجياً
        setTimeout(() => {
            // البحث عن المربع الذهبي الذي يحتوي على الخانة والزر وإخفائه
            const authContainer = inputField ? inputField.closest('div[style*="border"], div') : null;
            
            // إخفاء جميع العناصر التي تحتوي نص "أدخل الكود"
            document.querySelectorAll('div, section, main').forEach(el => {
                if (el.innerText && el.innerText.includes('أدخل الكود التجريبي') && el.children.length < 10) {
                    el.style.display = 'none';
                }
            });

            // إظهار واجهة الجواز والأختام (الخزنة)
            if (typeof unlockVault === 'function') {
                unlockVault(serialFromUrl);
            }
        }, 100);
    } else {
        const savedSerial = localStorage.getItem('ezwa_verified_serial');
        if (savedSerial && typeof unlockVault === 'function') {
            unlockVault(savedSerial);
        }
    }
});
