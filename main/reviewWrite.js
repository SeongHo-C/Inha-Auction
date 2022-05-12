function reviewModal(productId, sellerId, productName) {
  const grade = document.getElementsByName('grade').value;
  const content = document.getElementById('reviewText').value;
  const reviewProduct = document.getElementById('product-name');
  reviewProduct.value = productName;

  const registration = document.getElementById('registration');
  registration.addEventListener('click', function (e) {
    $.ajax({
      url: 'http://182.218.194.156:8080/review',
      async: true, // false 일 경우 동기 요청으로 변경
      type: 'POST',
      data: {
        productId: productId,
        sellerId: sellerId,
        writerId: memberId,
        grade: grade,
        content: content,
      }, // 전송할 데이터
      dataType: 'text', // xml, json, script, html
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        );
      }, // 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
      success: function (data) {
        console.log(data);
      }, // 요청 완료 시
      error: function (jqXHR) {}, // 요청 실패.
      complete: function (jqXHR) {}, // 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
  });
}
