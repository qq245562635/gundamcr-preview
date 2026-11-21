// L07 匹配中（搜索对手）——大厅壳和独立大厅原型共用。
// 用法：FDMatch.show(画布元素, {onDone, onCancel})。画布是 1080×2340 的坐标系。
// 美术先用 L03 VS 背景 + CSS 占位；Codex 的 match-r01 切图到了以后在 SKIN 里替换。
(function(){
const UI=new URL('../',document.currentScript.src).href;
const VS=UI+'lobby/handoff/vs-armor-r01/slices/UI_FDLobby_VS_';
const MATCH=UI+'lobby/handoff/match-r01/';
const SP3=UI+'deck/handoff/armor-r03/sprites/';
const TIPS=["自由的全弹发射能同时瘫痪 5 台机体","飞弹齐射能打断高达X 的卫星炮蓄力","渣古降下可以扔到全场任何地方","能天使血量低于一半会自动发动 TRANS-AM","马格亚那克队人多，正好克制单体刺客","高达的盾能挡下一次大伤害","最后 60 秒和加时阶段能量恢复翻倍","拆掉对面一座侧塔后，那一路靠河的地方也能出兵"];
const css=`
.fdm{position:absolute;inset:0;z-index:80;overflow:hidden;background:#0d1724;animation:fdmIn .22s ease-out both;font-family:Armor,"Noto Sans SC","PingFang SC",sans-serif;user-select:none}
.fdm.out{animation:fdmOut .2s ease-in both}
@keyframes fdmIn{from{opacity:0}to{opacity:1}}
@keyframes fdmOut{from{opacity:1}to{opacity:0}}
.fdm .bg{position:absolute;inset:0;background:url(${VS}Background.png) 0 0/100% 100%}
.fdm .bg::after{content:"";position:absolute;inset:0;background:#082540bb}
.fdm .bar{position:absolute;left:90px;top:220px;width:900px;height:160px;background:url(${MATCH}UI_FDLobby_Match_TitleBar.png) 0 0/100% 100%;animation:fdmBar .3s cubic-bezier(.2,.8,.3,1.2) both}
@keyframes fdmBar{from{transform:translateX(-300px);opacity:0}to{transform:none;opacity:1}}
.fdm .ttl{position:absolute;left:250px;top:300px;transform:translateY(-50%);font-size:64px;font-weight:900;font-style:italic;color:#17263A;letter-spacing:4px;white-space:nowrap}
.fdm .lens{position:absolute;left:120px;top:246px;width:108px;height:108px}
.fdm .radar{position:absolute;left:220px;top:650px;width:640px;height:640px;background:url(${MATCH}UI_FDLobby_Match_Radar.png) 0 0/100% 100%}
.fdm .ring{position:absolute;border:3px solid #2FD3E055;border-radius:50%}
.fdm .sweep{position:absolute;inset:0;background:url(${MATCH}UI_FDLobby_Match_Radar_Sweep.png) 0 0/100% 100%;animation:fdmSpin 1.6s linear infinite}
@keyframes fdmSpin{to{transform:rotate(360deg)}}
.fdm .cross{position:absolute;background:#2FD3E033}
.fdm .blip{position:absolute;width:26px;height:26px;margin:-13px;border-radius:50%;background:#FF5A4E;box-shadow:0 0 18px #FF5A4E;opacity:0}
.fdm .blip.on{animation:fdmBlip 1.6s ease-out infinite}
@keyframes fdmBlip{0%{opacity:1;transform:scale(1.4)}70%{opacity:.5;transform:scale(1)}100%{opacity:0}}
.fdm .core{position:absolute;left:470px;top:920px;width:140px;height:140px;clip-path:polygon(25% 3%,75% 3%,100% 50%,75% 97%,25% 97%,0 50%);background:linear-gradient(160deg,#e9e5dc,#b7b2a7);display:flex;align-items:center;justify-content:center;font-size:58px;font-weight:900;color:#17263A}
.fdm .st{position:absolute;left:540px;top:1400px;transform:translate(-50%,-50%);font-size:40px;font-weight:900;color:#fff;white-space:nowrap;text-shadow:0 3px 0 #0a1320}
.fdm .sub{position:absolute;left:540px;top:1462px;transform:translate(-50%,-50%);font-size:28px;font-weight:700;color:#9fb3cc;white-space:nowrap}
.fdm .cancel{position:absolute;left:330px;top:1600px;width:420px;height:140px;display:flex;align-items:center;justify-content:center;font-size:52px;font-weight:900;color:#fff;cursor:pointer;
  background:linear-gradient(#ef5a4f,#c9332e 60%,#a92521);border:7px solid #e9e5dc;border-radius:14px;box-shadow:0 8px 0 #5f1512,0 0 0 4px #1a1010 inset;transition:transform .08s,box-shadow .08s,filter .08s;text-shadow:0 3px 0 #6b1713}
.fdm .cancel.skin{background:none;border-style:solid;border-color:transparent;border-width:30px;border-radius:0;box-shadow:none;border-image:url(${MATCH}UI_FDLobby_Button_Red.png) 24 18 24 18 fill/24px 18px stretch}
.fdm .cancel.press{transform:translateY(6px);box-shadow:0 2px 0 #5f1512,0 0 0 4px #1a1010 inset;filter:brightness(.92)}
.fdm .cancel.gone{opacity:0;pointer-events:none;transition:opacity .15s}
.fdm .tip{position:absolute;left:90px;top:1910px;width:900px;height:260px;background:url(${MATCH}UI_FDLobby_Match_TipBox.png) 0 0/100% 100%}
.fdm .tip b{position:absolute;left:60px;top:44px;color:#FFD45C;font-size:30px}
.fdm .tip span{position:absolute;left:60px;right:60px;top:100px;font-size:32px;line-height:1.5;font-weight:700;color:#e9eef4;text-align:center}
.fdm .found .ttl{color:#B57C00}
.fdm.found .radar{filter:drop-shadow(0 0 40px #FFD45C)}
.fdm.found .sweep{animation-duration:.5s}
`;
let styled=false;
function show(root,o={}){
  if(!styled){const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);styled=true}
  const el=document.createElement('div');el.className='fdm';
  const rings=[120,240,360,480,600].map(d=>`<div class="ring" style="left:${350-d/2}px;top:${350-d/2}px;width:${d}px;height:${d}px"></div>`).join('');
  const blips=[[190,170],[470,220],[140,430],[500,470]].map(([x,y],i)=>`<div class="blip" style="left:${x}px;top:${y}px;animation-delay:${i*.4}s"></div>`).join('');
  el.innerHTML=`<div class="bg"></div><div class="bar"></div>
   <svg class="lens" viewBox="0 0 126 126"><circle cx="52" cy="52" r="34" fill="#2FD3E033" stroke="#17263A" stroke-width="10"/><path d="M78 78l32 32" stroke="#17263A" stroke-width="16" stroke-linecap="round"/></svg>
   <div class="ttl">搜索对手<span class="dots"></span></div>
   <div class="radar"><div class="sweep"></div>${blips}</div>
   <div class="st">正在匹配 AI 指挥官</div><div class="sub">${o.sub||''}</div>
   <div class="cancel">取消</div>
   <div class="tip"><b>提示</b><span>${TIPS[Math.floor(Math.random()*TIPS.length)]}</span></div>`;
  root.appendChild(el);
  // 有 Codex 的红按钮切图就用切图
  const im=new Image();im.onload=()=>el.querySelector('.cancel').classList.add('skin');im.src=MATCH+'UI_FDLobby_Button_Red.png';
  let n=0;const dots=el.querySelector('.dots');const di=setInterval(()=>{n=(n+1)%4;dots.textContent='.'.repeat(n)},350);
  setTimeout(()=>el.querySelectorAll('.blip').forEach(b=>b.classList.add('on')),500);
  const dur=(o.min||1600)+Math.random()*((o.max||2600)-(o.min||1600));
  let done=false;
  const fin=setTimeout(()=>{if(done)return;done=true;clearInterval(di);el.classList.add('found');el.querySelector('.ttl').textContent='找到对手！';el.querySelector('.st').textContent='AI 指挥官';
    el.querySelector('.cancel').classList.add('gone');setTimeout(()=>{o.onDone&&o.onDone(el)},450)},dur);
  const c=el.querySelector('.cancel');
  c.addEventListener('pointerdown',()=>c.classList.add('press'));c.addEventListener('pointerleave',()=>c.classList.remove('press'));
  c.addEventListener('pointerup',()=>{c.classList.remove('press');if(done)return;done=true;clearTimeout(fin);clearInterval(di);
    setTimeout(()=>{el.classList.add('out');setTimeout(()=>{el.remove();o.onCancel&&o.onCancel()},200)},90)});
  // 预取战斗页
  try{const l=document.createElement('link');l.rel='prefetch';l.href=UI+'battle/prototype/';document.head.appendChild(l)}catch(e){}
  return el}
window.FDMatch={show};
})();
