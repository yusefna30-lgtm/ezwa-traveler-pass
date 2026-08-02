let score = 0;

function startGame() {

document.body.innerHTML = `

<h1>🏰 قصر المصمك</h1>

<p>
يُعد قصر المصمك أحد أهم المعالم التاريخية في مدينة الرياض.
</p>

<h2>
في أي عام استرد الملك عبدالعزيز مدينة الرياض؟
</h2>

<button onclick="checkAnswer('1902')">1902</button>

<br><br>

<button onclick="checkAnswer('1895')">1895</button>

<br><br>

<button onclick="checkAnswer('1912')">1912</button>

`;

}

function checkAnswer(answer){

if(answer === "1902"){

score += 10;

document.body.innerHTML = `

<h1>🎉 أحسنت</h1>

<h2>إجابة صحيحة</h2>

<p>حصلت على 10 نقاط</p>

<h3>مجموع نقاطك: ${score}</h3>

<button onclick="nextQuestion()">
السؤال التالي
</button>

`;

}else{

document.body.innerHTML = `

<h1>❌ إجابة خاطئة</h1>

<p>حاول مرة أخرى</p>

<button onclick="startGame()">
إعادة المحاولة
</button>

`;

}

}

function nextQuestion(){

document.body.innerHTML = `

<h1>🚧 قريبًا</h1>

<p>السؤال الثاني قيد الإنشاء.</p>

<h3>النقاط الحالية: ${score}</h3>

`;

}
