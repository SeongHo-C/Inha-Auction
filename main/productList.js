fetch('http://182.218.194.156:8080/product?page=1&per_page=12')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.data);
    console.log(data.count);

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

    function htmlAdd() {
      let testHtml = '';
      const product = data.data;
      for (let i = 0; i < product.length; i++) {
        let htmlData = '';
        htmlData +=
          '<div class="col mb-5"><a href="/main/detail.html?id=' +
          product[i].id +
          '"><div class="card h-100">';
        htmlData +=
          '<img class="card-img-top card-size" src="http://182.218.194.156:8080/image/product-' +
          product[i].id +
          '-0.png?type=product" alt="..."/>';
        htmlData += '<div class="card-body text-center"><div class="">';
        htmlData += '<h5 class="fw-border">' + product[i].name + '</h5>';
        htmlData +=
          '<h5>' +
          product[i].startPrice.toLocaleString() +
          '원</h5><h5>입찰 5명</h5></div></div>';
        htmlData +=
          '<div class ="card-footer bg-transparent ms-1"><div class="me-auto">';
        htmlData +=
          '<h6 class="mt-2"> 판매자아이디: ' +
          product[i].sellerId +
          '</h6><h6 id="endTime' +
          i +
          '"> 마감시간: 0일 00시간 00분 00초</h6>';
        htmlData += '</div></div></div></a></div>';

        testHtml += htmlData;
      }
      $('#productBox').html(testHtml);
    }
    htmlAdd();

    // 마감 시간
    function timeChange() {
      const product = data.data;
      for (let i = 0; i < product.length; i++) {
        document.getElementById('endTime' + i).innerHTML =
          '남은시간: ' + remaindTime(product[i].endDate);
      }
    }
    setInterval(timeChange, 1000);
  })
  .catch(function (error) {
    console.log(error);
  });
