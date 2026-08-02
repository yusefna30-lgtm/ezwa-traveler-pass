// 1. تفعيل القطعة والدخول التلقائي فقط بدون فتح المواقع
(function autoVerifySerial() {
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

        setTimeout(() => clearInterval(checkExist), 3000);
    }
})();

// 2. معالجة فتح الأختام والسردية فقط عند ضغط المستخدم الفعلي على الزر
document.addEventListener('DOMContentLoaded', () => {
    const narratives = {
        'المصمك': 'حصن المصمك التاريخي: رمز توحيد المملكة وتأسيس الدولة في قلب الرياض عام 1319هـ.',
        'المربع': 'قصر المربع: مقر الحكم ومبنى القصور الملكية التي شهدت انطلاقة النهضة الحديثة.',
        'الطريف': 'حي الطريف بالدرعية: عاصمة الدولة السعودية الأولى وموقع التراث العالمي المعماري.',
        'صالح': 'الحجر (مدائن صالح): أول موقع سعودي مسجل في اليونسكو، موطن الحضارة النبطية.',
        'العلا': 'بلدة العلا العتيقة: ملتقى القوافل القديم وممر التجار التاريخي عبر الزمن.'
    };

    // الاستماع لضغطات المستخدم الحقيقية فقط
    document.body.addEventListener('click', (e) => {
        const buttonText = e.target.textContent ? e.target.textContent.trim() : '';

        for (const [key, text] of Object.entries(narratives)) {
            // التأكد أن الضغطة كانت على أحد أزرار المحاكاة بالأسفل
            if (buttonText.includes(key)) {
                // أ) فتح ختم الموقع المكتوب عليه LOCKED لهذا الموقع فقط
                document.querySelectorAll('div').forEach(card => {
                    if (card.innerText && card.innerText.includes(key) && card.innerText.includes('LOCKED')) {
                        card.querySelectorAll('*').forEach(child => {
                            if (child.children.length === 0 && child.textContent.trim() === 'LOCKED') {
                                child.textContent = 'UNLOCKED ✓';
                                child.style.color = '#d4af37';
                                child.style.fontWeight = 'bold';
                            }
                        });
                        card.style.borderColor = '#d4af37';
                        card.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.4)';
                    }
                });

                // ب) تحديث السردية التاريخية للموقع المضغوط فقط
                document.querySelectorAll('div, p, span').forEach(el => {
                    if (el.children.length === 0 && (
                        el.textContent.includes('مرحباً بك أيها الرحالة') || 
                        Object.values(narratives).some(n => el.textContent.includes(n.substring(0, 10)))
                    )) {
                        el.textContent = text;
                        el.style.color = '#d4af37';
                    }
                });

                break;
            }
        }
    });
});
