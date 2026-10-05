const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
navToggle?.addEventListener('click', () => nav.classList.toggle('open'));

const dialog = document.querySelector('#paymentDialog');
const selectedPlanText = document.querySelector('#selectedPlanText');
const planSelect = document.querySelector('#planSelect');

document.querySelectorAll('.select-plan').forEach((button) => {
  button.addEventListener('click', () => {
    const plan = button.dataset.plan;
    const price = Number(button.dataset.price).toLocaleString('ko-KR');
    if (planSelect) {
      const matching = [...planSelect.options].find(o => o.textContent.includes(plan.split(' ')[0]));
      if (matching) planSelect.value = matching.value;
    }
    selectedPlanText.textContent = `${plan} · ${price}원`;
    dialog.showModal();
  });
});

document.querySelector('#signupForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  selectedPlanText.textContent = `${formData.get('plan')} 신청 정보가 확인되었습니다.`;
  dialog.showModal();
});
