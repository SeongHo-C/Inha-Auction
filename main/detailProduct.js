const url = location.href;
const productIdSplit = url.split('=');
const productId = productIdSplit[1];

fetch('http://182.218.194.156:8080/product/' + productId)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    // detail.html에서 사용
    const product = data.data;

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
      htmlData +=
        '<colgroup><col style="width: 20%" /><col style="width: 20%" /><col style="width: 60%" /></colgroup>';
      htmlData +=
        '<thead><tr><th>시작가</th><td>' + product.startPrice + '원</td>';
      htmlData += '<td id="time" style="color: blue"></td></tr></thead>';
      htmlData += '<tbody"><tr><th>상품번호</th><td>' + product.id + '</td>';
      htmlData +=
        '<td><a href="/main/notify.html"><button type="button">신고</button></a></td></tr>';
      htmlData +=
        '<tr><th>마감기한</th><td colspan="2">' +
        endTime[0] +
        ' ' +
        endTime[1] +
        '</td></tr>';
      htmlData += '<tr><th>입찰단위</th><td>' + product.bidUnit + '</td></tr>';
      htmlData +=
        '<tr><th>즉시구매가</th><td id="instantPrice_value">' +
        product.instantPrice +
        '</td></tr>';
      htmlData += '<tr><th>입찰 수</th><td>' + product.bidderCnt + '</td></tr>';
      htmlData +=
        '<tr><th>판매자 ID</th><td>' +
        product.sellerId +
        '</td><td><input type="button" value="판매자 거래내역"/></td></tr></tbody>';
      $('#detailInfo').html(htmlData);
    }

    function remaindTime(endDate) {
      var now = new Date();
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
      document.getElementById('time').innerHTML =
        '남은시간: ' + remaindTime(product.endDate);
    }
    setInterval(timeAdd, 1000);

    // 상품설명
    contentAdd();
    function contentAdd() {
      let htmlData = '';
      const product = data.data;
      htmlData +=
        '<h2>상품설명</h2><hr><textarea style="width: 100%; height: auto; min-height: 200px; padding: 10px;" readonly>' +
        product.content +
        '</textarea>';

      $('#productContent').html(htmlData);
    }
  })
  .catch(console.log);
