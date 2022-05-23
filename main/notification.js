const memberID = localStorage.getItem('memberId');
// 알림 조회
fetch('http://182.218.194.156:8080/notification/' + memberID, {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);

    notificationAdd();
    function notificationAdd() {
      let htmlData = '';
      const notification = data.data;
      const dropdowBtn = document.querySelector('.dropdowBtn');

      for (let i = 0; i < data.count; i++) {
        if (notification[i].viewYn == false) {
          dropdowBtn.style.color = 'red';
        } else {
          dropdowBtn.style.color = 'white';
        }
        htmlData += `<div class="item"><span class="NotificationMsg">${notification[i].message}</span>
        <button class="item_delete"><i class="fa-solid fa-trash-can"></i></button></div><div class="item_divider"></div>`;
      }
      $('.item_row').html(htmlData);
    }
  })
  .catch(console.log);
