function currentBidModal(id) {
  fetch(
    'http://182.218.194.156:8080/order/sales/bid?page=1&per_page=12&productId=' +
      id,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // 입찰 현황
      bidModalAdd();
      function bidModalAdd() {
        let htmlData = '';
        const product = data.data;

        htmlData +=
          '<colgroup><col style="width: 10%"/><col style="width: 10%"/><col style="width: 20%"/><col style="width: 20%"/><col style="with: 40%"/></colgroup>';
        htmlData +=
          '<tr><th>선택</th><th>번호</th><th>입찰자</th><th>입찰가격</th><th>입찰일</th></tr>';
        for (let i = 0; i < data.count; i++) {
          const orderDate = product[i].orderDate.split('T');
          htmlData +=
            '<tr><td><input type="checkbox" name="checkBid" value="' +
            (i + 1) +
            '" onclick="checkOne(this)"/></td>';
          htmlData +=
            '<td>' +
            (i + 1) +
            '</td><td>' +
            product[i].customerLoginId +
            '</td>';
          htmlData +=
            '<td>' +
            product[i].bid +
            '</td><td>' +
            orderDate[0] +
            ' ' +
            orderDate[1] +
            '</td></tr>';
        }
        $('#currentBidModal').html(htmlData);
      }
    })
    .catch(console.log);
}

// 체크박스 하나만 선택
function checkOne(element) {
  const checkboxes = document.getElementsByName('checkBid');
  checkboxes.forEach((cb) => {
    cb.checked = false;
  });
  element.checked = true;
}
