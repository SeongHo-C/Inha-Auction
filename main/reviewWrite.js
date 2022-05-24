function reviewModal(productId, sellerId, productName) {
  const reviewProduct = document.getElementById('product-name');
  reviewProduct.value = productName;

  $('#registerBtn')
    .unbind('click')
    .bind('click', function (e) {
      e.preventDefault();

      const grade_length = document.getElementsByName('grade').length;
      let grade;
      for (let i = 0; i < grade_length; i++) {
        if (document.getElementsByName('grade')[i].checked == true) {
          grade = document.getElementsByName('grade')[i].value;
        }
      }
      const content = document.getElementById('reviewText').value;
      console.log(content);

      console.log(productId, sellerId, memberId, grade, content);
      fetch('http://182.218.194.156:8080/review', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          productId: productId,
          sellerId: sellerId,
          writerId: memberId,
          grade: grade,
          content: content,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          location.href = '/main/mypage.html';
        })
        .catch(console.log);
    });
}
