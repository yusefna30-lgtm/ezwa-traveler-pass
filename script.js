(function autoVerifyVault() {
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');

    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        // 1. حفظ الرقم التسلسلي في الذاكرة
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);

        // 2. فحص مستمر كل 100 مللي ثانية لحين ظهور عناصر الصفحة للضغط عليها فوراً
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
                // محاكاة الضغط الفعلي
                submitBtn.click();
            }

            // تشغيل دالة الفتح المباشرة إن كانت معرفة بالنظام
            if (typeof window.unlockVault === 'function') {
                window.unlockVault(serialFromUrl);
            }

            // إيقاف المؤقت بمجرد التنسيق
            if (inputField && submitBtn) {
                clearInterval(checkExist);
            }
        }, 100);

        // إيقاف البحث التلقائي بعد 4 ثوانٍ لتجنب استهلاك الذاكرة
        setTimeout(() => clearInterval(checkExist), 4000);
    } else {
        const savedSerial = localStorage.getItem('ezwa_verified_serial');
        if (savedSerial && typeof window.unlockVault === 'function') {
            window.unlockVault(savedSerial);
        }
    }
})();
