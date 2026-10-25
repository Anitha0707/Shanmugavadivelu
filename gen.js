// Run: node gen.js  -> builds plans/*.html and sitemap.xml from js/plans.js
// Menu, footer and social icons come from js/parts.js.
const fs=require('fs'),{PLANS,CATS,slug,detHTML}=require('./js/plans.js'),P=require('./js/parts.js');
const {B,W,NAV,header,footer,floats}=P;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
fs.mkdirSync('plans',{recursive:true});
const pages=NAV.map(n=>n[0]==='index.html'?B:B+n[0]);
const urls=pages.slice();
PLANS.forEach(p=>{
  const s=slug(p.n),u=B+'plans/'+s+'.html',msg=encodeURIComponent('Hello Ramesh, I would like to know more about '+p.n+' (Plan '+p.no+').');
  const rel=PLANS.filter(x=>x.cat===p.cat&&x!==p).slice(0,3).map(x=>`<li><a href="${slug(x.n)}.html">${esc(x.n)}</a></li>`).join('');
  const t=`${p.n} (Plan ${p.no}) – Details and Enquiry | S.M. Ramesh LIC Advisor, Chennai`;
  const d=`${p.n}, LIC plan no. ${p.no}: overview and how to enquire with S.M. Ramesh, LIC advisor at CBO-19 Alandur, Chennai. Check the official brochure for full terms.`;
  const ld={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":B},{"@type":"ListItem","position":2,"name":"LIC Plans","item":B+'plans.html'},{"@type":"ListItem","position":3,"name":p.n,"item":u}]};
  fs.writeFileSync(`plans/${s}.html`,`<!DOCTYPE html>
<html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t)}</title><meta name="description" content="${esc(d)}"><meta name="robots" content="index, follow">
<link rel="canonical" href="${u}"><link rel="icon" href="../images/favicon.png">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(t)}"><meta property="og:description" content="${esc(d)}"><meta property="og:url" content="${u}"><meta property="og:image" content="${B}images/hero-office.jpg">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;800&family=Inter:wght@400;500;600&family=Noto+Sans+Tamil:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css"><script type="application/ld+json">${JSON.stringify(ld)}</script></head>
<body>
${header('plans.html','../')}
<main class="pg" id="main"><nav class="crumb" aria-label="Breadcrumb"><a href="../index.html">Home</a> › <a href="../plans.html">LIC Plans</a> › ${esc(p.n)}</nav>
<h1>${esc(p.n)}</h1><p class="tag">${CATS[p.cat].en} · Plan no. ${p.no}${p.nw?' · '+esc(p.nw):''}</p>
<p>${esc(p.d)}</p>
${detHTML(p,'en')}
<div class="cta"><a class="btn" href="https://wa.me/${W}?text=${msg}" rel="noopener" target="_blank">Ask Ramesh about this plan</a><a class="btn ghost" href="tel:+917299392366">Call 7299392366</a></div>
<h2>Related plans</h2><ul>${rel}</ul>
<p class="note">Details are summarised from LIC of India announcements and brochures. Benefits, premiums and availability are as per LIC's official documents; this is an independent LIC advisor site, not an official LIC website.</p></main>
${footer('../')}
${floats()}
<script src="../js/plans.js"></script><script src="../js/main.js"></script>
</body></html>`);
  urls.push(u);
});
fs.writeFileSync('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(u=>`<url><loc>${u}</loc></url>`).join('')+'</urlset>');
console.log(urls.length+' URLs');
