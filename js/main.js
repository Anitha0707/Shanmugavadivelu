
const $=id=>document.getElementById(id);
const wa=t=>'https://wa.me/919443574205?text='+encodeURIComponent(t);
const rows=a=>a.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('');
const planHead=(p,i,star)=>star?`${i+1}. ${p.n}<small>${p.type}</small>`:`${p.n}<small>Plan No. ${p.no}${p.new?' <span class="newtag">NEW</span>':''}</small>`;
const planRows=(p,star)=>star?rows([['Entry Age',p.entry],['Sum Insured',p.si],['Key Benefits',p.ben]]):rows([['Plan Type',p.type],['Minimum Age',p.min],['Maximum Age',p.max],['Coverage',p.cover],['Term',p.term],['Benefits',p.ben]]);
function mkPlans(list,arr,star){if(!$(list))return;arr.forEach((p,i)=>$(list).insertAdjacentHTML('beforeend',`<article class="plan${star?' star':''}"><h3>${planHead(p,i,star)}</h3><div class="plan-act"><button type="button" class="btn vd" data-i="${i}">View Details</button><a class="btn" href="${wa('I am interested in '+p.n)}" target="_blank" rel="noopener">Enquire Now</a></div></article>`));
const pm=document.createElement('div');pm.className='pm';pm.innerHTML='<div class="pm-box"><button type="button" class="pm-x" aria-label="Close">&times;</button><div class="plan'+(star?' star':'')+'" id="pmc"></div></div>';document.body.appendChild(pm);
const close=()=>{pm.classList.remove('on');document.body.style.overflow=''};
$(list).addEventListener('click',e=>{const b=e.target.closest('.vd');if(!b)return;const p=arr[+b.dataset.i];$('pmc').innerHTML=`<h3>${planHead(p,+b.dataset.i,star)}</h3><table>${planRows(p,star)}</table><div class="plan-act"><a class="btn" href="${wa('I am interested in '+p.n)}" target="_blank" rel="noopener">Enquire Now</a></div>`;pm.classList.add('on');document.body.style.overflow='hidden'});
pm.addEventListener('click',e=>{if(e.target===pm||e.target.closest('.pm-x'))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
mkPlans('planList',plans,false);
mkPlans('starList',starPlans,true);
if($('gal')){imgs.forEach(([f,c])=>$('gal').insertAdjacentHTML('beforeend',`<figure><img loading="lazy" src="images/${f}.jpg" alt="${c} - S. Shanmugavadivelu LIC Advisor Sirkali"><figcaption>${c}</figcaption></figure>`));
$('gal').addEventListener('click',e=>{const i=e.target.closest('img');if(i){$('lbi').src=i.src;$('lb').classList.add('on')}})}
if($('tList'))ts.forEach(t=>{const txt=(t.msg||'').trim()||'Trusted advisor who is always there for our family&rsquo;s insurance needs.';const ta=/[\u0B80-\u0BFF]/.test(txt)?' tamil':'';$('tList').insertAdjacentHTML('beforeend',`<blockquote class="t${t.tag?' big':''}${ta}"><b>${t.n}</b><span>${t.p}</span>${t.tag?`<p><strong>${t.tag}</strong></p>`:''}<p>${txt}</p></blockquote>`)});
document.querySelectorAll('[data-n]').forEach(el=>{const n=+el.dataset.n,s=el.dataset.s||'';let c=0;const st=Math.ceil(n/60);const iv=setInterval(()=>{c=Math.min(n,c+st);el.textContent=c+(c==n?s:'');if(c==n)clearInterval(iv)},25)});
if($('yr'))$('yr').textContent=new Date().getFullYear();

if($('cf'))$('cf').addEventListener('submit',e=>{e.preventDefault();
const v=id=>$(id).value.trim(),pu=[...document.querySelectorAll('input[name=purpose]:checked')].map(c=>c.value);
if(!pu.length){$('cf-err').textContent='Please tick at least one PURPOSE.';return}
$('cf-err').textContent='';
const dob=v('f-dob').split('-').reverse().join('-');
const msg='*Free Consultation Request*\n\nNAME: '+v('f-name')+'\nDATE OF BIRTH: '+dob+'\nCELL NO: '+v('f-cell')+'\nSALARY: '+v('f-sal')+'\nPURPOSE: '+pu.join(', ');
window.open(wa(msg),'_blank','noopener')});
