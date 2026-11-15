// Network-state tests for the real quote module using a minimal DOM adapter.
// Browser layout, focus, and keyboard behavior are also checked in the live preview.
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isQuoteServiceConfigured } from '../js/config.js';
import { COURSES, INDUSTRIES, TIERS } from '../data/programs-config.js';
const code=(await readFile(new URL('../js/quote-matrix.js',import.meta.url),'utf8')).replace(/^import .*;\r?$/gm,'');

function fixture({endpoint='https://api.web3forms.com/submit',accessKey='11111111-1111-4111-8111-111111111111',query='?courses=daci-level-1',initial=[],response,valid=true,honeypot='',emailAddress='training@example.com',captcha='test-hcaptcha-token'}={}) {
 const nodes=new Map(); let saved=initial, requests=[], captchaResets=0;
 class Element {
  constructor(id='') { this.id=id;this.children=[];this.attrs={};this.dataset={};this.hidden=false;this.value='';this.checked=false;this.events={};this.textContent=''; if(id) nodes.set(id,this); }
  setAttribute(k,v) { this.attrs[k]=String(v); }
  getAttribute(k) { return this.attrs[k]??null; }
  hasAttribute(k) { return k in this.attrs; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(k,fn) { (this.events[k] ||= []).push(fn); }
  async emit(k,event={}) { for(const fn of this.events[k]||[]) await fn({target:this,preventDefault(){},...event}); }
  append(...items) { this.children.push(...items); }
  replaceChildren(...items) { this.children=[...items]; }
  insertAdjacentElement(_where,item) { nodes.set(item.id,item); }
  remove() { nodes.delete(this.id); }
  focus() { document.activeElement=this; }
  get validity() { return {valid:this.id!=='work_email'||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)}; }
 }
 const form=new Element('quote-form'),summary=new Element('summary');
 const message=new Element('form-message'),confirmation=new Element('quote-confirmation');
 message.hidden=confirmation.hidden=true;
 const submit=new Element('quote-form-submit');
 const controls=COURSES.map(c=>{const el=new Element(`select-${c.id}`);el.value=c.id;return el;});
 const recommendations=COURSES.map(c=>{const el=new Element();el.dataset.recommendation=c.id;return el;});
 const required=['organization_name','contact_name_title','work_email','training_location','industry_sector','participant_count'];
 form.elements={};
 for(const id of [...required,'primary_risk','level3_eligibility','selected_courses_summary','botcheck']) form.elements[id]=new Element(id);
 if(valid) Object.entries({organization_name:'Example Org',contact_name_title:'Test Coordinator',work_email:'test@example.com',training_location:'Phoenix',industry_sector:'healthcare',participant_count:'24'}).forEach(([id,value])=>{form.elements[id].value=value;});
 form.elements.botcheck.checked=Boolean(honeypot);
 new Element('quote-captcha');
 if (captcha !== null) { form.elements['h-captcha-response']=new Element(); form.elements['h-captcha-response'].value=captcha; }
 new Element('course-matrix');
 const statuses={'[data-plan-status]':new Element(),'[data-recommendation-status]':new Element()};
 form.querySelectorAll=selector=>selector==='[name="selected_courses"]'?controls:selector==='[data-recommendation]'?recommendations:[];
 form.querySelector=()=>submit;
 const document={activeElement:null,querySelector:selector=>({'#quote-form':form,'[data-summary-list]':summary,'#form-message':message,'#quote-confirmation':confirmation,...statuses})[selector],getElementById:id=>nodes.get(id),createElement:()=>new Element()};
 class TestFormData { constructor() {this.data=new Map(Object.entries(form.elements).map(([key,el])=>[key,el.value]));} set(key,value) {this.data.set(key,value);} get(key) {return this.data.get(key);} }
 const context=vm.createContext({COURSES,INDUSTRIES,TIERS,SITE_CONFIG:{formEndpoint:endpoint,inquiryEmail:emailAddress,web3formsAccessKey:accessKey},isQuoteServiceConfigured:()=>isQuoteServiceConfigured({formEndpoint:endpoint,inquiryEmail:emailAddress,web3formsAccessKey:accessKey}),document,window:{hcaptcha:{reset:()=>{captchaResets++;}}},location:{search:query},URLSearchParams,Set,FormData:TestFormData,AbortSignal,readSelection:()=>initial,saveSelection:ids=>{saved=ids;},fetch:async(...args)=>{requests.push(args);return response?await response(...args):{ok:true,json:async()=>({success:true})};}});
 new vm.Script(code).runInContext(context);
 return {form,controls,summary,message,confirmation,submit,nodes,document,recommendations,requests,get saved(){return saved;},get captchaResets(){return captchaResets;},send:()=>form.emit('submit')};
}

