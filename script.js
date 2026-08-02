const NARRATIVES = {
    'masmak': {
        name: 'قصر المصمك',
        q1: { text: 'في أي عام هجري تم تأسيس وتوحيد الدولة على أثر ملحمة المصمك؟', options: ['1310هـ', '1319هـ', '1325هـ'], correct: 1 },
        q2: { text: 'ماذا يرمز رأس الحربة المكسورة في باب المصمك الشهير؟', options: ['معركة توحيد الرياض', 'رمز السلام الملكي', 'بوابة قصر الإمارة القديم'], correct: 0 }
    },
    'murabba': {
        name: 'قصر المربع',
        q1: { text: 'أين يقع قصر المربع التاريخي؟', options: ['مدينة جدة التاريخية', 'مدينة الرياض الحديثة والقديمة', 'مدينة الطائف'], correct: 1 },
        q2: { text: 'ما هو الطراز المعماري السائد في بناء قصر المربع؟', options: ['الطراز النجدي الطيني التقليدي', 'الطراز الروماني الحجري', 'الطراز الأندلسي'], correct: 0 }
    },
    'diriyah': {
        name: 'حي الطريف بالدرعية',
        q1: { text: 'ما هي مكانة حي الطريف التاريخية؟', options: ['عاصمة الدولة السعودية الأولى', 'حصن عسكري مؤقت', 'سوق تجاري موسمي'], correct: 0 },
        q2: { text: 'بماذا يشتهر بناء قصور حي الطريف المعمارية؟', options: ['اللبن الطيني والزخارف النجدية', 'الأعمدة الرخامية الضخمة', 'الأسقف الزجاجية الحديثة'], correct: 0 }
    },
    'hegra': {
        name: 'مدائن صالح (الحِجر)',
        q1: { text: 'مدائن صالح هي أول موقع سعودي مسجل في أي قائمة عالمية؟', options: ['قائمة اليونسكو للتراث العالمي', 'قائمة عجائب الدنيا السبع', 'قائمة الآثار الرومانية'], correct: 0 },
        q2: { text: 'من هي الحضارة التاريخية التي حفرت واجهات الحِجر الصخرية؟', options: ['الحضارة النبطية', 'الحضارة البابلية', 'الحضارة الفينيقية'], correct: 0 }
    },
    'oldtown': {
        name: 'بلدة العلا العتيقة',
        q1: { text: 'ما هو الدور التاريخي البارز لبلدة العلا العتيقة؟', options: ['ملتقى القوافل وممر التجار التاريخي', 'ميناء تجاري بحري', 'معسكر للدفاع الحدودي'], correct: 0 },
        q2: { text: 'كيف تم تصميم بيوت العلا العتيقة لتوفر حماية جماعية؟', options: ['لتشكل سوراً دفاعياً متراصاً متكاملاً', 'بشكل متباعد ومنعزل', 'على شكل أبراج دائرية مستقلة'], correct: 0 }
    }
};

let gameState = {
    currentSite: null,
    stage: 1, // 1 to 5
    grandVaultPoints: 0
};

function startVault(siteKey) {
    gameState.currentSite = siteKey;
    gameState.stage = 1;
    gameState.grandVaultPoints = 0;
    document.getElementById('site-selector').style.display = 'none';
    document.getElementById('game-stage-view').style.display = 'block';
    loadStage();
}

function updateProgress() {
    const percent = ((gameState.stage - 1) / 5) * 100;
    document.getElementById('progress-fill').style.width = percent + '%';
    let rank = 'رحالة جديد';
    if(gameState.stage >= 3) rank = 'مستكشف الأرشيف';
    if(gameState.stage >= 5) rank = 'فارس الأرشيف الملكي';
    document.getElementById('rank-title').innerText = `الموقع: ${NARRATIVES[gameState.currentSite].name} | المرحلة: ${gameState.stage}/5 (${rank})`;
}

