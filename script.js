window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');
    
    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);
        
        setTimeout(() => {
            const inputField = document.querySelector('input');
            const form = document.querySelector('form');
            
            if (inputField) {
                inputField.value = serialFromUrl;
                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            // إرسال النموذج (Form Submit) مباشرة لتجاوز حظر المتصفح للضغط البرمجي
            if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                if (typeof form.submit === 'function') {
                    // تفادي إعادة تحميل الصفحة إذا كانت SPA، أو تفعيل الإرسال
                }
            }
            
            // التشغيل المباشر لدالة فتح الخزنة إن وجدت في مشروعك
            if (typeof unlockVault === 'function') {
                unlockVault(serialFromUrl);
            }
        }, 300);
    } else {
        const savedSerial = localStorage.getItem('ezwa_verified_serial');
        if (savedSerial && typeof unlockVault === 'function') {
            unlockVault(savedSerial);
        }
    }
});
