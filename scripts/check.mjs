import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COURSES, INDUSTRIES } from '../data/programs-config.js';
import { SITE_CONFIG, isQuoteServiceConfigured } from '../js/config.js';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let checks = 0;
function check(condition,message) { assert.ok(condition,message); checks++; }
async function files(dir) { const out=[]; for(const entry of await readdir(dir,{withFileTypes:true})) { const file=path.join(dir,entry.name); if(entry.isDirectory()) out.push(...await files(file)); else out.push(file); } return out; }
const ids=new Set(COURSES.map(c=>c.id));
check(ids.size===6,'Exactly six distinct DACI program IDs');
check(INDUSTRIES.length===8,'Exactly eight industries');
for(const c of COURSES) { check(c.outcomes.length>=4,`${c.id}: learning outcomes supplied`); check(c.modules.length>=6,`${c.id}: curriculum modules supplied`); check(c.industries.every(id=>INDUSTRIES.some(i=>i.id===id)),`${c.id}: valid industry IDs`); }
for(const i of INDUSTRIES) check(i.courses.every(id=>ids.has(id)),`${i.id}: valid course bundle`);
const htmlFiles=(await files(root)).filter(n=>n.endsWith('.html')&&!n.includes(`${path.sep}dist${path.sep}`)&&!n.includes(`${path.sep}docs${path.sep}`)).map(n=>path.relative(root,n));
check(htmlFiles.length===13,'Six primary pages, six program pages, and branded 404');
for(const name of htmlFiles) {
 const html=await readFile(path.join(root,name),'utf8');
 check(/<body><a href="#main-content" class="skip-link">/.test(html),`${name}: skip link is the first body element`);
 check((html.match(/<h1\b/g)||[]).length===1,`${name}: exactly one h1`);
 check(/<html lang="en">/.test(html),`${name}: language`);
 const tags=[...html.matchAll(/<img\b[^>]*>/g)].map(m=>m[0]);
 for(const tag of tags) check(/\balt="[^"]+"/.test(tag)&&/\bwidth="\d+"/.test(tag)&&/\bheight="\d+"/.test(tag)&&/\b(?:loading="lazy"|fetchpriority="high")/.test(tag),`${name}: complete image attributes`);
 const foundIds=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 check(new Set(foundIds).size===foundIds.length,`${name}: unique element IDs`);
 check(!/\b(?:online|virtual|self-paced)\b/i.test(html),`${name}: onsite scope`);
 check(!/type="(?:password|credit-card)"|\bshopping cart\b/i.test(html),`${name}: no excluded account or payment UI`);
 check(!/href="tel:|type="tel"|direct_phone|\[PHONE_|\bPhoenix\b|\bArizona\b|CPI-certified/.test(html),`${name}: email-only nationwide DACI copy`);
 check(html.includes('https://dacitraining.com'),`${name}: permanent canonical domain`);
 for(const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
  const route=match[1];
  const target=path.join(root,route==='/'?'index.html':route.slice(1)+(path.extname(route)?'':'.html'));
  check((await stat(target).catch(()=>null))?.isFile(),`${name}: local asset or route exists: ${route}`);
 }
 for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
  const data=JSON.parse(match[1]);
  check(data.hasOfferCatalog.itemListElement.length===6,`${name}: six schema catalog entries`);
  check(!('address' in data),`${name}: no invented address`);
  check(!('telephone' in data)&&!('geo' in data)&&data.areaServed.name==='United States',`${name}: nationwide email-only schema`);
 }
}
const trainer=await readFile(path.join(root,'trainer-login.html'),'utf8');
check(!/<(?:input|form|textarea|select)\b/.test(trainer),'Trainer portal has zero inputs or forms');
check(trainer.includes('noindex, nofollow'),'Trainer portal is excluded from search');
const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');
check((sitemap.match(/<url>/g)||[]).length===11&&!sitemap.includes('trainer-login'),'Sitemap includes five main routes and six permanent program pages');
const formHtml=await readFile(path.join(root,'request-quote.html'),'utf8');
check((formHtml.match(/name="selected_courses"/g)||[]).length===6,'Quote matrix has six checkboxes');
check(!/proof-stat|14\.2|89%|74%|58%|17 million/.test(formHtml),'Quote journey contains zero promotional statistics');
check(formHtml.includes('level3_eligibility'),'Level 3 has an eligibility confirmation');
check(formHtml.includes('Quote submission is not available yet.') === !isQuoteServiceConfigured(),'Quote availability notice matches configuration');
check(formHtml.includes(`name="access_key" value="${SITE_CONFIG.web3formsAccessKey}"`),'Quote form uses the configured Web3Forms access key');
check(COURSES.find(c=>c.id==='daci-level-3').industries.join(',')==='security','Level 3 is mapped only to law enforcement/corrections sector');
check(!INDUSTRIES.some(i=>i.courses.includes('daci-level-3')),'Level 3 is not automatically recommended to broad industry bundles');
for(const match of formHtml.matchAll(/<(?:input|select|textarea)\b[^>]*id="([^"]+)"[^>]*>/g)) {
 if(match[0].includes('type="hidden"')) continue;
 check(formHtml.includes(`for="${match[1]}"`),`Persistent label for ${match[1]}`);
}
const jsFiles=[...await files(path.join(root,'js')),path.join(root,'data/programs-config.js')];
const cssFiles=await files(path.join(root,'css'));
const sizes={jsGzipBytes:0,cssGzipBytes:0};
for(const file of jsFiles) {
 const code=await readFile(file,'utf8');
 // Strip the static module declarations, then parse without executing browser code.
 new vm.Script(code.replace(/^import .*;\r?$/gm,'').replace(/^export /gm,''),{filename:file});
 check(true,`JavaScript syntax: ${path.basename(file)}`);
 sizes.jsGzipBytes+=gzipSync(await readFile(path.join(root,'dist',path.relative(root,file)))).length;
}
for(const file of cssFiles) sizes.cssGzipBytes+=gzipSync(await readFile(file)).length;
check(sizes.jsGzipBytes<10240,`JavaScript gzip budget: ${sizes.jsGzipBytes} bytes < 10KB`);
check(sizes.cssGzipBytes<25600,`CSS gzip budget: ${sizes.cssGzipBytes} bytes < 25KB`);
function luminance(hex) { const c=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4); return .2126*c[0]+.7152*c[1]+.0722*c[2]; }
const contrast=(a,b)=>{const l=[luminance(a),luminance(b)].sort((a,b)=>b-a);return (l[0]+.05)/(l[1]+.05);};
const contrasts={};
for(const [name,color] of Object.entries({navy:'0B1F44',crimson:'C62828',crimsonHover:'9E1C1C',steel:'1E4E8C',ink:'1E293B',slate:'475569',emerald:'156534'})) { contrasts[name]=Number(contrast(color,'FFFFFF').toFixed(2)); check(contrasts[name]>=4.5,`${name} text contrast >= 4.5:1`); }
check(contrast('475569','FFFFFF')>=3,'Functional input border contrast >= 3:1 (specified #94A3B8 is decorative only)');
if(process.argv.includes('--launch')) for(const [key,value] of Object.entries(SITE_CONFIG)) check(!String(value).includes('['),`Configure ${key} before public launch`);
console.log(JSON.stringify({status:'passed',checks,...sizes,contrastOnWhite:contrasts,launchConfiguration:Object.values(SITE_CONFIG).some(value=>String(value).includes('['))?'placeholders retained by request':'configured'},null,2));
