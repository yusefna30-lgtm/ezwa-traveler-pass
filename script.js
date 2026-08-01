const landmarks = [
    { 
        id: 'murabba', 
        name: 'قصر المربع التاريخي', 
        lat: 24.6433, 
        lon: 46.7111, 
        radius: 5.0,
        story: 'قصر المربع التاريخي: المقر الرسمي للمؤسس الملك عبدالعزيز بن عبدالرحمن آل سعود -رحمه الله-، شُيد عام 1356هـ (1937م) خارج أسوار مدينة الرياض القديمة، ويُعد تحفة معمارية بارزة تعكس أصالة العمارة النجدية التقليدية.'
    },
    { 
        id: 'masmak', 
        name: 'قصر المصمك', 
        lat: 24.6318, 
        lon: 46.7126, 
        radius: 5.0,
        story: 'قصر المصمك: الحصن التاريخي المنيع الذي يمثل نقطة التحول الكبرى وملحمة استرداد الرياض وتأسيس الدولة السعودية الحديثة عام 1319هـ (1902م)، ويتميز ببنائه الطيني وأبوابه الخشبية الضخمة.'
    },
    { 
        id: 'diriyah', 
        name: 'حي الطريف التاريخي بالدرعية', 
        lat: 24.7350, 
        lon: 46.5744, 
        radius: 5.0,
        story: 'حي الطريف بالدرعية: مسقط رأس الدولة السعودية الأولى وعاصمتها التاريخية، والمُسجل في قائمة التراث العالمي لليونسكو. يضم قصوراً طينية شاهقة توثق جذور الأمجاد التاريخية للمملكة.'
    },
    { 
        id: 'hegra', 
        name: 'موقع الحِجر (مدائن صالح)', 
        lat: 26.7886, 
        lon: 37.9515, 
        radius: 10.0,
        story: 'موقع الحِجر بالعلا: أول موقع سعودي يُسجل في قائمة التراث العالمي لليونسكو. يضم واجهات صخرية نبطية منحوتة ببراعة هندسية فريدة تعود آلاف السنين وتؤرخ لعراقة الحضارات المتعاقبة.'
    },
    { 
        id: 'oldtown', 
        name: 'بلدة العلا العتيقة', 
        lat: 26.6131, 
        lon: 37.9231, 
        radius: 10.0,
        story: 'بلدة العلا العتيقة: تجمع فريد لمئات المنازل الطينية المتراصة التي كانت ملتقى للقوافل التجارية على طريق الحج التاريخي، وتنبض بعراقة الهندسة العمرانية التقليدية.'
    }
];

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; 
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1);
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

window.addEventListener('DOMContentLoaded', () => {
    const savedSerial = localStorage.getItem('ezwa_verified_serial');
    if (savedSerial) {
        unlockVault(savedSerial);
    }
});

document.getElementById('verify-btn').addEventListener('click', () => {
    const inputVal = document.getElementById('serial-input').value.trim();
    if (inputVal.startsWith('EZWA-')) {
        localStorage.setItem('ezwa_verified_serial', inputVal);
        unlockVault(inputVal);
    } else {
        alert('أدخل رقماً صحيحاً يبدأ بـ EZWA- (مثال: EZWA-001)');
    }
});

function unlockVault(serial) {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('passport-grid').classList.remove('hidden');
    document.getElementById('sim-section').classList.remove('hidden');
    document.getElementById('auth-status').innerHTML = `قطعة موثقة: [ ${serial} ]`;
    
    checkRealGeoLocation();
}

function checkRealGeoLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            processCoordinates(position.coords.latitude, position.coords.longitude);
        }, function(error) {
            // خطأ أو رفض إذن الموقع
        });
    }
}

function simulateLocation(lat, lon, landmarkId) {
    let landmark = landmarks.find(l => l.id === landmarkId);
    processCoordinates(lat, lon, landmark);
    let statusBadge = document.getElementById("auth-status");
    statusBadge.innerHTML = `[محاكاة ميدانية] تم تفعيل سجل: ${landmark.name}`;
}

function processCoordinates(userLat, userLon, clickedLandmark = null) {
    landmarks.forEach(landmark => {
        let distance = getDistanceFromLatLonInKm(userLat, userLon, landmark.lat, landmark.lon);
        if (distance <= landmark.radius) {
            let card = document.getElementById(landmark.id);
            card.classList.remove("locked");
            card.classList.add("unlocked");
            card.querySelector(".status-text").innerText = "UNLOCKED";
        }
    });

    // عرض قصة الموقع عند الضغط عليه في المحاكاة
    if (clickedLandmark) {
        let storyBox = document.getElementById("story-section");
        let storyText = document.getElementById("story-text");
        storyBox.classList.remove("hidden");
        storyText.innerText = clickedLandmark.story;
    }

    // التحقق مما إذا تم فتح جميع الأختام
    let allUnlocked = landmarks.every(landmark => {
        let card = document.getElementById(landmark.id);
        return card && card.classList.contains('unlocked');
    });

    // إذا اكتملت جميع الأختام، تظهر المكافأة الكبرى
    if (allUnlocked) {
        let storyBox = document.getElementById("story-section");
        let storyText = document.getElementById("story-text");
        storyBox.classList.remove("hidden");
        storyText.innerHTML = `
            <div style="border-bottom: 1px dashed #c5a059; padding-bottom: 12px; margin-bottom: 12px;">
                <strong>[ إنجاز استثنائي - نخبة الرحالة ]</strong><br>
                لقد أتممت بنجاح زيارة كافة معالم الأرشيف التاريخي لـ [ EZWA ]!<br>
                كهدية تقديرية لكونك من نخبة عملائنا، استخدم كود الخصم الحصري لطلبك القادم:
            </div>
            <div style="font-size: 1.3rem; color: #c5a059; font-weight: bold; letter-spacing: 2px;">
                EZWA-VIP-2026
            </div>
        `;
    }
}
