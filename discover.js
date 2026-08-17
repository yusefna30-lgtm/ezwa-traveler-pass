// ===== أرقام Traveler Pass للدفعة الأولى (10 قطع فقط) =====
const validPasses = [];
for (let i = 1; i <= 10; i++) {
  validPasses.push(`EZWA-MSM-${String(i).padStart(4, "0")}`);
}

// ===============================
// EZWA Traveler Pass - الإصدار السحابي المطور
// ===============================

// ===== الأصوات والمتغيرات =====
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let score = 0;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
}

function playSuccess() {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(600, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.2);

  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.25);
}

function playError() {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";
  osc.frequency.value = 180;

  gain.gain.value = 0.2;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
}

function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
}

// ====================================================
// 🚀 دالة بدء التحدي (السؤال الأول)
// ====================================================
function startGame() {
  score = 0;

  document.body.innerHTML = `
    <div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:sans-serif;direction:rtl;">
      <h1 style="color:#d4af37;">🏰 قصر المصمك</h1>
      <p style="color:#ccc;">قصر المصمك أحد أهم المعالم التاريخية في مدينة الرياض.</p>
      <img src="masmak.jpg" style="width:100%;max-width:500px;border-radius:15px;margin:15px 0;border:1px solid #d4af37;">
      <h2>في أي عام استرد الملك عبدالعزيز مدينة الرياض؟</h2>
      <button onclick="checkAnswer('1902')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">1902</button><br><br>
      <button onclick="checkAnswer('1898')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">1898</button><br><br>
      <button onclick="checkAnswer('1912')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">1912</button>
    </div>
  `;
}
window.startGame = startGame;

// ===== الأسئلة والمراحل =====
function checkAnswer(answer) {
  if (answer === "1902") {
    score += 10;
    playSuccess();
    vibrate();

    document.body.innerHTML = `
      <div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:sans-serif;direction:rtl;">
        <h1 style="color:#d4af37;">السؤال الثاني</h1>
        <p style="color:#ccc;">من الذي استرد مدينة الرياض؟</p>
        <button onclick="question2('عبدالعزيز')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">الملك عبدالعزيز</button><br><br>
        <button onclick="question2('سعود')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">الملك سعود</button><br><br>
        <button onclick="question2('فيصل')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">الملك فيصل</button>
      </div>
    `;
  } else {
    playError();
    vibrate();
    alert("❌ إجابة خاطئة");
  }
}

function question2(answer) {
  if (answer === "عبدالعزيز") {
    score += 10;
    playSuccess();
    vibrate();

    document.body.innerHTML = `
      <div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:sans-serif;direction:rtl;">
        <h1 style="color:#d4af37;">السؤال الثالث</h1>
        <p style="color:#ccc;">مم بُني قصر المصمك؟</p>
        <button onclick="question3('طين')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">الطين واللبن</button><br><br>
        <button onclick="question3('رخام')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">الرخام</button><br><br>
        <button onclick="question3('حديد')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">الحديد</button>
      </div>
    `;
  } else {
    playError();
    vibrate();
    alert("❌ إجابة خاطئة");
  }
}

function question3(answer) {
  if (answer === "طين") {
    score += 10;
    playSuccess();
    vibrate();

    document.body.innerHTML = `
      <div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:sans-serif;direction:rtl;">
        <h1 style="color:#d4af37;">السؤال الرابع</h1>
        <p style="color:#ccc;">ما الاستخدام الحالي لقصر المصمك؟</p>
        <button onclick="question4('متحف')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">متحف تاريخي</button><br><br>
        <button onclick="question4('قصر')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">قصر سكني</button><br><br>
        <button onclick="question4('مول')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">مركز تجاري</button>
      </div>
    `;
  } else {
    playError();
    vibrate();
    alert("❌ إجابة خاطئة");
  }
}

