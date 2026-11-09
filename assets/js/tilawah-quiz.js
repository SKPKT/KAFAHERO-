/* KAFAHERO Tilawah Tahun 3, 60 independent objective questions, no external backend. */
(()=>{
'use strict';
const KH=window.KAFAHERO;
const source=document.getElementById('quiz-data');
if(!KH||!source)return;
const DB=JSON.parse(source.textContent);
const profile=KH.getProfile();
const key='kafahero:answers:v2:'+profile.id+':tilawah-al-quran';
const digits=s=>String(s).replace(/[0-9]/g,n=>'٠١٢٣٤٥٦٧٨٩'[Number(n)]);
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state={responses:{},checked:{}};
try{const s=JSON.parse(localStorage.getItem(key)||'null');if(s&&typeof s==='object')state={responses:s.responses||{},checked:s.checked||{}}}catch(e){}
let active='tilawah',level='semua';
const $=s=>document.getElementById(s);
const byTopic=id=>DB.questions.filter(q=>q.topic===id);
const topicStat=id=>{
 const list=byTopic(id), checked=list.filter(q=>!!state.checked[q.id]);
 return {score:checked.filter(q=>state.responses[q.id]===q.correct).length,checked:checked.length,total:list.length};
};
function stats(){
 const parts={};let checked=0,score=0;
 for(const t of DB.topics){const a=topicStat(t.id);parts[t.id]={score:a.score,checked:a.checked,total:a.total};checked+=a.checked;score+=a.score;}
 $('score').textContent=`${score} / 60`;
 $('checked').textContent=`${digits(checked)} / ٦٠ سوءالن دسمق`;
 $('meter').style.width=`${checked/60*100}%`;
 $('progressbar').setAttribute('aria-valuenow',String(checked));
 $('student').textContent=profile.name+(profile.kelas?' • '+profile.kelas:'');
 try{localStorage.setItem(key,JSON.stringify(state))}catch(e){}
 KH.report('tilawah-al-quran',{score,objective:score,manual:0,checked,totalQuestions:60,sections:parts});
}
function renderTopics(){
 $('topics').innerHTML=DB.topics.map(t=>{
  let s=topicStat(t.id), pct=Math.round(s.checked/s.total*100);
  return `<button type="button" class="topic-tab ${t.id===active?'active':''}" data-topic="${t.id}" aria-pressed="${t.id===active}"><span class="topic-top"><b>${esc(t.icon)} ${esc(t.title)}</b><span class="topic-score" dir="ltr">${s.score} / ${s.total}</span></span><span class="topic-desc">${esc(t.description)}</span><span class="topic-count">${digits(s.checked)} / ${digits(s.total)} سوءالن دسمق</span><span class="topic-meter"><i style="width:${pct}%"></i></span></button>`;
 }).join('');
}
function renderQuestions(){
 const selected=byTopic(active).filter(q=>level==='semua'||q.level===level);
 const label={mudah:'موده',sederhana:'سدرهان',mencabar:'منچابر'};
 $('section-heading').textContent=DB.topics.find(t=>t.id===active).title;
 $('question-count').textContent=`${digits(selected.length)} سوءالن • ١ مرکه باݢي ستياڤ سوءالن`;
 $('questions').innerHTML=selected.map(q=>{
  const submitted=!!state.checked[q.id],right=submitted&&state.responses[q.id]===q.correct;
  const opt=q.options.map((s,i)=>`<label class="answer-option ${submitted&&i===q.correct?'correct':''} ${submitted&&i===state.responses[q.id]&&i!==q.correct?'incorrect':''}"><input type="radio" name="q-${q.id}" data-answer="${q.id}" value="${i}" ${state.responses[q.id]===i?'checked':''} ${submitted?'disabled':''}><span class="answer-letter">${['ا','ب','ج','د'][i]}</span><span>${esc(s)}</span></label>`).join('');
  const feedback=submitted?`<div class="feedback ${right?'good':'bad'}" role="status"><strong>${right?'✓ بتول!':'✕ بلوم بتول.'}</strong> ${esc(q.explain)}${right?'':`<p>جواڤن بتول: <strong>${esc(['ا','ب','ج','د'][q.correct])} — ${esc(q.options[q.correct])}</strong></p>`}</div>`:'';
  return `<article class="qcard ${submitted?'done':''}" id="item-${q.id}"><div class="qhead"><span class="number">${digits(q.id.slice(1))} / ٦٠</span><span class="points">${label[q.level]} • ١ مرکه</span></div><p class="qtext">${esc(q.q)}</p><div class="choices">${opt}</div><div class="actions"><button class="btn primary" type="button" data-check="${q.id}" ${submitted?'disabled':''}>${submitted?'✓ تله دسمق':'✅ سمق جواڤن'}</button></div>${feedback}</article>`;
 }).join('')||'<p class="notes">تياد سوءالن اونتوق ڤيليهن اين.</p>';
 stats();renderTopics();
}
$('topics').addEventListener('click',e=>{const b=e.target.closest('[data-topic]');if(!b)return;active=b.dataset.topic;level='semua';$('filter').value='semua';renderQuestions();$('section-heading').scrollIntoView({behavior:'smooth',block:'start'});});
$('filter').addEventListener('change',e=>{level=e.target.value;renderQuestions();});
$('questions').addEventListener('change',e=>{const t=e.target;if(!t.dataset.answer)return;const id=t.dataset.answer;if(state.checked[id])return;state.responses[id]=Number(t.value);stats();});
$('questions').addEventListener('click',e=>{const b=e.target.closest('button[data-check]');if(!b)return;const id=b.dataset.check;if(state.checked[id])return;if(!Object.hasOwn(state.responses,id)){alert('سيلا ڤيليه ساتو جواڤن دهولو.');return;}state.checked[id]=true;renderQuestions();});
$('reset').addEventListener('click',()=>{if(!confirm('ڤادم سموا جواڤن دان مرکه تلاوة القرآن اونتوق موريد اين؟'))return;state={responses:{},checked:{}};renderQuestions();});
$('review').addEventListener('click',()=>{
 let pending=DB.questions.filter(q=>!state.checked[q.id]);
 if(!pending.length){alert('تاهنيه! سموا سوءالن تله دسمق.');return;}
 active=pending[0].topic;level='semua';$('filter').value='semua';renderQuestions();$('item-'+pending[0].id)?.scrollIntoView({behavior:'smooth',block:'center'});
});
renderQuestions();
})();
