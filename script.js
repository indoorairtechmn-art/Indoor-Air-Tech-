const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.site-nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');}));
document.querySelector('#year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelector('#service-form')?.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const subject=encodeURIComponent(`Indoor Air Tech service request: ${data.get('service')}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')||'Not provided'}\nService address: ${data.get('address')||'Not provided'}\nService needed: ${data.get('service')}\n\nProblem:\n${data.get('message')}`);window.location.href=`mailto:IndoorAirTechMN@gmail.com?subject=${subject}&body=${body}`;});
