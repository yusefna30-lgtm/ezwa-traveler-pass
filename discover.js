// ===== أرقام Traveler Pass =====

const validPasses = [];

for (let i = 1; i <= 100; i++) {

    validPasses.push(
        `EZWA-MSM-${String(i).padStart(4,"0")}`
    );

}
// ===============================
// EZWA Traveler Pass
// الإصدار الأول
// ===============================

// ===== الأصوات =====
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

function startGame() {

document.body.innerHTML = `

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">🏰 قصر المصمك</h1>

<p>قصر المصمك أحد أهم المعالم التاريخية في مدينة الرياض.</p>

<img src="masmak.jpg"
style="width:100%;max-width:500px;border-radius:15px;">

<h2>في أي عام استرد الملك عبدالعزيز مدينة الرياض؟</h2>

<button onclick="checkAnswer('1902')">1902</button>

<br><br>

<button onclick="checkAnswer('1898')">1898</button>

<br><br>

<button onclick="checkAnswer('1912')">1912</button>

</div>

`;

}
function checkAnswer(answer){

if(answer==="1902"){

score +=10;
playSuccess();
vibrate();

document.body.innerHTML=`

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">السؤال الثاني</h1>

<p>من الذي استرد مدينة الرياض؟</p>

<button onclick="question2('عبدالعزيز')">
الملك عبدالعزيز
</button>

<br><br>

<button onclick="question2('سعود')">
الملك سعود
</button>

<br><br>

<button onclick="question2('فيصل')">
الملك فيصل
</button>

</div>

`;

}else{

playError();
vibrate();
alert("❌ إجابة خاطئة");

}

}

function question2(answer){

if(answer==="عبدالعزيز"){

score +=10;
playSuccess();
vibrate();

document.body.innerHTML=`

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">السؤال الثالث</h1>

<p>مم بُني قصر المصمك؟</p>

<button onclick="question3('طين')">
الطين واللبن
</button>

<br><br>

<button onclick="question3('رخام')">
الرخام
</button>

<br><br>

<button onclick="question3('حديد')">
الحديد
</button>

</div>

`;

}else{

playError();
vibrate();
alert("❌ إجابة خاطئة");

}

}
function question3(answer){

if(answer==="طين"){

score +=10;
playSuccess();
vibrate();

document.body.innerHTML=`

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">السؤال الرابع</h1>

<p>ما الاستخدام الحالي لقصر المصمك؟</p>

<button onclick="question4('متحف')">
متحف تاريخي
</button>

<br><br>

<button onclick="question4('قصر')">
قصر سكني
</button>

<br><br>

<button onclick="question4('مول')">
مركز تجاري
</button>

</div>

`;

}else{

playError();
vibrate();
alert("❌ إجابة خاطئة");

}

}

function question4(answer){

if(answer==="متحف"){

score +=10;
playSuccess();
vibrate();

document.body.innerHTML=`

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">السؤال الخامس</h1>

<p>في أي مدينة يقع قصر المصمك؟</p>

<button onclick="finishStage('الرياض')">
الرياض
</button>

<br><br>

<button onclick="finishStage('جدة')">
جدة
</button>

<br><br>

<button onclick="finishStage('الدمام')">
الدمام
</button>

</div>

`;

}else{

playError();
vibrate();
alert("❌ إجابة خاطئة");

}

}
function finishStage(answer){

if(answer==="الرياض"){

score +=10;
playSuccess();
vibrate();

document.body.innerHTML = `

<div style="max-width:700px;margin:auto;padding:40px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:lime;">🎉 تهانينا!</h1>

<h2>لقد أنهيت النسخة الأولى من</h2>

<h1 style="color:gold;">اكتشف الرياض</h1>

<br>

<p style="font-size:24px;">
🏰 حصلت على ختم قصر المصمك ✅
</p>

<br>

<h2 style="color:#FFD700;">
⭐ مجموع نقاطك: ${score} / 50
</h2>

<br>

<p style="font-size:22px;color:gold;">
🚧 الإصدار الثاني قادم قريبًا...
</p>

<p style="color:#ccc;">
شكرًا لمشاركتك في أول رحلة من EZWA Traveler Pass
</p>

<br>

<button onclick="location.reload()">
🔄 إعادة الرحلة
</button>

</div>

`;

}else{

playError();
vibrate();
alert("❌ إجابة خاطئة");

}

}

