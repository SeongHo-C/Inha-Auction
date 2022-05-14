const url = location.href;
const productIdSplit = url.split('=');
const productId = productIdSplit[1];

const productIdVal = document.getElementById('product-num');
console.log(productIdVal);
productIdVal.value = productId;

const writer = document.getElementById('writerId');
writer.value = id;

// 이전 페이지로 돌아가기
function back() {
  history.back();
}

const registrationBtn = document.getElementById('notifyInfo');
const memberId = localStorage.getItem('memberId');
registrationBtn.addEventListener('submit', function (e) {
  e.preventDefault();

  let formData = new FormData();
  formData.append('productId', productId);
  formData.append('title', document.getElementById('title').value);
  formData.append('writerId', memberId);
  formData.append('content', document.getElementById('notifyContent').value);
  for (let i = 0; i < filesArr.length; i++) {
    if (!filesArr[i].is_delete) {
      formData.append('files', filesArr[i]);
    }
  }

  fetch('http://182.218.194.156:8080/report', {
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.data);
      back();
    })
    .catch(console.log);
});
