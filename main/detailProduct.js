const url = location.href;
const productIdSplit = url.split('=');
const productId = productIdSplit[1];

fetch('http://182.218.194.156:8080/product/' + productId)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    onBid(data);
    roomsCreate(data);

    // 버튼 비활성화
    btnDisabled();

    function btnDisabled() {
      const product = data.data;
      const target = document.getElementById('Bid');
      const memberState = localStorage.getItem('memberState');
      console.log(memberState);
      if (
        product.successBid !== null ||
        product.sellerId == id ||
        memberState == 'ROLE_ANONYMOUS' ||
        memberState == null
      ) {
        target.disabled = true;
      }
    }

    // 상품명 추가하기
    productNameAdd(data);

    // 사진 추가하기
    imageAdd();

    function imageAdd() {
      let htmlData = '';
      const product = data.data;
      htmlData += '<div class="carousel-item active">';
      htmlData +=
        '<img src="http://182.218.194.156:8080/image/product-' +
        productId +
        '-0.png?type=product" class="d-block w-100 detail-image-size" alt="..."/></div>';

      for (let i = 1; i < product.imgCnt; i++) {
        htmlData += '<div class="carousel-item">';
        htmlData +=
          '<img src="http://182.218.194.156:8080/image/product-' +
          productId +
          '-' +
          i +
          '.png?type=product" class="d-block w-100 detail-image-size" alt="..."/></div>';
      }
      $('#carouselInner').html(htmlData);
    }

    // 상품정보 추가하기
    productAdd();

    function productAdd() {
      let htmlData = '';
      const product = data.data;
      const endTime = product.endDate.split('T');
      const successBid = product.successBid;
      htmlData +=
        '<colgroup><col style="width: 30%" /><col style="width: 20%" /><col style="width: 50%" /></colgroup>';
      htmlData +=
        '<thead><tr><td>시작가</td><td id="startPrice_value">' +
        product.startPrice.toLocaleString() +
        '원</td>';
      htmlData +=
        '<td id="time" style="color: blue;"><button class="alarmBtn"><i class="fa-solid fa-stopwatch"></i></button>';

      if (successBid == null) {
        htmlData += '남은시간: ' + remaindTime(product.endDate);
      } else {
        htmlData += '남은시간: ' + '종료';
      }
      htmlData +=
        '</td></tr></thead><tbody"><tr><td>상품번호</td><td>' +
        product.id +
        '</td>';
      htmlData +=
        '<td><a href="/main/notify.html?id=' +
        product.id +
        '&sellerId=' +
        product.sellerId +
        '"><button type="button" style="color: white; background-color: gray; border: none">신고</button></a></td></tr>';
      htmlData +=
        '<tr><td>마감기한</td><td colspan="2">' +
        endTime[0] +
        ' ' +
        endTime[1] +
        '</td></tr>';
      htmlData +=
        '<tr><td>입찰단위</td><td id="bidUnit_value">' +
        product.bidUnit.toLocaleString() +
        '원</td></tr>';
      htmlData +=
        '<tr><td>즉시구매가</td><td id="instantPrice_value">' +
        product.instantPrice.toLocaleString() +
        '원</td></tr>';
      htmlData += '<tr><td>입찰 수</td><td>' + product.bidderCnt + '</td></tr>';
      htmlData +=
        '<tr><td>판매자 ID</td><td>' +
        product.sellerLoginId +
        '</td></tr></tbody>';
      $('#detailInfo').html(htmlData);
    }

    // 시간 계산하기
    function remaindTime(endDate) {
      var xmlHttpRequest;
      if (window.XMLHttpRequest) {
        xmlHttpRequest = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xmlHttpRequest = new ActiveXObject('Microsoft.XMLHTTP');
      } else {
        return;
      }
      xmlHttpRequest.open('HEAD', window.location.href.toString(), false);
      xmlHttpRequest.setRequestHeader('ContentType', 'text/html');
      xmlHttpRequest.send('');

      var serverDate = xmlHttpRequest.getResponseHeader('Date');
      var now = new Date(serverDate);
      var end = new Date(endDate);

      var nt = now.getTime();
      var et = end.getTime();

      if (nt < et) {
        sec = parseInt(et - nt) / 1000;
        days = parseInt(sec / 60 / 60 / 24);
        sec = sec - days * 60 * 60 * 24;
        hour = parseInt(sec / 60 / 60);
        sec = sec - hour * 60 * 60;
        min = parseInt(sec / 60);
        sec = parseInt(sec - min * 60);

        if (hour < 10) {
          hour = '0' + hour;
        }
        if (min < 10) {
          min = '0' + min;
        }
        if (sec < 10) {
          sec = '0' + sec;
        }
        return days + '일 ' + hour + '시간 ' + min + '분 ' + sec + '초';
      } else {
        return '종료';
      }
    }

    function timeAdd() {
      const product = data.data;
      const successBid = product.successBid;
      if (successBid == null) {
        document.getElementById('time').innerHTML =
          '<button class="alarmBtn"><i class="fa-solid fa-stopwatch"></i></button>남은시간: ' +
          remaindTime(product.endDate);
      } else {
        document.getElementById('time').innerHTML =
          '<button class="alarmBtn"><i class="fa-solid fa-stopwatch"></i></button>남은시간: ' +
          '종료';
      }
    }
    setInterval(timeAdd, 1000);

    // 상품설명
    contentAdd();
    function contentAdd() {
      let htmlData = '';
      const product = data.data;
      htmlData +=
        '<h3><strong>상품설명</strong></h3><hr><textarea style="width: 100%; height: auto; min-height: 200px; padding: 10px;" readonly>' +
        product.content +
        '</textarea>';

      $('#productContent').html(htmlData);
    }
  })
  .catch(console.log);

// 채팅방 생성
function roomsCreate(data) {
  const product = data.data;
  const customerId = localStorage.getItem('memberId');

  const roomCreate = document.querySelector('#roomCreate');
  roomCreate.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('http://182.218.194.156:8080/chat/room', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        sellerId: product.sellerId,
        customerId: customerId,
        productId: product.id,
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

function productNameAdd(data) {
  let htmlData = '';
  const product = data.data;

  htmlData += product.name;
  $('#topProductName').html(htmlData);
}
