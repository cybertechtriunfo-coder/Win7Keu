const startButton=document.getElementById("start-button");
const startMenu=document.getElementById("start-menu");
const taskApps=document.getElementById("task-apps");
const titles={computer:"🖥️ Computador",files:"📁 Meus arquivos",player:"🎵 Media Player",about:"ℹ️ Sobre"};
function openWindow(name){
 const win=document.getElementById("window-"+name);
 if(!win)return;
 win.classList.remove("hidden");
 startMenu.classList.add("hidden");
 if(!document.getElementById("task-"+name)){
  const b=document.createElement("button");b.className="task-app";b.id="task-"+name;b.textContent=titles[name];b.onclick=()=>win.classList.toggle("hidden");taskApps.appendChild(b);
 }
}
document.querySelectorAll("[data-window]").forEach(b=>b.addEventListener("click",()=>openWindow(b.dataset.window)));
document.querySelectorAll(".close").forEach(b=>b.addEventListener("click",()=>{
 const win=b.closest(".window");win.classList.add("hidden");
 const id="task-"+win.id.replace("window-","");
 document.getElementById(id)?.remove();
}));
startButton.addEventListener("click",()=>startMenu.classList.toggle("hidden"));
document.addEventListener("click",e=>{if(!startMenu.contains(e.target)&&e.target!==startButton&&!startButton.contains(e.target))startMenu.classList.add("hidden")});
const clock=document.getElementById("clock");
function updateClock(){clock.textContent=new Intl.DateTimeFormat("pt-BR",{hour:"2-digit",minute:"2-digit"}).format(new Date())}
updateClock();setInterval(updateClock,15000);
const audio=document.getElementById("audio"),fileInput=document.getElementById("audio-file"),track=document.getElementById("track-name");
let currentUrl;
fileInput.addEventListener("change",()=>{
 const file=fileInput.files?.[0];if(!file)return;
 if(currentUrl)URL.revokeObjectURL(currentUrl);
 currentUrl=URL.createObjectURL(file);audio.src=currentUrl;track.textContent=file.name;audio.play().catch(()=>{});
});
