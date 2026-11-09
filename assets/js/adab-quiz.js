/* KAFAHERO Adab 60 objective questions; offline-first, scoped by subject + profile */
(()=>{'use strict';
const KH=window.KAFAHERO, dataNode=document.getElementById('adab-data');
if(!KH||!dataNode) return;
let D;try{D=JSON.parse(dataNode.textContent)}catch(e){document.getElementById('questions').textContent='داتا تيدق دباچ.';return;}
const profile=KH.getProfile(),storeKey='kafahero:adab:v3:'+profile.id;
let state={answers:{},checked:{}};
try{const old=JSON.parse(localStorage.getItem(storeKey)||'null');if(old&&old.answers&&old.checked)state=old;}catch(_){ }
const el=id=>document.getElementById(id), esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nums=n=>String(n).replace(/\d/g,a=>'٠١٢٣٤٥٦٧٨٩'[Number(a)]);
const levels={mudah:'موده',sederhana:'سدرهان',mencabar:'منچابر'}, topicName=id=>D.topics.find(x=>x.id===id);
let selectedTopic='all';
function totals(){let score=0,checked=0;for(const q of D.questions){if(state.checked[q.id]){checked++;if(state.answers[q.id]===q.correct)score++;}}return {score,checked};}
function report(){const x=totals();el('total-mark').textContent=x.score+' / 60';el('checked-count').textContent=nums(x.checked)+' / ٦٠';el('completed-bar').style.width=(x.checked/60*100)+'%';KH.report('adab-akhlak',{score:x.score,objective:x.score,manual:0,checked:x.checked,totalQuestions:60});}
function save(){try{localStorage.setItem(storeKey,JSON.stringify(state))}catch(_){ }report();}
function buttons(){const counts={};for(const q of D.questions) counts[q.topic]=(counts[q.topic]||0)+1;
el('topic-buttons').innerHTML=[{id:'all',name:'سموا تاجوق',icon:'🗂️'},...D.topics].map(t=>`<button type="button" data-topic="${t.id}" class="topic-btn" aria-pressed="${t.id===selectedTopic}">${t.icon} <span>${esc(t.name)}</span> <b>${nums(t.id==='all'?60:counts[t.id])}</b></button>`).join('');}
function feedback(q){if(!state.checked[q.id])return '';
const ok=state.answers[q.id]===q.correct;return `<div class="feedback ${ok?'good':'bad'}" role="status">${ok?'✓ تاهنيه! جواڤن بتول.':'✗ جواڤن بلوم بتول.'}<p>${esc(q.why)}</p>${ok?'':`<strong>جواڤن: ${'ابجد'[q.correct]} — ${esc(q.options[q.correct])}</strong>`}</div>`}
function card(q){const selected=state.answers[q.id],checked=!!state.checked[q.id];return `<article class="card" id="${q.id}"><div class="card-top"><span class="qno">${nums(parseInt(q.id.slice(2),10))} / ٦٠</span><span class="topic-chip">${topicName(q.topic).icon} ${esc(topicName(q.topic).name)}</span><span class="level ${q.level}">${levels[q.level]}</span><span class="points">١ مرکه</span></div><h3 class="prompt">${esc(q.q)}</h3><div class="choices">${q.options.map((o,i)=>`<label class="choice ${checked&&i===q.correct?'right':''}"><input type="radio" name="${q.id}" data-q="${q.id}" value="${i}" ${selected===i?'checked':''} ${checked?'disabled':''}/><span class="letter">${'ابجد'[i]}</span><span class="optiontext">${esc(o)}</span></label>`).join('')}</div><div class="actions">${checked?`<button type="button" class="btn secondary" data-retry="${q.id}">↻ چوبا سمولا</button>`:`<button type="button" class="btn" data-check="${q.id}">✓ سمق جواڤن</button>`}</div>${feedback(q)}</article>`}
function render(){buttons();const arr=selectedTopic==='all'?D.questions:D.questions.filter(q=>q.topic===selectedTopic);
el('quiz-title').textContent=selectedTopic==='all'?'سموا ٦٠ سوءالن':topicName(selectedTopic).name+' — '+nums(arr.length)+' سوءالن';
el('questions').innerHTML=arr.map(card).join('');report();}
function refresh(id){const old=el(id),q=D.questions.find(x=>x.id===id);if(old&&q)old.outerHTML=card(q);}
function showGlossary(){el('glossary-items').innerHTML=D.topics.map(t=>`<div class="vocab"><h3>${t.icon} ${esc(t.name)} <small>(${nums(t.notes.length)})</small></h3><div class="pairs">${t.notes.map(v=>`<div class="pair"><span>${esc(v)}</span></div>`).join('')}</div></div>`).join('');}
el('student-name').textContent=profile.name+(profile.kelas?' • '+profile.kelas:'');
if(profile.id==='guest')el('guest-note').textContent='اونتوق سيمڤن رکود مڠيکوت نام، ماسوقکن نام د لامن اوتام.';
document.addEventListener('change',e=>{const target=e.target;if(target.dataset.q){state.answers[target.dataset.q]=Number(target.value);save();}});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
if(b.dataset.topic){selectedTopic=b.dataset.topic;render();return;}
if(b.dataset.check){const id=b.dataset.check;if(state.answers[id]===undefined){alert('سيلا ڤيليه جواڤن دهولو.');return;}state.checked[id]=true;save();refresh(id);return;}
if(b.dataset.retry){const id=b.dataset.retry;delete state.answers[id];delete state.checked[id];save();refresh(id);return;}
});
el('glossary-toggle').addEventListener('click',()=>{const x=el('glossary'),hidden=!x.hidden;x.hidden=hidden;el('glossary-toggle').setAttribute('aria-expanded',String(!hidden));if(!hidden)showGlossary();});
el('reset-button').addEventListener('click',()=>{if(confirm('ڤادم جواڤن دان مرکه ادب دان اخلاق سهاج؟')){state={answers:{},checked:{}};save();render();}});
render();
})();