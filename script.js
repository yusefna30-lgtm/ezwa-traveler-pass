window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');
    
    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);
        
        setTimeout(() => {
            const inputField = document.querySelector('input[type="text"]') || document.querySelector('input');
            const submitBtn = document.querySelector('button') || document.querySelector('input[type="submit"]');
            
            if (inputField) {
                inputField.value = serialFromUrl;
                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            if (submitBtn) {
                // محاكاة ضغطة حقيقية تماماً كأن المستخدم ضغط بيديّه على الزر
                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                submitBtn.dispatchEvent(clickEvent);
            }
            
            // استدعاء مباشر لوظيفة فتح الخزنة إن وجدت في ملفك
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