function loadStage() {
    updateProgress();
    const container = document.getElementById('stage-content');
    const siteData = NARRATIVES[gameState.currentSite];

    if (gameState.stage === 1 || gameState.stage === 2) {
        const qKey = gameState.stage === 1 ? 'q1' : 'q2';
        const q = siteData[qKey];
        let html = `<h3>📖 المرحلة ${gameState.stage}: السؤال الأرشيفي</h3>
                    <p style="margin: 15px 0; line-height: 1.6;">${q.text}</p><div class="options-grid">`;
        q.options.forEach((opt, idx) => {
            html += `<button class="opt-btn" onclick="checkAnswer(${idx}, ${q.correct})">${opt}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    } 
    else if (gameState.stage === 3) {
        container.innerHTML = `
            <h3>🕸️ المرحلة 3: توصيل الشبكة الهندسية</h3>
            <p style="margin: 15px 0;">اضغط على الزر أدناه لربط نقاط المخطط المعماري للمعلم وتفعيل القفل.</p>
            <button class="btn-gold" style="margin-top:10px; width:100%;" onclick="completeStage()">ربط الشبكة الهندسية بنجاح ⚡</button>
        `;
    } 
    else if (gameState.stage === 4) {
        container.innerHTML = `
            <h3>🔓 المرحلة 4: عجلة قفل الخزنة الميكانيكي</h3>
            <p style="margin: 15px 0;">قم بفك شفرة القفل الميكانيكي الرابع للوصول للختام.</p>
            <button class="btn-gold" style="margin-top:10px; width:100%;" onclick="completeStage()">فتح القفل الميكانيكي ⚙️</button>
        `;
    } 
    else if (gameState.stage === 5) {
        container.innerHTML = `
            <h3>⚡ المرحلة 5: الختام الملكي (التفعيل المزدوج)</h3>
            <p style="margin: 15px 0;">اضغط باستمرار بالإبهامين معاً لتجميع الطاقة واختراق الخزنة الكبرى!</p>
            <div class="dual-buttons">
                <button class="thumb-btn" id="btn-left" ontouchstart="startHold()" onmousedown="startHold()">الإبهام الأيسر</button>
                <button class="thumb-btn" id="btn-right" ontouchstart="startHold()" onmousedown="startHold()">الإبهام الأيمن</button>
            </div>
            <p id="hold-status" style="text-align:center; margin-top:20px; color:var(--gold); font-size:14px;">اضغط الزرين وثبتهما لـ 3 ثوانٍ...</p>
        `;
    }
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        completeStage();
    } else {
        alert('إجابة غير دقيقة، حاول مرة أخرى.');
    }
}

function completeStage() {
    document.getElementById('reward-modal').style.display = 'flex';
}

function claimInstantReward() {
    document.getElementById('reward-modal').style.display = 'none';
    document.getElementById('scratch-modal').style.display = 'flex';
}

function closeScratchModal() {
    document.getElementById('scratch-modal').style.display = 'none';
    proceedNextStage();
}

function saveToGrandVault() {
    gameState.grandVaultPoints++;
    document.getElementById('reward-modal').style.display = 'none';
    proceedNextStage();
}

function proceedNextStage() {
    gameState.stage++;
    if (gameState.stage > 5) {
        document.getElementById('game-stage-view').style.display = 'none';
        document.getElementById('victory-modal').style.display = 'flex';
    } else {
        loadStage();
    }
}

let holdTimer = null;
function startHold() {
    const status = document.getElementById('hold-status');
    status.innerText = "جاري تفعيل الطاقة الملكية... استمر بالضغط!";
    if(holdTimer) clearTimeout(holdTimer);
    holdTimer = setTimeout(() => {
        status.innerText = "تم اختراق الخزنة بنجاح! 🎉";
        setTimeout(() => {
            document.getElementById('game-stage-view').style.display = 'none';
            document.getElementById('victory-modal').style.display = 'flex';
        }, 1000);
    }, 3000);
}

function resetGame() {
    document.getElementById('victory-modal').style.display = 'none';
    document.getElementById('site-selector').style.display = 'block';
}
