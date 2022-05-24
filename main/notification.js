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
        htmlData += `<li id="${notification[i].id}" class="item_row"><div class="item"><span class="NotificationMsg">${notification[i].message}</span>
        <button class="item_delete" onClick="removeItem(${notification[i].id})"><i class="fa-solid fa-trash-can"></i></button></div><div class="item_divider"></div></li>`;
      }
      $('.dropdown-menu').html(htmlData);
    }

    notificationRead(data);
  })
  .catch(console.log);

function notificationRead(data) {
  //   console.log(data);
  //   const item_delete = document.querySelector('.item_delete');
  //   item_delete.addEventListener('click', (event) => {
  //   });
}

function removeItem(notificationid) {
  $(`#${notificationid}`).remove();

  const dropdowBtn = document.querySelector('.dropdowBtn');
  if ($('.dropdown-menu li').text().trim() == '') {
    dropdowBtn.style.color = 'white';
  }
  console.log($('.item_row').text());
  fetch('http://182.218.194.156:8080/notification/' + notificationid, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch(console.log);
}
