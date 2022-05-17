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
        <td>${notify[i].content}</td><td><button id="${notify[i].id}" type="button" style="height: 24px; font-size: 12px; padding: 0px; width: 100%" class="btn btn-primary" data-toggle="modal" data-target="#notifyFile">
        첨부파일</button></td>
        </tr>`;
      }
      $('#notifyTable').html(htmlData);
    }

    // 사진 추가하기
    imageAdd();

    function imageAdd() {
      let htmlData = '';
      const notify = data.data;
      for (let i = 0; i < data.count; i++) {
        let notifyId = notify[i].id;
        htmlData += '<div class="carousel-item active">';
        htmlData +=
          '<img src="http://182.218.194.156:8080/image/report-' +
          notifyId +
          '-0.png?type=report" class="d-block w-100 detail-image-size" alt="..."/></div>';

        for (let i = 1; i < notify.imgCnt; i++) {
          htmlData += '<div class="carousel-item">';
          htmlData +=
            '<img src="http://182.218.194.156:8080/image/report-' +
            notifyId +
            '-' +
            i +
            '.png?type=report" class="d-block w-100 detail-image-size" alt="..."/></div>';
        }
        $('#carouselInner').html(htmlData);
      }
    }
  })
  .catch(console.log);
