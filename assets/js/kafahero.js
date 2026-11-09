/* KAFAHERO v1 — Shared local-only profile and per-subject progress. No backend. */
(function () {
  'use strict';
  const PROFILE_KEY='kafahero:profile:v1';
  const RESULT_PREFIX='kafahero:result:v1:';
  const SUBJECTS={
    ibadah:{title:'Ibadah',jawi:'عبادة',max:60,icon:'🕌'},
    aqidah:{title:'Aqidah',jawi:'عقيدة',max:100,icon:'🌟'},
    'bahasa-arab':{title:'Bahasa Arab',jawi:'بهاس عرب',max:60,icon:'🔤'},
    'adab-akhlak':{title:'Adab dan Akhlak',jawi:'ادب دان اخلاق',max:60,icon:'🤝'},
    sirah:{title:'Sirah',jawi:'سيرة',max:60,icon:'📜'},
    jawi:{title:'Jawi',jawi:'جاوي',max:60,icon:'✍️'},
    'tilawah-al-quran':{title:'Tilawah Al-Quran',jawi:'تلاوة القرآن',max:60,icon:'📖'}
  };
  const guest={name:'Tetamu',kelas:'',id:'guest'};
  const read=(k)=>{try {return JSON.parse(localStorage.getItem(k)||'null')}catch(_){return null}};
  const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(_){return false}};
  function makeId(name,kelas) {
    const n=String(name||'').trim().replace(/\s+/g,' ').toLocaleLowerCase('ms-MY');
    const k=String(kelas||'').trim().replace(/\s+/g,' ').toLocaleLowerCase('ms-MY');
    return (n+'|'+k).replace(/[.:/\\]/g,'_');
  }
  function getProfile(){const p=read(PROFILE_KEY);return p&&p.name&&p.id?p:guest;}
  function setProfile(name,kelas){
    const n=String(name||'').trim().replace(/\s+/g,' '), k=String(kelas||'').trim().replace(/\s+/g,' ');
    const p=n?{name:n,kelas:k,id:makeId(n,k)}:guest;
    write(PROFILE_KEY,p);dispatchEvent(new CustomEvent('kafahero:profile',{detail:p}));return p;
  }
  function resultKey(subject,profile){return RESULT_PREFIX+(profile||getProfile()).id+':'+subject;}
  function getResult(subject,profile){return read(resultKey(subject,profile));}
  function report(subject,payload){
    if(!SUBJECTS[subject])return null;
    const max=SUBJECTS[subject].max;
    const score=Math.max(0,Math.min(max,Number(payload.score)||0));
    const obj={subject,score,max,objective:Math.max(0,Number(payload.objective)||0),
      manual:Math.max(0,Number(payload.manual)||0),
      checked:Math.max(0,Number(payload.checked)||0),
      totalQuestions:Math.max(0,Number(payload.totalQuestions)||0),
      sections:(subject==='tilawah-al-quran'&&payload.sections&&typeof payload.sections==='object')?payload.sections:null,
      updatedAt:new Date().toISOString()};
    write(resultKey(subject),obj);
    dispatchEvent(new CustomEvent('kafahero:score',{detail:obj}));
    return obj;
  }
  window.KAFAHERO={SUBJECTS,getProfile,setProfile,report,getResult,resultKey};
})();