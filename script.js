window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');
    
    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);
        
        setTimeout(() => {
            const inputField = document.querySelector('input[type="text"]') || document.querySelector('input');
            const submitBtn = document.querySelector('button') || document.querySelector('input[type="submit"]');
            
            if (inputField && submitBtn) {
                inputField.value = serialFromUrl;
                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));
                
                // إضافة تأخير بسيط جداً لضمان تفاعل الزر وانتقال الصفحة
                setTimeout(() => {
                    submitBtn.click();
                }, 400);
            }
        }, 300);
    } else {
        const savedSerial = localStorage.getItem('ezwa_verified_serial');
        if (savedSerial && typeof unlockVault === 'function') {
            unlockVault(savedSerial);
        }
    }
});
