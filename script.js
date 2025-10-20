// Lightweight interactions: nav toggle and date
document.addEventListener('DOMContentLoaded', function(){
  const nav = document.getElementById('nav');
  const btn = document.getElementById('nav-toggle');
  if(btn){
    btn.addEventListener('click', ()=>{
      if(nav.style.display === 'block') nav.style.display = '';
      else nav.style.display = 'block';
    });
  }
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
    });
  });
});