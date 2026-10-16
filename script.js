document.getElementById('name').textContent = CONFIG.name;
document.title = "Happy 18th Birthday, " + CONFIG.name;
document.getElementById('intro').textContent = CONFIG.intro;

const tl = document.getElementById('timeline');
CONFIG.moments.forEach(m=>{
  const d = document.createElement('div'); d.className='item';
  const w = document.createElement('div'); w.className='when'; w.textContent=m.when;
  const h = document.createElement('h3'); h.textContent=m.title;
  const p = document.createElement('p'); p.textContent=m.text;
  d.append(w,h,p); tl.appendChild(d);
});
const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.item').forEach(i=>io.observe(i));

let order = [], seen = 0;
const card = document.getElementById('reason'), count = document.getElementById('count');
function hearts(){
  for(let i=0;i<8;i++){
    const s=document.createElement('span'); s.className='float'; s.textContent='♥';
    s.style.left=Math.random()*100+'vw'; s.style.fontSize=(14+Math.random()*22)+'px';
    s.style.animationDuration=(3+Math.random()*2)+'s';
    document.body.appendChild(s); setTimeout(()=>s.remove(),5200);
  }
}
document.getElementById('btn').onclick = ()=>{
  if(!order.length) order = CONFIG.reasons.map((_,i)=>i).sort(()=>Math.random()-.5);
  const i = order.pop(); seen++;
  card.style.opacity=0;
  setTimeout(()=>{card.textContent=CONFIG.reasons[i]; card.style.opacity=1},200);
  count.textContent = seen + " reason" + (seen>1?"s":"") + " so far, and there are so many more";
  hearts();
};

const days = Math.max(0, Math.floor((Date.now() - new Date(CONFIG.since)) / 864e5));
[[days.toLocaleString(), 'days together'], ['18', 'years of you'], ['∞', 'more to come']].forEach(([n, l]) => {
  const s = document.createElement('div'); s.className = 'stat';
  const a = document.createElement('span'); a.className = 'n'; a.textContent = n;
  const b = document.createElement('span'); b.textContent = l;
  s.append(a, b); document.getElementById('stats').appendChild(s);
});
CONFIG.wishes.forEach((w, i) => {
  const d = document.createElement('div'); d.className = 'wish';
  const b = document.createElement('b'); b.textContent = (i + 1) + '.';
  d.append(b, w); document.getElementById('wishes').appendChild(d);
});

const cw = document.getElementById('coupons');
CONFIG.coupons.forEach(c=>{
  const box=document.createElement('div'); box.className='scratch';
  const pr=document.createElement('div'); pr.className='prize serif';
  const sm=document.createElement('small'); sm.textContent=c.label;
  const tx=document.createElement('span'); tx.textContent=c.text;
  pr.append(sm,tx);
  const cv=document.createElement('canvas');
  box.append(pr,cv); cw.appendChild(box);
  const dpr=window.devicePixelRatio||1, r=box.getBoundingClientRect();
  const W=cv.width=Math.round(r.width*dpr), H=cv.height=Math.round(r.height*dpr);
  const g=cv.getContext('2d');
  const gr=g.createLinearGradient(0,0,W,H);
  gr.addColorStop(0,'#c9a0a8'); gr.addColorStop(.5,'#ecd3d7'); gr.addColorStop(1,'#c9a0a8');
  g.fillStyle=gr; g.fillRect(0,0,W,H);
  g.fillStyle='#7a5560'; g.font=(18*dpr)+'px Georgia,serif'; g.textAlign='center'; g.textBaseline='middle';
  g.fillText('✨ Scratch here ✨',W/2,H/2);
  g.globalCompositeOperation='destination-out'; g.lineWidth=38*dpr; g.lineCap='round';
  let down=false,lx=0,ly=0,done=false;
  const pos=e=>{const b=cv.getBoundingClientRect();return[(e.clientX-b.left)*W/b.width,(e.clientY-b.top)*H/b.height]};
  cv.addEventListener('pointerdown',e=>{down=true;cv.setPointerCapture(e.pointerId);[lx,ly]=pos(e);g.beginPath();g.moveTo(lx,ly);g.lineTo(lx+.1,ly);g.stroke()});
  cv.addEventListener('pointermove',e=>{if(!down)return;const[x,y]=pos(e);g.beginPath();g.moveTo(lx,ly);g.lineTo(x,y);g.stroke();lx=x;ly=y});
  const end=()=>{
    if(!down)return; down=false; if(done)return;
    const d=g.getImageData(0,0,W,H).data; let clear=0,n=0;
    for(let i=3;i<d.length;i+=64){n++; if(d[i]<40)clear++}
    if(clear/n>.45){done=true;cv.classList.add('done');hearts()}
  };
  cv.addEventListener('pointerup',end); cv.addEventListener('pointercancel',end);
});

const L = document.getElementById('letter');
CONFIG.letter.forEach(t=>{const p=document.createElement('p');p.textContent=t;L.appendChild(p)});
const s=document.createElement('p'); s.className='sign serif'; s.textContent=CONFIG.signoff+" ♥"; L.appendChild(s);
