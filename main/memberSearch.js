const userId = localStorage.getItem('id');
fetch('http://182.218.194.156:8080/auth/' + userId, {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    useData(data);
    userAdd();
    function userAdd() {
      const product = data.data;
      let htmlData = '';
      htmlData += '<tr><th>이름</th><td>' + product.name + '</td></tr>';
      htmlData += '<tr><th>학과명</th><td>' + product.department + '</td></tr>';
      htmlData += '<tr><th>아이디</th><td>' + product.loginId + '</td></tr>';
      $('#userInfo').html(htmlData);
    }
  })
  .catch(console.log);

// // 내부 함수를 외부에서 사용하는 방법
// function useData(data) {
//   console.log(data);
// }
