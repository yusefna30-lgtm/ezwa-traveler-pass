window.addEventListener('DOMContentLoaded', () => {
    // التحقق مما إذا كان الكرت يحمل رقماً تسلسلياً مدمجاً في الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');
    
    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);
        unlockVault(serialFromUrl);
    } else {
        const savedSerial = localStorage.getItem('ezwa_verified_serial');
        if (savedSerial) {
            unlockVault(savedSerial);
        }
    }
});
