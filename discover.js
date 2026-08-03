let score = 0;

function startGame() {

document.body.innerHTML = `

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">🏰 قصر المصمك</h1>

<p>قصر المصمك أحد أهم المعالم التاريخية في الرياض.</p>

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

document.body.innerHTML=`

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">السؤال الثاني</h1>

<p>من الذي استرد مدينة الرياض؟</p>

<button onclick="question2('عبدالعزيز')">الملك عبدالعزيز</button>

<br><br>

<button onclick="question2('سعود')">الملك سعود</button>

<br><br>

<button onclick="question2('فيصل')">الملك فيصل</button>

</div>

`;

}else{

alert("إجابة خاطئة");

}

}

function question2(answer){

if(answer==="عبدالعزيز"){

score+=10;

document.body.innerHTML=`

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">السؤال الثالث</h1>

<p>مم بُني قصر المصمك؟</p>

<button onclick="question3('طين')">الطين واللبن</button>

<br><br>

<button onclick="question3('رخام')">الرخام</button>

<br><br>

<button onclick="question3('حديد')">الحديد</button>

</div>

`;

}else{

alert("إجابة خاطئة");

}

}
function question3(answer){

if(answer==="طين"){

score+=10;

document.body.innerHTML=`

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">السؤال الرابع</h1>

<p>ما الاستخدام الحالي لقصر المصمك؟</p>

<button onclick="question4('متحف')">متحف تاريخي</button>

<br><br>

<button onclick="question4('قصر')">قصر سكني</button>

<br><br>

<button onclick="question4('مول')">مركز تجاري</button>

</div>

`;

}else{

alert("❌ إجابة خاطئة");

}

}

function question4(answer){

if(answer==="متحف"){

score+=10;

document.body.innerHTML=`

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">السؤال الخامس</h1>

<p>في أي مدينة يقع قصر المصمك؟</p>

<button onclick="finishStage('الرياض')">الرياض</button>

<br><br>

<button onclick="finishStage('جدة')">جدة</button>

<br><br>

<button onclick="finishStage('الدمام')">الدمام</button>

</div>

`;

}else{

alert("❌ إجابة خاطئة");

}

}

function finishStage(answer){

if(answer==="الرياض"){

score+=10;

document.body.innerHTML=`

<div style="max-width:700px;margin:auto;padding:40px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:lime;">🏆 أحسنت!</h1>

<h2>أنهيت مرحلة قصر المصمك</h2>

<h3>مجموع نقاطك: ${score}</h3>

<p>🏰 حصلت على ختم قصر المصمك</p>

<button onclick="nextStage()">
الانتقال إلى دارة الملك عبدالعزيز ➜
</button>

</div>

`;

}else{

alert("❌ إجابة خاطئة");

}

}
function nextStage(){

document.body.innerHTML = `

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">📜 دارة الملك عبدالعزيز</h1>

<p>
دارة الملك عبدالعزيز مؤسسة متخصصة في حفظ تاريخ المملكة ووثائقه.
</p>

<img src="darah.jpg"
style="width:100%;max-width:500px;border-radius:15px;">

<h2>
ما الهدف الرئيسي من دارة الملك عبدالعزيز؟
</h2>

<button onclick="darah1('صح')">
حفظ تاريخ المملكة ووثائقه
</button>

<br><br>

<button onclick="darah1('خطأ')">
تنظيم البطولات الرياضية
</button>

<br><br>

<button onclick="darah1('خطأ')">
إدارة المطارات
</button>

</div>

`;

}
function darah1(answer){

if(answer==="صح"){

score +=10;

document.body.innerHTML = `

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">📜 السؤال الثاني</h1>

<p>من الشخصية التي تحمل الدارة اسمها؟</p>

<button onclick="darah2('صح')">
الملك عبدالعزيز بن عبدالرحمن آل سعود
</button>

<br><br>

<button onclick="darah2('خطأ')">
الملك سعود
</button>

<br><br>

<button onclick="darah2('خطأ')">
الملك فيصل
</button>

</div>

`;

}else{

alert("❌ إجابة خاطئة");

}

}

function darah2(answer){

if(answer==="صح"){

score +=10;

document.body.innerHTML = `

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">📜 السؤال الثالث</h1>

<p>ماذا تضم دارة الملك عبدالعزيز؟</p>

<button onclick="darah3('صح')">
وثائق ومخطوطات وصور تاريخية
</button>

<br><br>

<button onclick="darah3('خطأ')">
ملاعب رياضية
</button>

<br><br>

<button onclick="darah3('خطأ')">
مدينة ألعاب
</button>

</div>

`;

}else{

alert("❌ إجابة خاطئة");

}

}

function darah3(answer){

if(answer==="صح"){

score +=10;

document.body.innerHTML = `

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">📜 السؤال الرابع</h1>

<p>في أي مدينة تقع دارة الملك عبدالعزيز؟</p>

<button onclick="darah4('صح')">
الرياض
</button>

<br><br>

<button onclick="darah4('خطأ')">
جدة
</button>

<br><br>

<button onclick="darah4('خطأ')">
الدمام
</button>

</div>

`;

}else{

alert("❌ إجابة خاطئة");

}

}

function darah4(answer){

if(answer==="صح"){

score +=10;

document.body.innerHTML = `

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">📜 السؤال الخامس</h1>

<p>ما الذي يستفيد منه الباحثون في الدارة؟</p>

<button onclick="finishDarah('صح')">
الأرشيف والوثائق التاريخية
</button>

<br><br>

<button onclick="finishDarah('خطأ')">
الألعاب الإلكترونية
</button>

<br><br>

<button onclick="finishDarah('خطأ')">
المطاعم
</button>

</div>

`;

}else{

alert("❌ إجابة خاطئة");

}

}

function finishDarah(answer){

if(answer==="صح"){

score +=10;

document.body.innerHTML = `

<div style="text-align:center;color:white;padding:40px;font-family:Tahoma;">

<h1 style="color:lime;">🎉 أحسنت</h1>

<h2>أنهيت مرحلة دارة الملك عبدالعزيز</h2>

<h3>مجموع نقاطك: ${score}</h3>

<p>📜 حصلت على ختم دارة الملك عبدالعزيز</p>

<button onclick="alert('المتحف الوطني قريبًا')">
الانتقال إلى المتحف الوطني ➜
</button>

</div>

`;

}else{

alert("❌ إجابة خاطئة");

}

}
