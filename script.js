window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serialFromUrl = urlParams.get('serial');

    if (serialFromUrl && serialFromUrl.startsWith('EZWA-')) {
        localStorage.setItem('ezwa_verified_serial', serialFromUrl);

        const executeActivation = () => {
            // 1. تعبئة الرقم التسلسلي في الخانة
            const inputField = document.querySelector('input');
            if (inputField) {
                inputField.value = serialFromUrl;
                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));
            }

            // 2. البحث عن أي عنصر بالصفحة يحتوي نص التفعيل (حتى لو كان div)
            const allElements = Array.from(document.querySelectorAll('button, div, a, span, input'));
            const targetElement = allElements.find(el => 
                el.textContent && el.textContent.includes('تحقق وتفعيل')
            );

            if (targetElement) {
                // تنفيذ النقرة بجميع الطرق البرمجية الممكنة
                targetElement.click();
                if (typeof targetElement.onclick === 'function') {
                    targetElement.onclick();
                }
            } 
            
            // 3. استدعاء دالة الفتح المباشرة إن وجدت
            if (typeof unlockVault === 'function') {
                unlockVault(serialFromUrl);
            }
        };

        // تشغيل المحاولة فوراً وبعد تأخير بسيط لضمان اكتمال تحميل عناصر الواجهة
        setTimeout(executeActivation, 300);
        setTimeout(executeActivation, 800);
    } else {
        const savedSerial = localStorage.getItem('ezwa_verified_serial');
        if (savedSerial && typeof unlockVault === 'function') {
            unlockVault(savedSerial);
        }
    }
});
