// 신고 조회
fetch('http://182.218.194.156:8080/admin/reports?page=1&per_page=10', {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    notifyAdd();
    function notifyAdd() {
      const notify = data.data;
      let htmlData = '';

      for (let i = 0; i < data.count; i++) {
        htmlData += `<tr><td>${notify[i].productId}</td><td>${notify[i].reportedLoginId}</td>
        <td>${notify[i].title}</td><td>${notify[i].writerLoginId}</td>
          <td>${notify[i].content}</td><td><button id="${notify[i].id}" type="button" style="height: 24px; font-size: 12px; padding: 0px; width: 100%" class="btn btn-primary" data-toggle="modal" data-target="#notifyFile" onClick="imageAdd(this.id, ${data.count}, ${notify[i].imgCnt})">
        첨부파일</button></td>
        </tr>`;
      }
      $('#notifyTable').html(htmlData);
    }
  })
  .catch(console.log);

// 사진 추가하기

function imageAdd(id, dataCount, imgCnt) {
  for (let i = 0; i < dataCount; i++) {
    let htmlData = '';
    if (imgCnt !== 0) {
      for (let j = 0; j < imgCnt; j++) {
        if (j == 0) {
          htmlData += '<div class="carousel-item active">';
        } else {
          htmlData += '<div class="carousel-item">';
        }
        htmlData +=
          '<img style="width: 100%; height: 350px;" src="http://182.218.194.156:8080/image/report-' +
          id +
          '-' +
          j +
          '.png?type=report" class="d-block w-100 detail-image-size" alt="..."/></div>';
      }
    } else {
      htmlData += '사진이 존재하지 않습니다.';
    }
    $('#carouselInner').html(htmlData);
  }
}
