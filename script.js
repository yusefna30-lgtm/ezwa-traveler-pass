const landmarks = [
    { id: 'murabba', name: 'قصر المربع التاريخي', lat: 24.6433, lon: 46.7111, radius: 2.0 },
    { id: 'masmak', name: 'قصر المصمك', lat: 24.6318, lon: 46.7126, radius: 1.5 },
    { id: 'diriyah', name: 'حي الطريف التاريخي بالدرعية', lat: 24.7350, lon: 46.5744, radius: 2.0 },
    { id: 'hegra', name: 'موقع الحِجر التاريخي بالعلا', lat: 26.7886, lon: 37.9515, radius: 5.0 },
    { id: 'oldtown', name: 'بلدة العلا العتيقة', lat: 26.6131, lon: 37.9231, radius: 3.0 }
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

// التحقق من وجود تفعيل سابق مخزن في المتصفح للقطعة
window.addEventListener('DOMContentLoaded', () => {
    const savedSerial = localStorage.getItem('ezwa_verified_serial');
    if (savedSerial) {
        unlockVault(savedSerial);
    }
});

document.getElementById('verify-btn').addEventListener('click', () => {
    const inputVal = document.getElementById('serial-input').value.trim();
    // افتراض أن الأكواد تبدأ بـ EZWA- وتليها أرقام صحيحة
    if (inputVal.startsWith('EZWA-') && inputVal.length >= 8) {
        localStorage.setItem('ezwa_verified_serial', inputVal);
        unlockVault(inputVal);
    } else {
        alert('الرقم التسلسلي غير صحيح. تأكد من الكود المطبوع على تكت القطعة.');
    }
});

function unlockVault(serial) {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('passport-grid').classList.remove('hidden');
    document.getElementById('auth-status').innerHTML = `القطعة موثقة بنجاح: [ ${serial} ]`;
    
    // تشغيل فحص الـ GPS بعد التحقق من القطعة
    checkGeoLocation();
}

function checkGeoLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLat = position.coords.latitude;
            var userLon = position.coords.longitude;
            
            landmarks.forEach(landmark => {
                let distance = getDistanceFromLatLonInKm(userLat, userLon, landmark.lat, landmark.lon);
                if (distance <= landmark.radius) {
                    let card = document.getElementById(landmark.id);
                    card.classList.remove("locked");
                    card.classList.add("unlocked");
                    card.querySelector(".status-text").innerText = "UNLOCKED";
                    
                    let storyBox = document.getElementById("story-section");
                    let storyText = document.getElementById("story-text");
                    storyBox.classList.remove("hidden");
                    storyText.innerText = `أهلاً بك في ${landmark.name}. تم تسجيل الزيارة بنجاح في الأرشيف الميداني لقطعتك.`;
                }
            });
        }, function(error) {
            document.getElementById('auth-status').innerHTML += " | يجدر السماح بالموقع لتفعيل الأختام الحية.";
        });
    }
}
