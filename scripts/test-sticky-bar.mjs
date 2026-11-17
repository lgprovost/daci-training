import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {test} from 'node:test';
const source=await readFile(new URL('../js/sticky-bar.js',import.meta.url),'utf8');
function fixture({homepage=true,bottom=1000,height=800,intersection=true}={}){
 const attrs={},classes=new Set(),listeners={};let cardBottom=bottom,obstructionCallback;
 const bar={inert:false,classList:{toggle:(name,on)=>on?classes.add(name):classes.delete(name)},setAttribute:(name,value)=>attrs[name]=value};
 const trigger={getBoundingClientRect:()=>({bottom:cardBottom})},footer={};
 const window={innerHeight:height,requestAnimationFrame:fn=>fn(),addEventListener:(name,fn)=>listeners[name]=fn};
 if(intersection)window.IntersectionObserver=class{constructor(fn){obstructionCallback=fn;}observe(){}};
 const document={querySelector:selector=>selector==='.sticky-bar'?bar:homepage?trigger:null,querySelectorAll:()=>[footer]};
 new vm.Script(source).runInNewContext({document,window,Set});
 return {bar,attrs,get hidden(){return classes.has('is-hidden');},scrollToBottom(value){cardBottom=value;listeners.scroll?.();},resize(value){window.innerHeight=value;listeners.resize?.();},pageshow(){listeners.pageshow?.();},footerVisible(value){obstructionCallback?.([{target:footer,isIntersecting:value}]);}};
}
test('homepage bar appears exactly when the card bottom reaches the viewport',()=>{
 const f=fixture();assert.equal(f.hidden,true);assert.equal(f.bar.inert,true);assert.equal(f.attrs['aria-hidden'],'true');
 f.scrollToBottom(801);assert.equal(f.hidden,true);f.scrollToBottom(800);assert.equal(f.hidden,false);assert.equal(f.bar.inert,false);
 f.scrollToBottom(-200);assert.equal(f.hidden,false);
});
test('scrolling back above the card bottom hides the homepage bar again',()=>{
 const f=fixture({bottom:300});assert.equal(f.hidden,false);f.scrollToBottom(900);assert.equal(f.hidden,true);
});
test('footer suppression still takes priority after the reveal point',()=>{
 const f=fixture({bottom:300});f.footerVisible(true);assert.equal(f.hidden,true);f.footerVisible(false);assert.equal(f.hidden,false);
});
test('other pages retain immediate availability and footer suppression',()=>{
 const f=fixture({homepage:false});assert.equal(f.hidden,false);f.footerVisible(true);assert.equal(f.hidden,true);f.footerVisible(false);assert.equal(f.hidden,false);
});
test('viewport resizing recalculates the reveal point',()=>{
 const f=fixture({bottom:700});assert.equal(f.hidden,false);f.resize(600);assert.equal(f.hidden,true);f.resize(800);assert.equal(f.hidden,false);f.pageshow();assert.equal(f.hidden,false);
});
test('homepage reveal still works without IntersectionObserver',()=>{
 const f=fixture({intersection:false});assert.equal(f.hidden,true);f.scrollToBottom(700);assert.equal(f.hidden,false);
});
