// Small interactions: navbar shrink, smooth scroll, contact validation, set year
document.addEventListener('DOMContentLoaded', function () {
  const nav = document.getElementById('mainNav');
  const year = document.getElementById('year');

  // set year
  if(year) year.textContent = new Date().getFullYear();

  // navbar shrink on scroll
  function onScroll(){
    if(window.scrollY > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(!href || href === '#') return;
      if(href.startsWith('#')){
        e.preventDefault();
        const t = document.querySelector(href);
        if(t){
          const top = t.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        // collapse navbar for mobile
        const bsCollapse = document.querySelector('.navbar-collapse');
        if(bsCollapse && bsCollapse.classList.contains('show')) new bootstrap.Collapse(bsCollapse).toggle();
      }
    });
  });

  // contact form simple front-end validation/demo
  const form = document.getElementById('contactForm');
  // Inisialisasi Bootstrap Modal
  const successModal = new bootstrap.Modal(document.getElementById('successModal')); 

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const msg = document.getElementById('message');
      let valid = true;
      [name,email,msg].forEach(el=>{
        if(!el.value || !el.value.trim()){ el.classList.add('is-invalid'); valid=false; } else el.classList.remove('is-invalid');
      });
      const emailPattern = /\S+@\S+\.\S+/;
      if(email.value && !emailPattern.test(email.value)){ email.classList.add('is-invalid'); valid=false; }
      if(!valid) return;

      const btn = form.querySelector('button[type="submit"]');
      const txt = btn.textContent;
      btn.disabled = true; btn.textContent = 'Sending...';
      
      // Simulasi pengiriman data
      setTimeout(()=>{
        btn.disabled = false; 
        btn.textContent = txt; 
        
        form.reset();
        // Hapus kelas validasi setelah reset
        [name, email, msg].forEach(el => el.classList.remove('is-invalid')); 
        
        // Tampilkan Bootstrap Modal yang cantik
        successModal.show();
        
      }, 900);
    });
  }
  

});