// 즉시 구매가
function toggleTextbox(checkbox) {
  const instantPrice_value = document
    .getElementById('instantPrice_value')
    .firstChild.data.replace(',', '')
    .slice(0, -1);
  const textbox_elem = document.getElementById('bid-price');
  textbox_elem.disabled = checkbox.checked ? true : false;
  if (textbox_elem.disabled) {
    textbox_elem.value = instantPrice_value;
  } else {
    textbox_elem.value = null;
    textbox_elem.focus();
  }
}

function onBid(product) {
  // 입찰하기
  const btnBid = document.getElementById('btnBid');

  btnBid.addEventListener('click', function (e) {
    e.preventDefault();
    const instantPrice_value = Number(
      document
        .getElementById('instantPrice_value')
        .firstChild.data.replace(',', '')
        .slice(0, -1)
    );
    const startPrice_value = Number(
      document
        .getElementById('startPrice_value')
        .firstChild.data.replace(',', '')
        .slice(0, -1)
    );
    const bidUnit_value = Number(
      document
        .getElementById('bidUnit_value')
        .firstChild.data.replace(',', '')
        .slice(0, -1)
    );
    const bid = Number(document.getElementById('bid-price').value);

    console.log(startPrice_value <= bid);
    console.log(bid % bidUnit_value == 0);
    console.log(instantPrice_value < bid);

    if (startPrice_value <= bid) {
      if (bid % bidUnit_value == 0) {
        if (instantPrice_value >= bid) {
          const memberId = localStorage.getItem('memberId');
          fetch('http://182.218.194.156:8080/order', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
              bid: bid,
              productId: productId,
              customerId: memberId,
            }),
          })
            .then(function (response) {
              return response.text();
            })
            .then(function (data) {
              console.log(data);
              sellerSend(product);
              //location.href = '/main/detail.html?id=' + productId;
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          alert('즉시 구매가를 넘었습니다.');
        }
      } else {
        alert('입찰 단위에 맞지 않습니다.');
      }
    } else {
      alert('입찰 가격이 시작가보다 낮습니다.');
    }
  });
}

// 판매자에게 알림 전송
function sellerSend(productInfo) {
  console.log(productInfo);

  data = {
    message: productInfo.data.name + '이(가) 입찰되었습니다.',
    type: 'SALES',
    receiverId: productInfo.data.sellerId,
  };
  stompClient.send('/app/notification/send', {}, JSON.stringify(data));
}
