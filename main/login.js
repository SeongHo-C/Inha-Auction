const accessToken = localStorage.getItem('token');
console.log(accessToken);
const id = localStorage.getItem('id');
console.log(id);
if (accessToken !== null) {
  var login = document.getElementById('login');
  login.className = 'nav-link disabled';
  login.innerHTML = `${id}님`;

  var join = document.getElementById('join');
  join.innerHTML = '로그아웃';
  join.href = '/main/search.html';
} else {
}

// 로그아웃
const logout = document.querySelector('#join');
logout.addEventListener('click', () => {
  localStorage.clear();
  login.className = 'nav-link';
  login.innerHTML = `로그인`;

  join.innerHTML = '회원가입';
});