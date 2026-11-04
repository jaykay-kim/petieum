const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('show'));
}

document.querySelectorAll('.detail-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.service-card');
    card.classList.toggle('open');
    button.textContent = card.classList.contains('open') ? '접기' : '상세보기';
  });
});

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => chip.classList.toggle('active'));
});

const modal = document.getElementById('signupModal');
const selectedPlan = document.getElementById('selectedPlan');
document.querySelectorAll('.open-modal').forEach((button) => {
  button.addEventListener('click', () => {
    if (selectedPlan) selectedPlan.value = button.dataset.plan || '베타 신청';
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  });
});
const closeBtn = document.querySelector('.modal-close');
if (closeBtn) closeBtn.addEventListener('click', () => closeModal());
if (modal) modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.signup-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('베타 신청 데모입니다. 실제 신청 기능은 정식 오픈 시 연결됩니다.');
    closeModal();
  });
});


// 4P update: launch the existing Google login window without changing Supabase auth.
document.querySelectorAll('.auth-open-trigger').forEach(button => {
  button.addEventListener('click', () => {
    const launcher = document.getElementById('petieum-auth-launcher');
    if (launcher) launcher.click();
    else alert('로그인 화면을 불러오지 못했습니다. 페이지를 새로고침한 후 다시 시도해 주세요.');
  });
});
