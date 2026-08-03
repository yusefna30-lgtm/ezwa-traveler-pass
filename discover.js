// ===== أرقام Traveler Pass =====
const validPasses = [];
for (let i = 1; i <= 100; i++) {
  validPasses.push(`EZWA-MSM-${String(i).padStart(4, "0")}`);
}

// ===============================
// EZWA Traveler Pass - الإصدار السحابي
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
    <div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;direction:rtl;">
      <h1 style="color:gold;">🏰 قصر المصمك</h1>
      <p>قصر المصمك أحد أهم المعالم التاريخية في مدينة الرياض.</p>
      <img src="masmak.jpg" style="width:100%;max-width:500px;border-radius:15px;margin:15px 0;">
      <h2>في أي عام استرد الملك عبدالعزيز مدينة الرياض؟</h2>
      <button onclick="checkAnswer('1902')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">1902</button><br><br>
      <button onclick="checkAnswer('1898')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">1898</button><br><br>
      <button onclick="checkAnswer('1912')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">1912</button>
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
      <div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;direction:rtl;">
        <h1 style="color:gold;">السؤال الثاني</h1>
        <p>من الذي استرد مدينة الرياض؟</p>
        <button onclick="question2('عبدالعزيز')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">الملك عبدالعزيز</button><br><br>
        <button onclick="question2('سعود')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">الملك سعود</button><br><br>
        <button onclick="question2('فيصل')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">الملك فيصل</button>
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
      <div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;direction:rtl;">
        <h1 style="color:gold;">السؤال الثالث</h1>
        <p>مم بُني قصر المصمك؟</p>
        <button onclick="question3('طين')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">الطين واللبن</button><br><br>
        <button onclick="question3('رخام')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">الرخام</button><br><br>
        <button onclick="question3('حديد')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">الحديد</button>
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
      <div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;direction:rtl;">
        <h1 style="color:gold;">السؤال الرابع</h1>
        <p>ما الاستخدام الحالي لقصر المصمك؟</p>
        <button onclick="question4('متحف')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">متحف تاريخي</button><br><br>
        <button onclick="question4('قصر')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">قصر سكني</button><br><br>
        <button onclick="question4('مول')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">مركز تجاري</button>
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
      <div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;direction:rtl;">
        <h1 style="color:gold;">السؤال الخامس</h1>
        <p>في أي مدينة يقع قصر المصمك؟</p>
        <button onclick="finishStage('الرياض')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">الرياض</button><br><br>
        <button onclick="finishStage('جدة')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">جدة</button><br><br>
        <button onclick="finishStage('الدمام')" style="padding:10px 20px;margin:8px;font-size:16px;cursor:pointer;">الدمام</button>
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
      <div style="max-width:700px;margin:auto;padding:40px;text-align:center;color:white;font-family:Tahoma;direction:rtl;">
        <h1 style="color:lime;">🎉 تهانينا!</h1>
        <h2>لقد أنهيت النسخة الأولى من</h2>
        <h1 style="color:gold;">اكتشف الرياض</h1>
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
// 🛡️ نظام توثيق الملكية السحابي (EZWA Cloud Auth Protocol)
// ====================================================
const DB_URL = "https://ezwa-vault-default-rtdb.firebaseio.com/owners";

window.completeOwnershipRegistration = async function() {
  var params = new URLSearchParams(window.location.search);
  var serial = params.get('sn') || 'EZWA-MSM-0001';
  var endpoint = `${DB_URL}/${serial}.json`;

  try {
    // 1. الفحص من السحابة أولاً
    var response = await fetch(endpoint);
    var existingRecord = await response.json();

    var ownerRecord;

    if (existingRecord && existingRecord.name) {
      // القطعة موثقة سابقاً للمالك الأول
      ownerRecord = existingRecord;
    } else {
      // أول عملية توثيق لهذه القطعة
      var ownerName = prompt("🎉 ألف مبروك الفوز!\nأدخل اسم المالك الرسمي لتوثيق هذه القطعة:") || "بطل الأرشيف الملكي";
      ownerRecord = {
        name: ownerName,
        serial: serial,
        date: new Date().toLocaleDateString('ar-SA')
      };

      // حفظ التوثيق في السحابة فوراً
      await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ownerRecord)
      });
    }

    // حفظ نسخة محلية أيضاً
    localStorage.setItem('ezwa_owner_' + serial, JSON.stringify(ownerRecord));

    // عرض بطاقة الملكية السحابية المقفلة
    document.body.innerHTML = `
      <div style="max-width:500px; margin:40px auto; padding:25px; background:#111; border:2px solid #d4af37; border-radius:15px; text-align:right; color:#fff; font-family:sans-serif; direction:rtl; box-shadow:0 10px 30px rgba(0,0,0,0.8);">
        <div style="background:#d4af37; color:#000; font-weight:900; font-size:11px; padding:4px 10px; border-radius:4px; display:inline-block; margin-bottom:12px;">🛡️ وثيقة ملكية موثقة ومقفلة سحابياً</div>
        <h2 style="color: #f3e5ab; font-size: 20px; margin-bottom: 12px;">بطاقة ملكية قطعة [ المصمك ]</h2>
        <p style="font-size: 14px; color: #ccc; margin-bottom: 8px;"><strong>المالك المسجل:</strong> ${ownerRecord.name}</p>
        <p style="font-size: 14px; color: #ccc; margin-bottom: 8px;"><strong>الرقم التسلسلي:</strong> ${ownerRecord.serial}</p>
        <p style="font-size: 14px; color: #ccc; margin-bottom: 20px;"><strong>تاريخ التوثيق:</strong> ${ownerRecord.date}</p>
        <div style="background: #d4af37; color: #000; padding: 14px; font-weight: 900; text-align: center; border-radius: 8px; font-size: 15px;">🎟️ تذكرة VIP الفعالة لحامل القطعة</div>
        <button onclick="startGame()" style="margin-top:15px; width:100%; padding:10px; background:transparent; border:1px solid #d4af37; color:#d4af37; border-radius:6px; cursor:pointer;">🔄 إعادة فتح التحدي</button>
      </div>
    `;

  } catch (error) {
    console.error("خطأ في الاتصال بقاعدة البيانات:", error);
    alert("حدث خطأ أثناء الاتصال بالخادم، يرجى المحاولة مرة أخرى.");
  }
};
