function currentBidModal(
  productid,
  instantPrice,
  successBidderid,
  productname
) {
  fetch(
    'http://182.218.194.156:8080/order/sales/bid?page=1&per_page=12&productId=' +
      productid,
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
      sellerRoomCreate(productid, successBidderid);
      // 낙찰 완료된 상품 버튼 비활성화하기
      currentBidDisabled();
      function currentBidDisabled() {
        const product = data.data;
        const stateChk = document.getElementById('state' + productid).firstChild
          .data;
        for (let i = 0; i < data.count; i++) {
          console.log(instantPrice);

          const target = document.getElementById('successBid');
          if (stateChk == '낙찰완료' || instantPrice == product[i].bid) {
            target.disabled = true;
          } else {
            target.disabled = false;
          }
        }
      }

      // 입찰 현황
      const product = data.data;
      bidModalAdd();
      function bidModalAdd() {
        let htmlData = '';

        htmlData +=
          '<colgroup><col style="width: 10%"/><col style="width: 10%"/><col style="width: 20%"/><col style="width: 20%"/><col style="with: 40%"/></colgroup>';
        htmlData +=
          '<tr><th>선택</th><th>번호</th><th>입찰자</th><th>입찰가격</th><th>입찰일</th></tr>';
        for (let i = 0; i < data.count; i++) {
          const orderDate = product[i].orderDate.split('T');
          htmlData +=
            '<tr><td><input type="checkbox" name="checkBid" value="' +
            i +
            '"/></td>';
          htmlData += '<td>' + (i + 1) + '</td><td>';
          if (product[i].customerLoginId !== null) {
            htmlData += product[i].customerLoginId;
          } else {
            htmlData += '탈퇴한 회원';
          }

          htmlData +=
            '</td><td>' +
            product[i].bid +
            '</td><td>' +
            orderDate[0] +
            ' ' +
            orderDate[1] +
            '</td></tr>';
        }
        $('#currentBidModal').html(htmlData);

        $(document).ready(function () {
          $('input[type="checkbox"][name="checkBid"]').click(function () {
            if ($(this).prop('checked')) {
              $('input[type="checkbox"][name="checkBid"]').prop(
                'checked',
                false
              );
              $(this).prop('checked', true);
              const checkIdx = $(this).val();

              // 낙찰하기
              const successBid = document.getElementById('successBid');
              successBid.addEventListener('click', function (e) {
                const memberId = localStorage.getItem('memberId');

                fetch('http://182.218.194.156:8080/order/sales', {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                  },
                  body: JSON.stringify({
                    sellerId: memberId,
                    productId: productid,
                    bidderId: product[checkIdx].customerId,
                    bid: product[checkIdx].bid,
                  }),
                })
                  .then(function (response) {
                    return response.json();
                  })
                  .then(function (data) {
                    console.log(data);
                    customerSend(product[checkIdx].customerId, productname);
                    location.href = '/main/mypage.html';
                  })
                  .catch(console.log);
              });
            }
          });
        });
      }
    })
    .catch(console.log);
}

// 판매자 채팅방 생성
function sellerRoomCreate(productid, successBidderid) {
  const memberId = localStorage.getItem('memberId');
  const roomCreate = document.querySelector('#successChat');
  console.log(roomCreate);
  roomCreate.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('http://182.218.194.156:8080/chat/room', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        sellerId: memberId,
        customerId: successBidderid,
        productId: productid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        location.href = '/chat/chat.html';
      })
      .catch(console.log);
  });
}

// 낙찰자에게 알림 전송
function customerSend(receiverId, productname) {
  data = {
    message: productname + '이(가) 낙찰되었습니다.',
    type: 'PURCHASE',
    receiverId: receiverId,
  };
  stompClient.send('/app/notification/send', {}, JSON.stringify(data));
}
