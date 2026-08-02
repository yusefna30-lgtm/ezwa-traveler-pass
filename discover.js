function checkAnswer(answer){

if(answer==="1902"){

score += 10;

document.body.innerHTML = `

<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">السؤال الثاني</h1>

<p>من الذي استرد مدينة الرياض؟</p>

<button onclick="question2('عبدالعزيز')">الملك عبدالعزيز بن عبدالرحمن</button>

<br><br>

<button onclick="question2('سعود')">الملك سعود</button>

<br><br>

<button onclick="question2('فيصل')">الملك فيصل</button>

</div>

`;

}else{

alert("❌ إجابة خاطئة");

}

}

function question2(answer){

if(answer==="عبدالعزيز"){

score +=10;

document.body.innerHTML = `

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

alert("❌ إجابة خاطئة");

}

}

function question3(answer){

if(answer==="طين"){

score +=10;

document.body.innerHTML = `

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

score +=10;

document.body.innerHTML = `

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

score +=10;

document.body.innerHTML = `

<div style="text-align:center;color:white;padding:40px;font-family:Tahoma;">

<h1 style="color:lime;">🏆 أكملت مرحلة قصر المصمك</h1>

<h2>مجموع نقاطك: ${score}</h2>

<p>🏰 حصلت على ختم قصر المصمك</p>

<button onclick="nextStage()">الانتقال إلى الدرعية ➜</button>

</div>

`;

}else{

alert("❌ إجابة خاطئة");

}

}
