// إحداثيات المعالم الأربعة مع نطاق السماح (بالكيلومتر)
const landmarks = [
    { id: 'diriyah', name: 'الدرعية', lat: 24.7333, lon: 46.5666, radius: 2.0 },
    { id: 'alula', name: 'العلا', lat: 26.6131, lon: 37.9231, radius: 5.0 },
    { id: 'masmak', name: 'قصر المصمك', lat: 24.4287, lon: 46.7097, radius: 1.5 },
    { id: 'park', name: 'حديقة الملك عبدالعزيز', lat: 26.3260, lon: 43.9750, radius: 2.0 }
];

// حساب المسافة بين نقطتين جغرافيتين (haversine formula)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // راديان الأرض بالكيلومتر
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

// طلب موقع المستخدم وتحليله
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var userLat = position.coords.latitude;
        var userLon = position.coords.longitude;
        
        let statusBadge = document.getElementById("gps-status");
        statusBadge.innerHTML = "تم رصد إحداثياتك بنجاح";
        
        landmarks.forEach(landmark => {
            let distance = getDistanceFromLatLonInKm(userLat, userLon, landmark.lat, landmark.lon);
            if (distance <= landmark.radius) {
                // فتح المعلم إذا كان المستخدم في النطاق
                let card = document.getElementById(landmark.id);
                card.classList.remove("locked");
                card.classList.add("unlocked");
                card.querySelector(".status-text").innerText = "UNLOCKED";
                
                // إظهار السردية
                let storyBox = document.getElementById("story-section");
                let storyText = document.getElementById("story-text");
                storyBox.classList.remove("hidden");
                storyText.innerText = `أهلاً بك في ${landmark.name}. هذه القطعة مسجلة رسمياً ضمن الأرشيف الميداني لبراند [ EZWA ].`;
            }
        });
    }, function(error) {
        document.getElementById("gps-status").innerHTML = "يرجى السماح بالوصول للموقع لتفعيل المرشد.";
    });
} else {
    document.getElementById("gps-status").innerHTML = "متصفحك لا يدعم تحديد الموقع.";
}
