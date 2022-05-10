// 비밀번호 변경
const pwChange = document.getElementById('pwChange');
pwChange.addEventListener('click', function (e) {
  e.preventDefault();

  const memberId = localStorage.getItem('memberId');
  let currentPassword = document.getElementById('userPw').value;
  let newPassword = document.getElementById('newPw').value;
  let newPwCheck = document.getElementById('newPwCheck').value;
  console.log(currentPassword);
  console.log(newPassword);
  if (newPassword == newPwCheck) {
    fetch('http://182.218.194.156:8080/member/password', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        id: memberId,
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errorCode == 400) {
          alert(data.errorMessage);
        } else {
          console.log(data);
          document.getElementById('userPw').value = null;
          document.getElementById('newPw').value = null;
          document.getElementById('newPwCheck').value = null;
          alert(data.data);
        }
      })
      .catch(console.log);
  } else {
    alert('변경 비밀번호가 일치하지 않습니다.');
  }
});

// 회원정보 수정
const changeInfo = document.getElementById('changeInfo');
changeInfo.addEventListener('click', function (e) {
  e.preventDefault();

  const memberId = localStorage.getItem('memberId');
  const email = document.getElementById('userEmail').value;
  const address = document.getElementById('addr').value;
  const phone = document.getElementById('phone').value;

  fetch('http://182.218.194.156:8080/member/' + memberId, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify({
      email: email,
      address: address,
      phone: phone,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.data);
    })
    .catch(console.log);
});

// 기존의 회원 정보
function useData(data) {
  console.log(data);
  const product = data.data;
  const currentEmail = document.getElementById('userEmail');
  const currentAddr = document.getElementById('addr');
  const currentPhone = document.getElementById('phone');
  currentEmail.value = product.email;
  currentAddr.value = product.address;
  currentPhone.value = product.phone;
}
