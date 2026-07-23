const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const serviceForm = document.getElementById('service-form');
serviceForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(serviceForm);
  const subject = encodeURIComponent(`Indoor Air Tech service request — ${data.get('service')}`);
  const body = encodeURIComponent(
`Name: ${data.get('name')}
Phone: ${data.get('phone')}
Email: ${data.get('email') || 'Not provided'}
Address: ${data.get('address') || 'Not provided'}
Service: ${data.get('service')}

Problem description:
${data.get('message')}`
  );
  window.location.href = `mailto:IndoorAirTechMN@gmail.com?subject=${subject}&body=${body}`;
});

// Add a secure Stripe Payment Link or Square Checkout URL below when the account is ready.
const SECURE_PAYMENT_URL = '';
const paymentForm = document.getElementById('payment-form');
const paymentStatus = document.getElementById('payment-status');
paymentForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(paymentForm);
  const invoice = String(data.get('invoice')).trim();
  const amount = String(data.get('amount')).trim();
  if (!SECURE_PAYMENT_URL) {
    paymentStatus.textContent = `Payment setup is not connected yet. Invoice ${invoice} for $${amount} is ready to be routed after a Stripe or Square payment link is added.`;
    return;
  }
  const url = new URL(SECURE_PAYMENT_URL);
  url.searchParams.set('client_reference_id', invoice);
  window.location.assign(url.toString());
});