function question4(answer) {
  if (answer === "متحف") {
    score += 10;
    playSuccess();
    vibrate();

    document.body.innerHTML = `
      <div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:sans-serif;direction:rtl;">
        <h1 style="color:#d4af37;">السؤال الخامس</h1>
        <p style="color:#ccc;">في أي مدينة يقع قصر المصمك؟</p>
        <button onclick="finishStage('الرياض')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">الرياض</button><br><br>
        <button onclick="finishStage('جدة')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">جدة</button><br><br>
        <button onclick="finishStage('الدمام')" style="padding:12px 24px;margin:8px;font-size:16px;cursor:pointer;background:#222;color:#fff;border:1px solid #d4af37;border-radius:8px;">الدمام</button>
      </div>
    `;
  } else {
    playError();
    vibrate();
    alert("❌ إجابة خاطئة");
  }
}

function finishStage(answer) {
  if (answer === "الرياض") {
    score += 10;
    playSuccess();
    vibrate();

    document.body.innerHTML = `
      <div style="max-width:700px;margin:auto;padding:40px;text-align:center;color:white;font-family:sans-serif;direction:rtl;">
        <h1 style="color:#2ec4b6;">🎉 تهانينا!</h1>
        <h2>لقد أنهيت التحدي لـ</h2>
        <h1 style="color:#d4af37;">اكتشف الرياض</h1>
        <br>
        <p style="font-size:24px;">🏰 حصلت على ختم قصر المصمك ✅</p>
        <br>
        <h2 style="color:#FFD700;">⭐ مجموع نقاطك: ${score} / 50</h2>
        <br>
        <button onclick="completeOwnershipRegistration()" style="background:linear-gradient(135deg, #d4af37, #aa7c11); color:#000; font-weight:900; border:none; padding:15px 25px; font-size:16px; border-radius:8px; cursor:pointer; box-shadow: 0 4px 15px rgba(212,175,55,0.4);">
          🛡️ توثيق الملكية واستخراج بطاقة الـ VIP
        </button>
      </div>
    `;

    setTimeout(() => {
      if (typeof completeOwnershipRegistration === "function") {
        completeOwnershipRegistration();
      }
    }, 1000);
  } else {
    playError();
    vibrate();
    alert("❌ إجابة خاطئة");
  }
}

// ====================================================
// 🛡️ نظام توثيق الملكية السحابي (EZWA Cloud Auth Protocol v4)
// ====================================================
const DB_URL = "https://ezwa-vault-default-rtdb.firebaseio.com/owners";

window.completeOwnershipRegistration = async function() {
  var params = new URLSearchParams(window.location.search);
  var serial = params.get('sn') || 'EZWA-MSM-0001';
  var endpoint = `${DB_URL}/${serial}.json`;

  try {
    var response = await fetch(endpoint);
    var existingRecord = await response.json();

    if (existingRecord && existingRecord.name) {
      renderCertificate(existingRecord);
    } else {
      showNameModal(serial, endpoint);
    }
  } catch (error) {
    console.error("خطأ الاتصال:", error);
    alert("حدث خطأ أثناء الاتصال بقاعدة البيانات، يرجى إعادة المحاولة.");
  }
};

// 🎨 نافذة إدخال الاسم المخصصة للجوال
function showNameModal(serial, endpoint) {
  var modalHtml = 
    '<div id="ezwaModal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; z-index:9999; direction:rtl; font-family:sans-serif; padding:20px; box-sizing:border-box;">' +
      '<div style="background:#181818; border:2px solid #d4af37; padding:25px; border-radius:16px; width:100%; max-width:400px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.8);">' +
        '<div style="font-size:35px; margin-bottom:10px;">🎉</div>' +
        '<h3 style="color:#f3e5ab; margin:0 0 10px 0; font-size:18px;">ألف مبروك الفوز! وثّق ملكية القطعة</h3>' +
        '<p style="color:#ccc; font-size:13px; margin-bottom:15px;">الرقم التسلسلي: <strong style="color:#d4af37;">' + serial + '</strong></p>' +
        '<input type="text" id="ownerInput" placeholder="أدخل اسمك الرسمي هنا..." style="width:100%; padding:12px; border-radius:8px; border:1px solid #d4af37; background:#000; color:#fff; font-size:14px; text-align:center; margin-bottom:15px; box-sizing:border-box; outline:none;">' +
        '<button onclick="submitOwnership(\'' + serial + '\', \'' + endpoint + '\')" style="width:100%; padding:12px; background:#d4af37; border:none; color:#000; font-weight:bold; border-radius:8px; font-size:15px; cursor:pointer;">🛡️ توثيق وقفل القطعة سحابياً</button>' +
      '</div>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// 💾 حفظ التوثيق في السحابة
window.submitOwnership = async function(serial, endpoint) {
  var input = document.getElementById('ownerInput');
  var ownerName = input ? input.value.trim() : "";

  if (!ownerName) {
    alert("يرجى كتابة الاسم لتوثيق الملكية!");
    return;
  }

  var ownerRecord = {
    name: ownerName,
    serial: serial,
    date: new Date().toLocaleDateString('ar-SA')
  };

  var modal = document.getElementById('ezwaModal');
  if (modal) modal.remove();

  await fetch(endpoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ownerRecord)
  });

  renderCertificate(ownerRecord);
};

