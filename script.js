// 1. التفعيل التلقائي عند قراءة الرابط
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
    }
})();

// 2. ربط أزرار المحاكاة بالأختام والسردية التاريخية
document.addEventListener('DOMContentLoaded', () => {
    const narratives = {
        'المصمك': 'حصن المصمك التاريخي: رمز توحيد المملكة وتأسيس الدولة في قلب الرياض عام 1319هـ.',
        'المربع': 'قصر المربع: مقر الحكم ومبنى القصور الملكية التي شهدت انطلاقة النهضة الحديثة.',
        'الطريف': 'حي الطريف بالدرعية: عاصمة الدولة السعودية الأولى وموقع التراث العالمي المعماري.',
        'صالح': 'الحجر (مدائن صالح): أول موقع سعودي مسجل في اليونسكو، موطن الحضارة النبطية.',
        'العلا': 'بلدة العلا العتيقة: ملتقى القوافل القديم وممر التجار التاريخي عبر الزمن.'
    };

    document.body.addEventListener('click', (e) => {
        const clickedText = e.target.textContent || '';
        
        for (const [key, text] of Object.entries(narratives)) {
            if (clickedText.includes(key)) {
                // أولاً: البحث عن البطاقة التي تحتوي اسم الموقع كلمة LOCKED
                document.querySelectorAll('div').forEach(box => {
                    if (box.innerText && box.innerText.includes(key) && box.innerText.includes('LOCKED')) {
                        // استهداف العنصر الذي يحتوي النص LOCKED فقط وتغييره
                        box.querySelectorAll('*').forEach(child => {
                            if (child.children.length === 0 && child.textContent.trim() === 'LOCKED') {
                                child.textContent = 'UNLOCKED ✓';
                                child.style.color = '#d4af37';
                                child.style.fontWeight = 'bold';
                            }
                        });
                        box.style.borderColor = '#d4af37';
                        box.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.4)';
                    }
                });

                // ثانياً: تحديث نص السردية التاريخية
                document.querySelectorAll('div, p, span').forEach(el => {
                    if (el.children.length === 0 && (el.textContent.includes('مرحباً بك أيها الرحالة') || Object.values(narratives).some(n => el.textContent.includes(n.substring(0, 10))))) {
                        el.textContent = text;
                        el.style.color = '#d4af37';
                    }
                });

                break;
            }
        }
    });
});
