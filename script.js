// إحداثيات المعالم التاريخية (الرياض والعلا) مع نطاق السماح بالكيلومتر
const landmarks = [
    { id: 'murabba', name: 'قصر المربع التاريخي', lat: 24.6433, lon: 46.7111, radius: 2.0 },
    { id: 'masmak', name: 'قصر المصمك', lat: 24.6318, lon: 46.7126, radius: 1.5 },
    { id: 'diriyah', name: 'حي الطريف التاريخي بالدرعية', lat: 24.7350, lon: 46.5744, radius: 2.0 },
    { id: 'hegra', name: 'موقع الحِجر التاريخي بالعلا [ 26.7886° N, 37.9515° E ]', lat: 26.7886, lon: 37.9515, radius: 5.0 },
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

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var userLat = position.coords.latitude;
        var userLon = position.coords.longitude;
        
        let statusBadge = document.getElementById("gps-status");
        statusBadge.innerHTML = "تم رصد إحداثياتك بنجاح";
        
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
                storyText.innerText = `أهلاً بك في ${landmark.name}. موثق رسمياً في الأرشيف الميداني لبراند [ EZWA ].`;
            }
        });
    }, function(error) {
        document.getElementById("gps-status").innerHTML = "يرجى السماح بالوصول للموقع لتفعيل المرشد.";
    });
} else {
    document.getElementById("gps-status").innerHTML = "متصفحك لا يدعم تحديد الموقع.";
}
