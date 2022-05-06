const memberId = localStorage.getItem('memberId');
fetch('http://182.218.194.156:8080/order/sales?memberId=' + memberId, {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    const product = data.data;
    // 판매 현황
    salesAdd();

    function salesAdd() {
      let htmlData = '';
      const product = data.data;
      console.log(product);

      htmlData +=
        '<colgroup><col style="width: 20%" /><col style="width: 20%" />';
      htmlData +=
        '<col style="width: 20%" /><col style="width: 20%" /><col style="width: 20%" /></colgroup>';
      htmlData +=
        '<tr><th>상품명</th><th>낙찰가</th><th>경매상태</th><th>남은 마감시간</th><th>입찰현황</th></tr>';
      for (let i = 0; i < data.count; i++) {
        htmlData += '<tr><td>' + product[i].productName + '</td>';
        htmlData +=
          '<td id ="successBidPrice' +
          i +
          '">' +
          product[i].successBidPrice +
          '</td>';
        htmlData += '<td id="state' + i + '">' + product[i].state + '</td>';
        htmlData += '<td id="lastTime' + i + '" style="color: blue"></td>';
        htmlData +=
          '<td><button id="' +
          product[i].productId +
          '" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#bidStateModal" onClick="currentBidModal(this.id)">' +
          product[i].bidCnt +
          '</button></td></tr>';
      }
      $('#sales').html(htmlData);
    }

    // 남은 마감시간
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

    function salesList() {
      const product = data.data;
      for (let i = 0; i < data.count; i++) {
        const successBidPrice = product[i].successBidPrice;
        if (successBidPrice == null) {
          document.getElementById('lastTime' + i).innerHTML = remaindTime(
            product[i].endDate
          );
        } else {
          document.getElementById('lastTime' + i).innerHTML = '종료';
        }

        const transactionTime = remaindTime(product[i].endDate);
        if (successBidPrice !== null) {
          document.getElementById('state' + i).innerHTML = '낙찰완료';
        } else if (transactionTime !== '종료') {
          document.getElementById('state' + i).innerHTML = '경매중';
        } else if (transactionTime == '종료' && product[i].bidCnt == 0) {
          document.getElementById('state' + i).innerHTML = '유찰';
        } else if (transactionTime == '종료') {
          document.getElementById('state' + i).innerHTML = '경매종료';
        }
      }
    }
    setInterval(salesList, 1000);
  })
  .catch(console.log);
