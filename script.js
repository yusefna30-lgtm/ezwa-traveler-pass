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
    }
})();

// 2. معالج الضغط على أزرار محاكاة الموقع (GPS Simulation) وتحديث الأختام والسردية
document.addEventListener('DOMContentLoaded', () => {
    // قائمة السرد التاريخي لكل موقع
    const narratives = {
        'المصمك': 'حصن المصمك التاريخي: رمز توحيد المملكة وتأسيس الدولة في قلب الرياض عام 1319هـ.',
        'المربع': 'قصر المربع: مقر الحكم ومبنى القصور الملكية التي شهدت انطلاقة النهضة الحديثة.',
        'الطريف': 'حي الطريف بالدرعية: عاصمة الدولة السعودية الأولى وموقع التراث العالمي المعماري.',
        'مدائن صالح': 'الحجر (مدائن صالح): أول موقع سعودي مسجل في اليونسكو، موطن الحضارة النبطية.',
        'العلا': 'بلدة العلا العتيقة: ملتقى القوافل القديم وممر التجار التاريخي عبر الزمن.'
    };

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('button, div, a, span');
        if (!btn) return;

        const text = btn.textContent ? btn.textContent.trim() : '';

        // التحقق مما إذا كان العنصر المضغوط هو أحد أزرار محاكاة الموقع
        Object.keys(narratives).forEach(locKey => {
            if (text.includes(locKey)) {
                // أ) فتح الختم في البطاقة العلوية
                unlockCard(locKey);

                // ب) تحديث النص في السردية التاريخية للموقع
                updateNarrative(narratives[locKey]);
            }
        });
    });
});

function unlockCard(locationKey) {
    // البحث عن بطاقات الأختام العلويّة
    const cards = document.querySelectorAll('div');
    cards.forEach(card => {
        // التأكد أن البطاقة تحتوي اسم الموقع وأنها ليست الزر نفسه
        if (card.textContent.includes(locationKey) && card.children.length > 0 && card.children.length < 8) {
            // البحث عن نص LOCKED داخل البطاقة وتغييره
            const allElements = card.querySelectorAll('*');
            allElements.forEach(el => {
                if (el.children.length === 0 && el.textContent.includes('LOCKED')) {
                    el.textContent = 'UNLOCKED ✓';
                    el.style.color = '#d4af37';
                    el.style.fontWeight = 'bold';
                    card.style.borderColor = '#d4af37';
                    card.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.4)';
                }
            });
        }
    });
}

function updateNarrative(narrativeText) {
    // البحث عن منطقة السردية التاريخية وتحديث النص فيها
    const allDivs = document.querySelectorAll('div, p, section');
    allDivs.forEach(el => {
        if (el.textContent.includes('السردية التاريخية للموقع') || el.textContent.includes('مرحباً بك أيها الرحالة')) {
            const textNode = el.querySelector('p') || el;
            if (textNode) {
                textNode.textContent = narrativeText;
                textNode.style.color = '#d4af37';
            }
        }
    });
}