// ====================================================
// 🛡️ نظام توثيق وقفل الملكية المدمج مع validPasses
// ====================================================

// 1. استخراج الرقم التسلسلي القادم من رابط الـ NFC (مثال: ?sn=EZWA-MSM-0001)
const urlParams = new URLSearchParams(window.location.search);
const currentSN = urlParams.get('sn');

// 2. فحص حالة التوثيق فور تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
  // استخدام الرقم التسلسلي القادم من الرابط أو اختيار أول رقم تسلسلي كافتراضي
  const activeSerial = currentSN || validPasses[0]; 

  // التأكد من أن الرقم التسلسلي ينتمي للمصفوفة المعتمدة
  if (!validPasses.includes(activeSerial)) {
    console.warn('⚠️ هذا الرقم التسلسلي غير مسجل في أرشيف EZWA.');
    return;
  }

  // قراءة بيانات التوثيق الخاصة بهذا الرقم تحديداً من ذاكرة النظام
  const registeredData = localStorage.getItem(`ezwa_owner_${activeSerial}`);

  if (registeredData) {
    // 🛡️ إذا كانت القطعة موثقة ومسجلة مقدماً باسم المالك: تفتح البطاقة مباشرة
    renderLockedPass(JSON.parse(registeredData));
  } else {
    // 🎮 إذا كانت المرة الأولى: تتيح خوض التحدي لبدء التوثيق
    console.log(`🚀 تفعيل جديد للقطعة الرقمية: ${activeSerial}`);
  }
});

// 🏆 دالة تُستدعى فور الفوز بالمرحلة الخامسة لتسجيل اسم المالك
function completeOwnershipRegistration() {
  const activeSerial = currentSN || validPasses[0];
  
  if (!validPasses.includes(activeSerial)) return;

  const ownerName = prompt("🎉 ألف مبروك الفوز وإتمام البروتوكول!\nأدخل اسم المالك الرسمي لتوثيق هذه القطعة باسمك حصرياً:") || "بطل الأرشيف الملكي";

  const ownerRecord = {
    name: ownerName,
    serial: activeSerial,
    date: new Date().toLocaleDateString('ar-SA'),
    timestamp: Date.now()
  };

  // 🔒 قفل الملكية لهذا الرقم التسلسلي تحديداً
  localStorage.setItem(`ezwa_owner_${activeSerial}`, JSON.stringify(ownerRecord));
  
  // عرض بطاقة الملكية الموثقة
  renderLockedPass(ownerRecord);
}

// 💳 عرض وثيقة الملكية الموثقة والمقفلة
function renderLockedPass(ownerData) {
  const tracker = document.querySelector('.tracker');
  if (tracker) tracker.style.display = 'none';

  const stageWrapper = document.querySelector('.stage-wrapper');
  if (stageWrapper) {
    stageWrapper.innerHTML = `
      <div class="vip-card-3d" style="width:100%; text-align:right;">
        <div style="background:var(--gold-main); color:#000; font-weight:900; font-size:11px; padding:4px 10px; border-radius:4px; display:inline-block; margin-bottom:12px;">
          🛡️ وثيقة ملكية موثقة ومقفلة
        </div>
        <h2 style="color: var(--gold-light); font-size: 18px; margin-bottom: 10px;">بطاقة ملكية قطعة [ المصمك ]</h2>
        <p style="font-size: 13px; color: #bbb; margin-bottom: 6px;"><strong>المالك المسجل:</strong> ${ownerData.name}</p>
        <p style="font-size: 13px; color: #bbb; margin-bottom: 6px;"><strong>الرقم التسلسلي:</strong> ${ownerData.serial}</p>
        <p style="font-size: 13px; color: #bbb; margin-bottom: 18px;"><strong>تاريخ التوثيق:</strong> ${ownerData.date}</p>

        <div style="background: var(--gold-main); color: #000; padding: 12px; font-weight: 900; text-align: center; border-radius: 8px; margin-bottom: 15px;">
          🎟️ تذكرة VIP الفعالة لحامل القطعة
        </div>

        <button class="btn-action-gold" style="width:100%; font-size:13px; padding:12px;" onclick="location.reload()">
          🎮 استعراض التحدي وإعادته
        </button>
      </div>
    `;
  }
}
