/* HARMONIA 0.2 — sugerencias explicables, no evaluación de personas. */
window.Harmonia = (() => {
  const norm = s => (s || "").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();
  const tokens = s => norm(s).split(/[,;\n]/).map(x=>x.trim()).filter(Boolean);
  function match(profile, project) {
    const skills = tokens(profile.skills);
    const needs = tokens(project.needs);
    const covered = needs.filter(n => skills.some(s => s.includes(n) || n.includes(s)));
    const interests = tokens(profile.interests);
    const shared = interests.filter(i => tokens(project.interests).some(p=>p.includes(i)||i.includes(p)));
    const availability = profile.availability && project.availability && norm(profile.availability)===norm(project.availability);
    const coverage = needs.length ? covered.length/needs.length : 0;
    const score = Math.round(100*(coverage*.7 + (shared.length?0.2:0) + (availability?0.1:0)));
    return {score,covered,missing:needs.filter(n=>!covered.includes(n)),shared,availability};
  }
  return {match};
})();