test('invalid entries focus the first error and never issue a request',async()=>{
 const f=fixture({valid:false,query:''});await f.send();
 assert.equal(f.requests.length,0);assert.equal(f.document.activeElement.id,'organization_name');
 assert.ok(f.nodes.has('course-matrix-error'));assert.ok(f.nodes.has('participant_count-error'));
});
test('an unconfigured endpoint never reports success or sends data',async()=>{
 const f=fixture({accessKey:'[WEB3FORMS_ACCESS_KEY]'});await f.send();
 assert.equal(f.requests.length,0);assert.equal(f.confirmation.hidden,true);assert.equal(f.message.hidden,false);
});
test('a successful POST contains the course IDs and summary, then clears storage',async()=>{
 const f=fixture();await f.send();const [,options]=f.requests[0];
 assert.equal(f.requests[0][0],'https://api.web3forms.com/submit');
 assert.equal(options.body.get('access_key'),'11111111-1111-4111-8111-111111111111');
 assert.equal(options.body.get('email'),'test@example.com');
 assert.equal(options.body.get('replyto'),'test@example.com');
 assert.equal(options.body.get('h-captcha-response'),'test-hcaptcha-token');
 assert.equal(options.method,'POST');assert.equal(options.body.get('selected_courses'),'daci-level-1');
 assert.equal(options.body.get('selected_courses_summary'),'DACI Level 1');
 assert.match(options.body.get('message'),/Programs: DACI Level 1/);
 assert.match(options.body.get('message'),/Organization: Example Org/);
 assert.match(options.body.get('message'),/Participants: 24/);
 assert.equal(f.form.hidden,true);assert.equal(f.confirmation.hidden,false);assert.equal(f.saved.length,0);
});
test('server errors preserve entries and selections and allow retry',async()=>{
 const f=fixture({response:()=>({ok:false,json:async()=>({success:false})})});await f.send();
 assert.equal(f.form.hidden,false);assert.equal(f.confirmation.hidden,true);assert.equal(f.message.hidden,false);
 assert.equal(f.form.elements.organization_name.value,'Example Org');assert.equal(f.saved[0],'daci-level-1');assert.equal(f.submit.disabled,false);
});
test('network failures produce a recoverable error',async()=>{
 const f=fixture({response:()=>{throw new Error('offline');}});await f.send();assert.equal(f.message.hidden,false);assert.equal(f.confirmation.hidden,true);
});
test('honeypot requests do not reach the endpoint',async()=>{const f=fixture({honeypot:'spam'});await f.send();assert.equal(f.requests.length,0);});
test('a pending submission suppresses duplicate sends',async()=>{
 let release;const f=fixture({response:()=>new Promise(resolve=>{release=resolve;})});
 const pending=f.send();await f.send();assert.equal(f.requests.length,1);assert.equal(f.submit.disabled,true);
 release({ok:true,json:async()=>({success:true})});await pending;assert.equal(f.confirmation.hidden,false);
});
test('hydration merges valid storage and URL IDs, ignoring unknown values',()=>{
 const f=fixture({query:'?industry=education&courses=daci-youth,bogus',initial:['daci-level-1','not-real']});
 assert.deepEqual([...f.saved].sort(),['daci-level-1','daci-youth']);
 assert.equal(f.form.elements.industry_sector.value,'education');assert.equal(f.recommendations.filter(el=>!el.hidden).length,2);
});
test('risk hydration provides a focused starting course and does not select all physical tiers',()=>{
 const f=fixture({query:'?industry=healthcare&risk=physical'});assert.deepEqual([...f.saved],['daci-level-2']);
});

test('pending DACI email blocks delivery even with a configured form endpoint',async()=>{
 const f=fixture({emailAddress:'[EMAIL_INQUIRY]'});await f.send();
 assert.equal(f.requests.length,0);assert.equal(f.confirmation.hidden,true);assert.equal(f.message.hidden,false);
});

test('Level 3 requires law enforcement or corrections eligibility before delivery',async()=>{
 const f=fixture({query:'?courses=daci-level-3'});await f.send();
 assert.equal(f.requests.length,0);assert.ok(f.nodes.has('level3_eligibility-error'));
 f.form.elements.level3_eligibility.value='confirmed';await f.send();
 assert.equal(f.requests.length,1);assert.equal(f.confirmation.hidden,false);
});


test('a provider rejection with HTTP 200 never shows success',async()=>{
 const f=fixture({response:()=>({ok:true,json:async()=>({success:false,message:'Invalid access key'})})});await f.send();
 assert.equal(f.form.hidden,false);assert.equal(f.confirmation.hidden,true);assert.equal(f.message.hidden,false);assert.equal(f.saved[0],'daci-level-1');
});

test('an unexpected endpoint cannot receive visitor data',async()=>{
 const f=fixture({endpoint:'https://example.com/submit'});await f.send();assert.equal(f.requests.length,0);
});

test('missing or expired hCaptcha blocks requests and focuses verification',async()=>{
 const f=fixture({captcha:''});await f.send();assert.equal(f.requests.length,0);assert.equal(f.document.activeElement.id,'quote-captcha');assert.ok(f.nodes.has('quote-captcha-error'));assert.equal(f.confirmation.hidden,true);
 f.form.elements['h-captcha-response'].value='fresh-token';await f.send();assert.equal(f.requests.length,1);assert.equal(f.requests[0][1].body.get('h-captcha-response'),'fresh-token');
});
test('an unloaded hCaptcha widget fails closed without losing entries',async()=>{
 const f=fixture({captcha:null});await f.send();assert.equal(f.requests.length,0);assert.equal(f.form.elements.organization_name.value,'Example Org');assert.equal(f.saved[0],'daci-level-1');
});
test('failed submissions require a fresh captcha token before retrying',async()=>{
 const f=fixture({response:()=>({ok:false,json:async()=>({success:false})})});await f.send();assert.equal(f.captchaResets,1);assert.equal(f.form.elements['h-captcha-response'].value,'');await f.send();assert.equal(f.requests.length,1);assert.equal(f.submit.disabled,false);
});
