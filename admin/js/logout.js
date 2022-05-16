const logoutBtn = document.getElementById('logoutBtn');
console.log(logoutBtn);
logoutBtn.addEventListener('click', (e) => {
  localStorage.clear();
  location.href = '/member/login.html';
  alert('로그아웃 되었습니다.');
});
