const url = location.href;
const urlSplit = url.split('?');
const productSeller = urlSplit[1];
const productSellerDivision = productSeller.split('&');
const product = productSellerDivision[0].split('=');
const seller = productSellerDivision[1].split('=');
const productId = product[1];
const sellerId = seller[1];

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
  console.log(productId);
  formData.append('title', document.getElementById('title').value);
  console.log(document.getElementById('title').value);
  formData.append('writerId', memberId);
  console.log(memberId);
  formData.append('reportedId', sellerId);
  console.log(sellerId);

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
