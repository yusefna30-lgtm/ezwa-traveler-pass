function startGame(){

document.body.innerHTML = `

<h1>🏰 قصر المصمك</h1>

<p>يعد قصر المصمك من أهم المعالم التاريخية في الرياض.</p>

<h2>في أي عام استرد الملك عبدالعزيز مدينة الرياض؟</h2>

<button onclick="checkAnswer('1902')">1902</button><br><br>

<button onclick="checkAnswer('1895')">1895</button><br><br>

<button onclick="checkAnswer('1912')">1912</button>

`;

}

function checkAnswer(answer){

if(answer==="1902"){
alert("🎉 إجابة صحيحة +10 نقاط");
}else{
alert("❌ إجابة خاطئة");
}

}
