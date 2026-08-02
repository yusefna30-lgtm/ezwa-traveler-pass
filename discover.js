let score = 0;

function startGame() {

document.body.innerHTML = `
<div style="max-width:700px;margin:auto;padding:30px;text-align:center;color:white;font-family:Tahoma;">

<h1 style="color:gold;">🏰 قصر المصمك</h1>

<p>
قصر المصمك هو أحد أشهر المعالم التاريخية في الرياض.
</p>

<img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900"
style="width:100%;max-width:500px;border-radius:15px;">

<h2 style="margin-top:30px;">
في أي عام استرد الملك عبدالعزيز مدينة الرياض؟
</h2>

<button onclick="checkAnswer('1902')">1902</button>

<button onclick="checkAnswer('1898')">1898</button>

<button onclick="checkAnswer('1912')">1912</button>

</div>
`;

}

function checkAnswer(answer){

if(answer==="1902"){

score += 10;

document.body.innerHTML=`
<div style="text-align:center;color:white;padding:50px;font-family:Tahoma;">

<h1 style="color:lime;">🎉 إجابة صحيحة</h1>

<h2>حصلت على 10 نقاط</h2>

<h3>إجمالي النقاط : ${score}</h3>

<button onclick="location.reload()">
إنهاء
</button>

</div>
`;

}else{

alert("❌ إجابة خاطئة، حاول مرة أخرى.");

}

}
