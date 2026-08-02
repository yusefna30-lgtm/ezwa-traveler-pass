// 1. نصوص السردية التاريخية الخاصة بكل معلم
const NARRATIVES = {
    'murabba': 'قصر المربع: مقر الحكم ومبنى القصور الملكية التي شهدت انطلاقة النهضة الحديثة بالرياض.',
    'masmak': 'قصر المصمك: الحصن التاريخي الشاهد على توحيد المملكة وتأسيس الدولة عام 1319هـ.',
    'diriyah': 'حي الطريف بالدرعية: عاصمة الدولة السعودية الأولى وموقع التراث العالمي المعماري.',
    'hegra': 'مدائن صالح (الحِجر): أول موقع سعودي مسجل في قائمة اليونسكو، موطن الحضارة النبطية.',
    'oldtown': 'بلدة العلا العتيقة: ملتقى القوافل القديم وممر التجار التاريخي عبر الأزمنة.'
};

// 2. دالة محاكاة الموقع (المربوطة مباشرة بأزرار الـ onclick)
window.simulateLocation = function(lat, lng, targetId) {
    // أ) تحديد البطاقة المستهدفة وفتح الختم
    const card = document.getElementById(targetId);
    if (card) {
        card.classList.remove('locked');
        card.classList.add('unlocked');
        
        const statusText = card.querySelector('.status-text');
        if (statusText) {
            statusText.textContent = 'UNLOCKED ✓';
            statusText.style.color = '#d4af37';
            statusText.style.fontWeight = 'bold';
        }
        card.style.borderColor = '#d4af37';
        card.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.4)';
    }

    // ب) تحديث السردية التاريخية الخاصة بالموقع فقط
    const storyText = document.getElementById('story-text');
    if (storyText && NARRATIVES[targetId]) {
        storyText.textContent = NARRATIVES[targetId];
        storyText.style.color = '#d4af37';
    }
};

// 3. دالة تفعيل وتجهيز واجهة الجواز
function activateVault(serialCode) {
    const authSection = document.getElementById('auth-section');
    const passportGrid = document.getElementById('passport-grid');
    const simSection = document.getElementById('sim-section');
    const storySection = document.getElementById('story-section');
    const authStatus = document.getElementById('auth-status');

    if (authSection) authSection.style.display = 'none';
    if (passportGrid) passportGrid.classList.remove('hidden');
    if (simSection) simSection.classList.remove('hidden');
    if (storySection) storySection.classList.remove('hidden');
    if (authStatus) authStatus.textContent = 'تم التفعيل للقطعة: ' + serialCode;
}

// 4. تشغيل الأكواد عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const verifyBtn = document.getElementById('verify-btn');
    const serialInput = document.getElementById('serial-input');

    // أ) التفعيل عند الضغط على زر التحقق اليدوي
    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            const serial = serialInput ? serialInput.value.trim() : 'EZWA-001';
            activateVault(serial);
        });
    }

    // ب) التفعيل التلقائي عند مسح كرت الـ NFC وقراءة الـ Serial من الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');

    if (serialFromUrl) {
        if (serialInput) serialInput.value = serialFromUrl;
        activateVault(serialFromUrl);
    }
});
