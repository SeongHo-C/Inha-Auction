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
