window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');
    
    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);
        
        setTimeout(() => {
            const inputField = document.querySelector('input');
            if (inputField) {
                inputField.value = serialFromUrl;
                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            // البحث عن الزر الذي يحتوي على كلمة تحقق والضغط عليه تلقائياً
            const buttons = document.querySelectorAll('button, input[type="submit"]');
            let targetBtn = null;
            buttons.forEach(btn => {
                if (btn.textContent.includes('تحقق') || (btn.value && btn.value.includes('تحقق'))) {
                    targetBtn = btn;
                }
            });
            
            if (targetBtn) {
                targetBtn.click();
            } else if (typeof unlockVault === 'function') {
                unlockVault(serialFromUrl);
            }
        }, 500);
    } else {
        const savedSerial = localStorage.getItem('ezwa_verified_serial');
        if (savedSerial && typeof unlockVault === 'function') {
            unlockVault(savedSerial);
        }
    }
});
