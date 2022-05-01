fetch('http://182.218.194.156:8080/product?page=1&per_page=12')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.data);
    console.log(data.count);

    function remaindTime(endDate) {
      console.log(endDate);
      const date = endDate.split('T');
      const day = date[0].split('-');
      const time = date[1].split(':');

      var now = new Date();
      var end = new Date(day[0], day[1], day[2], time[0], time[1], time[2]);

      var nt = now.getTime();
      var et = end.getTime();
      console.log(et - nt);

      if (nt < et) {
        //현재시간이 오픈시간보다 이르면 오픈시간까지의 남은 시간을 구한다.
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
      }
    }
    // setInterval(remaindTime, 1000); //1초마다 검사를 해주면 실시간으로 시간을 알 수 있다.

    //const product = Array.from(data);
    function htmlAdd() {
      let testHtml = '';
      const product = data.data;
      for (let i = 0; i < product.length; i++) {
        let htmlData = '';
        htmlData +=
          '<div class="col mb-5"><a href="/main/detail.html"><div class="card h-100">';
        htmlData +=
          '<img class="card-img-top card-size" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."/>';
        htmlData += '<div class="card-body text-center"><div class="">';
        htmlData += '<h5 class="fw-border">' + product[i].name + '</h5>';
        htmlData +=
          '<h5>' +
          product[i].startPrice.toLocaleString() +
          '원</h5><h5>입찰 5명</h5></div></div>';
        htmlData +=
          '<div class ="card-footer bg-transparent ms-2"><div class="me-auto">';
        htmlData +=
          '<h6 class="mt-2"> 판매자 아이디: ' +
          product[i].sellerId +
          '</h6><h6> 마감시간: ' +
          remaindTime(product[i].endDate) +
          '</h6>';
        htmlData += '</div></div></div></a></div>';
        // $('#productBox').append(htmlData);
        testHtml += htmlData;
      }
      $('#productBox').html(testHtml);
    }

    setInterval(htmlAdd, 1000); //1초마다 검사를 해주면 실시간으로 시간을 알 수 있다.
  })
  .catch(function (error) {
    console.log(error);
  });
