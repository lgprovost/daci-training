import {mkdir,readFile,writeFile,cp,readdir,stat,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {SITE_CONFIG} from '../js/config.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const input=path.join(root,'dist'),output=path.join(root,'pages-dist');
const baseURL=new URL(process.env.PAGES_BASE_URL || 'https://lgprovost.github.io/daci-training/');
assert.equal(baseURL.protocol,'https:','Pages base URL must use HTTPS');
assert.ok(!baseURL.search&&!baseURL.hash,'Pages base URL cannot contain a query or hash');
const mount=baseURL.pathname.replace(/\/$/,'');
const base=mount+'/';
const origin=baseURL.origin+mount;
const htmlFiles=(await readdir(input)).filter(n=>n.endsWith('.html'));
for(const name of await readdir(path.join(input,'programs')))if(name.endsWith('.html'))htmlFiles.push('programs/'+name);
const routes=new Map(htmlFiles.filter(n=>n!=='404.html').map(n=>[n==='index.html'?'/':'/'+n.replace(/\.html$/,''),n]));
function resolveRoute(value){
  if(!value.startsWith('/')||value.startsWith('//'))return value;
  const [,pathname,suffix]=value.match(/^([^?#]*)(.*)$/);
  const clean=pathname.replace(/\/$/,'')||'/';
  return mount+(routes.has(clean)?(clean==='/'?'/':clean+'/'):pathname)+suffix;
}
// Delete only this script's fixed, checkout-local artifact directory.
assert.equal(path.dirname(output),root);
assert.equal(path.basename(output),'pages-dist');
await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});
for(const folder of ['assets','css','js','data'])await cp(path.join(input,folder),path.join(output,folder),{recursive:true});
for(const name of htmlFiles){
  let html=await readFile(path.join(input,name),'utf8');
  html=html.replace('<head>','<head><meta name="daci-base-path" content="'+base+'">');
  html=html.replace(/\b(href|src|action)="(\/[^\"]*)"/g,(_all,attr,value)=>`${attr}="${resolveRoute(value)}"`);
  html=html.replaceAll('https://'+SITE_CONFIG.domain,origin);
  const target=name==='index.html'||name==='404.html'?name:name.replace(/\.html$/,'/index.html');
  await mkdir(path.dirname(path.join(output,target)),{recursive:true});
  await writeFile(path.join(output,target),html);
}
await writeFile(path.join(output,'.nojekyll'),'');
await writeFile(path.join(output,'robots.txt'),(await readFile(path.join(input,'robots.txt'),'utf8')).replaceAll('https://'+SITE_CONFIG.domain,origin).replaceAll('Disallow: /trainer-login','Disallow: '+base+'trainer-login'));
await writeFile(path.join(output,'sitemap.xml'),(await readFile(path.join(input,'sitemap.xml'),'utf8')).replaceAll('https://'+SITE_CONFIG.domain,origin));

// Check every emitted root-relative link, asset, and native form action at its real mount path.
let checked=0;
for(const name of htmlFiles){
 const target=name==='index.html'||name==='404.html'?name:name.replace(/\.html$/,'/index.html');
 const html=await readFile(path.join(output,target),'utf8');
 for(const [,value] of html.matchAll(/\b(?:href|src|action)="(\/[^\"]*)"/g)){
  const url=new URL(value,origin+'/');
  assert.ok(url.pathname.startsWith(base),`Link escapes Pages mount: ${value}`);
  let relative=decodeURIComponent(url.pathname.slice(base.length));
  let file=path.join(output,relative);
  if((await stat(file).catch(()=>null))?.isDirectory())file=path.join(file,'index.html');
  assert.ok((await stat(file).catch(()=>null))?.isFile(),`Missing Pages destination: ${value}`);checked++;
 }
}
console.log(JSON.stringify({output:'pages-dist',baseURL:origin+'/',pages:htmlFiles.length,checkedLinks:checked}));