// 📜 عرض وثيقة الملكية المقفلة + كود الخصم الفوري
function renderCertificate(ownerRecord) {
  var promoCode = "EZWA-VIP15"; // كود الخصم الفوري المخصص لحاملي القطعة

  document.body.innerHTML = 
    '<div style="max-width:500px; margin:40px auto; padding:25px; background:#111; border:2px solid #d4af37; border-radius:15px; text-align:right; color:#fff; font-family:sans-serif; direction:rtl; box-shadow:0 10px 30px rgba(0,0,0,0.8);">' +
      '<div style="background:#d4af37; color:#000; font-weight:900; font-size:11px; padding:4px 10px; border-radius:4px; display:inline-block; margin-bottom:12px;">🛡️ وثيقة ملكية موثقة ومقفلة سحابياً</div>' +
      '<h2 style="color: #f3e5ab; font-size: 20px; margin-bottom: 12px;">بطاقة ملكية قطعة [ المصمك ]</h2>' +
      '<p style="font-size: 14px; color: #ccc; margin-bottom: 8px;"><strong>المالك المسجل:</strong> ' + ownerRecord.name + '</p>' +
      '<p style="font-size: 14px; color: #ccc; margin-bottom: 8px;"><strong>الرقم التسلسلي:</strong> ' + ownerRecord.serial + '</p>' +
      '<p style="font-size: 14px; color: #ccc; margin-bottom: 20px;"><strong>تاريخ التوثيق:</strong> ' + ownerRecord.date + '</p>' +
      
      '<!-- 🎁 خانة كود الخصم الفوري -->' +
      '<div style="background: linear-gradient(135deg, #1f1b0e, #2a220c); border: 1px dashed #d4af37; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;">' +
        '<p style="margin:0 0 6px 0; color:#d4af37; font-size:13px; font-weight:bold;">🎁 مكافأة التوثيق الفورية (خصم 15% للإصدار القادم)</p>' +
        '<div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-top:8px;">' +
          '<span id="discountCode" style="background:#000; color:#fff; border:1px solid #d4af37; padding:8px 16px; border-radius:6px; font-family:monospace; font-size:16px; font-weight:bold; letter-spacing:1px;">' + promoCode + '</span>' +
          '<button onclick="copyCode(\'' + promoCode + '\')" style="background:#d4af37; color:#000; border:none; padding:8px 14px; border-radius:6px; font-weight:bold; font-size:13px; cursor:pointer;">📋 نسخ</button>' +
        '</div>' +
      '</div>' +

      '<div style="background: #d4af37; color: #000; padding: 14px; font-weight: 900; text-align: center; border-radius: 8px; font-size: 15px;">🎟️ تذكرة VIP الفعالة لحامل القطعة</div>' +
      '<button onclick="location.reload()" style="margin-top:15px; width:100%; padding:10px; background:transparent; border:1px solid #d4af37; color:#d4af37; border-radius:6px; cursor:pointer;">🔄 إعادة تحديث الصفحة</button>' +
    '</div>';
}

// 📋 دالة نسخ كود الخصم
window.copyCode = function(code) {
  navigator.clipboard.writeText(code).then(function() {
    alert("✅ تم نسخ كود الخصم: " + code);
  }).catch(function() {
    alert("كود الخصم هو: " + code);
  });
};
