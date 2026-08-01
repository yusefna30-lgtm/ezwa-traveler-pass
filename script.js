window.addEventListener('DOMContentLoaded', () => {
    // التقاط الرقم التسلسلي من الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');
    
    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        // حفظ الرقم في الذاكرة
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);
        
        // البحث عن حقل الإدخال وزر التحقق في الصفحة وضغطهما تلقائياً
        setTimeout(() => {
            const inputField = document.querySelector('input[type="text"]') || document.querySelector('input');
            const submitBtn = document.querySelector('button') || document.querySelector('input[type="submit"]');
            
            if (inputField && submitBtn) {
                inputField.value = serialFromUrl;
                // إطلاق حدث التغيير لضمان تفاعل السكريبتات الأصلية مع الحقل
                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));
                
                // الضغط التلقائي على زر التحقق
                submitBtn.click();
            } else if (typeof unlockVault === 'function') {
                unlockVault(serialFromUrl);
            }
        }, 100); // تأخير بسيط جداً لضمان تحميل عناصر الصفحة
    } else {
        // التحقق من الذاكرة المحلية إن لم يوجد في الرابط
        const savedSerial = localStorage.getItem('ezwa_verified_serial');
        if (savedSerial && typeof unlockVault === 'function') {
            unlockVault(savedSerial);
        }
    }
});
