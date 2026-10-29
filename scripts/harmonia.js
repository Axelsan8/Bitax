/* HARMONIA 0.2 — coincidencias explicables, no evaluación de personas. */
window.Harmonia=(()=>{
 const norm=s=>(s||"").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();
 const tokens=s=>norm(s).split(/[,;\n]/).map(x=>x.trim()).filter(Boolean);
 function match(profile,project){
  const skills=tokens(profile.skills),needs=tokens(project.needs);
  const covered=needs.filter(n=>skills.some(s=>s===n||s.includes(n)||n.includes(s)));
  const interests=tokens(profile.interests),projectInterests=tokens(project.interests);
  const shared=interests.filter(i=>projectInterests.some(p=>p===i||p.includes(i)||i.includes(p)));
  const hasNeeds=needs.length>0,hasInterests=interests.length>0&&projectInterests.length>0;
  const hasAvailability=Boolean(profile.availability&&project.availability);
  const criteria=[];
  if(hasNeeds)criteria.push({weight:.7,value:covered.length/needs.length});
  if(hasInterests)criteria.push({weight:.2,value:shared.length?1:0});
  if(hasAvailability)criteria.push({weight:.1,value:norm(profile.availability)===norm(project.availability)?1:0});
  const totalWeight=criteria.reduce((sum,c)=>sum+c.weight,0);
  const score=totalWeight?Math.round(100*criteria.reduce((sum,c)=>sum+c.weight*c.value,0)/totalWeight):0;
  return{score,covered,missing:needs.filter(n=>!covered.includes(n)),shared,availability:hasAvailability&&norm(profile.availability)===norm(project.availability)};
 }
 return{match};
})();