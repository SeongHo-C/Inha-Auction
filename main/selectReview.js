// 상점후기 조회
const selectReview = document.getElementById('selectReviewBtn');
console.log(selectReview);
selectReview.addEventListener('click', function (e) {
  e.preventDefault();

  fetch('http://182.218.194.156:8080/review/' + memberId, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      reviewAdd();
      function reviewAdd() {
        let htmlData = '';
        const product = data.data;

        htmlData +=
          '<colgroup><col style="width: 10%" /><col style="width: 20%" /><col style="width: 30%" /><col style="width: 10%" /><col style="width: 20%" /><col style="width: 10%" /></colgroup>';
        htmlData +=
          '<tr><th>번호</th><th>상품명</th><th>구매후기</th><th>작성자</th><th>작성일</th><th>평점</th></tr>';
        for (let i = 0; i < data.count; i++) {
          const writeTime = product[i].writeTime.split('T');
          htmlData += '<tr><td>' + (i + 1) + '</td>';
          htmlData +=
            '<td>' +
            product[i].productName +
            '</td><td>' +
            product[i].content +
            '</td>';
          htmlData +=
            '<td>' +
            product[i].writerLoginId +
            '</td><td>' +
            writeTime[0] +
            ' ' +
            writeTime[1] +
            '</td>';
          htmlData += '<td>' + product[i].grade + '</td></tr>';
        }
        $('#selectReview').html(htmlData);
      }
    })
    .catch(console.log);
});
