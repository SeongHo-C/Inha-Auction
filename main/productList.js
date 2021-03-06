const search = document.querySelector('#search');
search.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') {
    const searchVal = search.value;
    localStorage.setItem('search', searchVal);
    location.reload();
  }
});

// 카테고리
let categoryid = '';
let categoryname = '';
const categoryPath = document.querySelector('#categoryPath');

function categoryId(clickedId, clickedName) {
  categoryid = clickedId;
  categoryname = clickedName;
  localStorage.setItem('category', clickedName);
  location.reload();
}
const searchValue = localStorage.getItem('search') || '';
search.value = searchValue;
const categoryValue = localStorage.getItem('category') || '';
console.log(categoryValue);
if (categoryValue !== '') {
  fetch(
    `http://182.218.194.156:8080/product?page=1&per_page=50&keyword=${searchValue}&categoryName=${categoryValue}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      htmlAdd(data);
    })
    .catch(console.log);

  categoryPath.value = categoryValue;
} else {
  fetch(
    `http://182.218.194.156:8080/product?page=1&per_page=70&keyword=${searchValue}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      htmlAdd(data);
    })
    .catch(console.log);
}

function remaindTime(endDate) {
  // 서버 시간
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

function htmlAdd(data) {
  let testHtml = '';
  const product = data.data;

  for (let i = 0; i < data.count; i++) {
    const successBid = product[i].successBid || '';

    let htmlData = '';
    htmlData +=
      '<div class="col mb-7"><a href="/main/detail.html?id=' +
      product[i].id +
      '"><div class="card h-100 px-2 py-2">';
    htmlData +=
      '<img class="card-img-top card-size" src="http://182.218.194.156:8080/image/product-' +
      product[i].id +
      '-0.png?type=product" alt="..."/>';
    htmlData += '<div class="card-body"><div class="">';
    htmlData +=
      '<h6 class="fw-border"><strong>' + product[i].name + '</strong></h6>';
    htmlData +=
      '<h6 style="color: #AE0000"><strong>' +
      product[i].startPrice.toLocaleString() +
      '</strong>원</h6><h6>입찰 ' +
      product[i].bidderCnt +
      '명</h6></div></div>';
    htmlData +=
      '<div class ="card-footer bg-transparent ms-1"><div class="me-auto">';
    htmlData +=
      '<h6 class="mt-2"> 판매자아이디: ' +
      product[i].sellerLoginId +
      '</h6><h6 style="color: blue;" id="endTime' +
      product[i].id +
      '"><button class="alarmBtn"><i class="fa-solid fa-stopwatch"></i></button>';

    if (successBid == '') {
      htmlData += ' ' + remaindTime(product[i].endDate);
    } else {
      htmlData += ' ' + '종료';
    }
    htmlData += '</h6></div></div></div></a></div>';

    testHtml += htmlData;
  }
  $('#productBox').html(testHtml);

  // 마감 시간
  function timeChange() {
    const product = data.data;
    for (let i = 0; i < data.count; i++) {
      const successBid = product[i].successBid || '';
      if (successBid == '') {
        document.getElementById('endTime' + product[i].id).innerHTML =
          '<button class="alarmBtn"><i class="fa-solid fa-stopwatch"></i></button> ' +
          remaindTime(product[i].endDate);
      } else {
        document.getElementById('endTime' + product[i].id).innerHTML =
          '<button class="alarmBtn"><i class="fa-solid fa-stopwatch"></i></button> ' +
          '종료';
      }
    }
  }
  setInterval(timeChange, 1000);
}
