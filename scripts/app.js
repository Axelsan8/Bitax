(() => {
"use strict";
const KEY="anima-red-viva-v02";
const emptyState=()=>({profile:{alias:"",intention:"",skills:"",needs:"",interests:"",availability:"",discover:false},pulse:[],projects:[]});
const cleanText=v=>typeof v==="string"?v:"";
function loadState(){
  try{
    const raw=JSON.parse(localStorage.getItem(KEY)||"null");
    if(!raw||typeof raw!=="object")return emptyState();
    const p=raw.profile&&typeof raw.profile==="object"?raw.profile:{};
    return {
      profile:{alias:cleanText(p.alias),intention:cleanText(p.intention),skills:cleanText(p.skills),needs:cleanText(p.needs),interests:cleanText(p.interests),availability:cleanText(p.availability),discover:p.discover===true},
      pulse:Array.isArray(raw.pulse)?raw.pulse.filter(x=>x&&typeof x==="object").slice(-100):[],
      projects:Array.isArray(raw.projects)?raw.projects.filter(x=>x&&typeof x==="object").slice(-100):[]
    };
  }catch{return emptyState();}
}
let state=loadState();
const view=document.getElementById("view");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function save(){
  try{localStorage.setItem(KEY,JSON.stringify(state));return true;}
  catch{showStorageWarning();return false;}
}
function showStorageWarning(){
  let n=document.getElementById("storage-warning");
  if(!n){n=document.createElement("div");n.id="storage-warning";n.className="notice";n.setAttribute("role","alert");document.querySelector("main").prepend(n);}
  n.textContent="No se pudieron guardar los cambios. Revisa el espacio disponible o la configuración de privacidad de tu navegador.";
}
const tabs=[...document.querySelectorAll("[data-tab]")];
function go(tab){
  tabs.forEach(b=>{
    const active=b.dataset.tab===tab;
    b.classList.toggle("active",active);
    b.setAttribute("aria-current",active?"page":"false");
  });
  document.querySelector(".hero")?.classList.toggle("is-hidden",tab!=="home");
  ({home,pulse,profile,harmonia,projects}[tab]||home)();
  document.querySelector(".tabs")?.scrollIntoView({block:"nearest",behavior:"smooth"});
}
function shell(kicker,title,desc,body){
  view.innerHTML='<div class="content"><div class="section-head"><div><div class="kicker">'+kicker+'</div><h2>'+title+'</h2><p>'+desc+'</p></div></div>'+body+'</div>';
}
function home(){
 const p=state.profile;
 shell("TU ESPACIO","Todo comienza contigo","No necesitas tener todo resuelto. Empieza por reconocer qué puedes aportar y qué te gustaría encontrar.",
 '<div class="grid"><article class="card"><div class="kicker">IDENTIDAD DINÁMICA</div><h3>'+(p.alias?esc(p.alias):"Tu espacio está por nacer")+'</h3><p>'+(p.intention?esc(p.intention):"Define una intención y comparte solo lo que quieras.")+'</p><div class="actions"><button class="secondary" data-go="profile">Editar mi perfil</button></div></article><article class="card"><div class="kicker">MI PULSO</div><div class="big-number">'+state.pulse.length+'</div><p>registros personales guardados en este dispositivo.</p><div class="actions"><button class="secondary" data-go="pulse">Registrar cómo estoy</button></div></article><article class="card"><div class="kicker">INICIATIVAS</div><div class="big-number">'+state.projects.length+'</div><p>proyectos que has creado en tu espacio.</p><div class="actions"><button class="secondary" data-go="projects">Ver proyectos</button></div></article><article class="card"><div class="kicker">HARMONIA</div><h3>Conexiones con sentido</h3><p>Explora cómo tus capacidades podrían responder a necesidades concretas.</p><div class="actions"><button class="secondary" data-go="harmonia">Explorar afinidades</button></div></article></div><div class="notice">Privado por diseño: por ahora, toda esta información permanece en este navegador. No hay comunidad compartida ni sincronización.</div>');
}
function profile(){
 const p=state.profile;
 shell("IDENTIDAD · CONSENTIMIENTO","Mi perfil","Describe tu intención y capacidades. El descubrimiento público está desactivado hasta que tú lo autorices.",
 '<form id="profile-form" class="card form-grid"><div class="field"><label>ALIAS</label><input name="alias" maxlength="50" value="'+esc(p.alias)+'" placeholder="¿Cómo quieres aparecer?"></div><div class="field"><label>DISPONIBILIDAD</label><input name="availability" maxlength="80" value="'+esc(p.availability)+'" placeholder="Ej. fines de semana"></div><div class="field full"><label>INTENCIÓN</label><textarea name="intention" maxlength="500" placeholder="¿Qué te mueve en este momento?">'+esc(p.intention)+'</textarea></div><div class="field"><label>CAPACIDADES</label><textarea name="skills" maxlength="1000" placeholder="Ej. danza, diseño, cocina">'+esc(p.skills)+'</textarea></div><div class="field"><label>NECESIDADES</label><textarea name="needs" maxlength="1000" placeholder="¿Qué apoyo o recurso buscas?">'+esc(p.needs)+'</textarea></div><div class="field full"><label>INTERESES</label><input name="interests" maxlength="500" value="'+esc(p.interests)+'" placeholder="Ej. arte, educación, naturaleza"></div><div class="field full"><label class="checkline"><input type="checkbox" name="discover" '+(p.discover?"checked":"")+'> En el futuro, autorizo que mi perfil básico pueda aparecer en espacios de descubrimiento comunitario. Esta opción no publica datos todavía.</label></div><div class="field full"><div class="notice">No incluyas datos íntimos, médicos, contraseñas ni información que no quieras conservar en este dispositivo.</div><div class="actions"><button class="primary">Guardar mi perfil</button></div></div></form>');
 document.getElementById("profile-form").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);state.profile=Object.fromEntries(["alias","availability","intention","skills","needs","interests"].map(k=>[k,f.get(k)||""]));state.profile.discover=f.has("discover");if(save())home();};
}
function pulse(){
 shell("BIO · EMO · OBSERVA","Mi pulso","Un registro personal, sin diagnósticos ni interpretación automática. Solo tú decides qué anotar.",
 '<form id="pulse-form" class="card form-grid"><div class="field"><label>¿CÓMO SIENTES TU ENERGÍA?</label><select name="energy"><option>En calma</option><option>En movimiento</option><option>Baja</option><option>Intensa</option><option>Prefiero no definirla</option></select></div><div class="field"><label>¿QUÉ NECESITAS HOY?</label><input name="need" maxlength="200" placeholder="Ej. descanso, movimiento, compañía"></div><div class="field full"><label>NOTA PRIVADA (OPCIONAL)</label><textarea name="note" maxlength="1000" placeholder="Una idea, sensación o reflexión..."></textarea></div><div class="field full"><button class="primary">Guardar en mi dispositivo</button></div></form><div class="card" style="margin-top:14px"><div class="kicker">REGISTROS RECIENTES</div>'+(state.pulse.length?state.pulse.slice().reverse().slice(0,8).map(x=>'<div class="item"><div><strong>'+esc(x.energy)+'</strong><p class="muted">'+esc(x.need)+' · '+esc(x.date?new Date(x.date).toLocaleString("es-MX"):"Fecha no disponible")+'</p><p>'+esc(x.note)+'</p></div></div>').join(""):'<div class="empty">Todavía no hay registros.</div>')+'</div>');
 document.getElementById("pulse-form").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);state.pulse.push({energy:f.get("energy"),need:f.get("need"),note:f.get("note"),date:new Date().toISOString()});if(save())pulse();};
}
function projects(){
 shell("CREACIÓN COLECTIVA","Proyectos vivos","Las iniciativas empiezan con una necesidad clara. En esta versión solo tú puedes ver y administrar tus proyectos.",
 '<form id="project-form" class="card form-grid"><div class="field full"><label>NOMBRE DEL PROYECTO</label><input name="name" maxlength="100" required placeholder="Ej. Encuentro de arte y movimiento"></div><div class="field"><label>¿QUÉ NECESITAS?</label><textarea name="needs" maxlength="1000" placeholder="Ej. espacio, difusión, música"></textarea></div><div class="field"><label>INTERESES / PROPÓSITO</label><textarea name="interests" maxlength="500" placeholder="Ej. arte, comunidad, movimiento"></textarea></div><div class="field full"><label>DISPONIBILIDAD</label><input name="availability" maxlength="100" placeholder="Ej. sábados por la tarde"></div><div class="field full"><button class="primary">Crear iniciativa</button></div></form><div class="grid" style="margin-top:15px">'+(state.projects.length?state.projects.map((p,i)=>'<article class="card"><div class="kicker">INICIATIVA · '+(i+1)+'</div><h3>'+esc(p.name)+'</h3><p><b>Necesidades:</b> '+esc(p.needs||"Por definir")+'</p><p><b>Propósito:</b> '+esc(p.interests||"Por definir")+'</p></article>').join(""):'<div class="empty" style="grid-column:1/-1">Tu primera iniciativa puede nacer aquí.</div>')+'</div>');
 document.getElementById("project-form").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);state.projects.push(Object.fromEntries(["name","needs","interests","availability"].map(k=>[k,f.get(k)||""])));if(save())projects();};
}
function harmonia(){
 const p=state.profile;
 const html=state.projects.map((pr,i)=>{const m=Harmonia.match(p,pr);return '<article class="card"><div class="kicker">AFINIDAD EXPERIMENTAL · PROYECTO '+(i+1)+'</div><h3>'+esc(pr.name)+'</h3><div class="score">'+m.score+'%</div><p>Coincidencia orientativa según los criterios que sí tienen información.</p><p><b>Necesidades cubiertas:</b> '+esc(m.covered.join(", ")||"Aún no identificadas")+'</p><p><b>Por cubrir:</b> '+esc(m.missing.join(", ")||"Ninguna según coincidencia literal")+'</p><p><b>Intereses en común:</b> '+esc(m.shared.join(", ")||"No detectados")+'</p><p><b>Disponibilidad:</b> '+(m.availability?"Coincide":"Sin coincidencia confirmada")+'</p></article>';}).join("");
 shell("HARMONIA · MOTOR EXPERIMENTAL","Conectar para crear","HARMONIA compara palabras declaradas. No evalúa el valor de nadie ni representa inteligencia artificial avanzada.",
 '<div class="notice">El porcentaje es una heurística simple basada en coincidencias de texto y disponibilidad. Puede pasar por alto sinónimos o contexto. No es una recomendación validada.</div>'+(html?'<div class="grid">'+html+'</div>':'<div class="empty">Crea un proyecto y completa tus capacidades para explorar afinidades.</div>'));
}
tabs.forEach(b=>{b.setAttribute("aria-current",b.classList.contains("active")?"page":"false");b.addEventListener("click",()=>go(b.dataset.tab));});
document.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)go(b.dataset.go);});
home();
})();