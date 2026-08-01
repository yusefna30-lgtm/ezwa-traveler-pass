window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');
    
    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);
        
        // تنفيذ التفعيل المباشر وتخطي شاشة التحقق اليدوي
        setTimeout(() => {
            if (typeof unlockVault === 'function') {
                unlockVault(serialFromUrl);
            } else {
                // البحث عن صندوق التحقق وإخفاؤه مباشرة لفتح الواجهة
                const verificationBox = document.querySelector('input')?.closest('div');
                if (verificationBox) {
                    verificationBox.style.display = 'none';
                }
                // إعادة تحميل أو تحديث الحالة إن وجدت دالة بديلة
                location.reload();
            }
        }, 100);
    } else {
        const savedSerial = localStorage.getItem('ezwa_verified_serial');
        if (savedSerial && typeof unlockVault === 'function') {
            unlockVault(savedSerial);
        }
    }
});
