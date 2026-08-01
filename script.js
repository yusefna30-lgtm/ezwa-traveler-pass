window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');
    
    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);
        
        setTimeout(() => {
            const inputField = document.querySelector('input[type="text"]') || document.querySelector('input');
            const submitBtn = document.querySelector('button') || document.querySelector('input[type="submit"]');
            const form = document.querySelector('form');
            
            if (inputField) {
                inputField.value = serialFromUrl;
                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.click();
                } else if (form) {
                    form.submit();
                } else if (typeof unlockVault === 'function') {
                    unlockVault(serialFromUrl);
                }
            }, 300);
        }, 300);
    } else {
        const savedSerial = localStorage.getItem('ezwa_verified_serial');
        if (savedSerial && typeof unlockVault === 'function') {
            unlockVault(savedSerial);
        }
    }
});
