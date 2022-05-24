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

      for (let i = 0; i < data.count; i++) {
        htmlData += `<li id="${notification[i].id}" class="item_row"><div id="item${i}" class="item" onClick="notificationRead(${notification[i].id}, this.id)"><span class="NotificationMsg">${notification[i].message}</span>
        <button class="item_delete" onClick="removeItem(${notification[i].id})"><i class="fa-solid fa-trash-can"></i></button></div><div class="item_divider"></div></li>`;
      }
      $('.dropdown-menu').html(htmlData);

      const dropdowBtn = document.querySelector('.dropdowBtn');

      for (let i = 0; i < data.count; i++) {
        const item = document.querySelector('#item' + i);
        if (notification[i].viewYn == false) {
          dropdowBtn.style.color = 'red';
        } else {
          dropdowBtn.style.color = 'white';
          item.style.background = 'lightgray';
        }
      }
    }
  })
  .catch(console.log);

// 알림 삭제
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

// 읽음 처리
function notificationRead(notificationid, itemid) {
  const item = document.getElementById(itemid);
  item.style.background = 'lightgray';
  console.log(item);

  const dropdowBtn = document.querySelector('.dropdowBtn');
  const length = $('.dropdown-menu>li').length;

  for (let i = 0; i < length; i++) {
    if (
      $('.dropdown-menu>li>#item' + i).css('background-color') ==
      'rgb(211, 211, 211)'
    ) {
      dropdowBtn.style.color = 'white';
    } else {
      dropdowBtn.style.color = 'red';
    }
  }
  fetch('http://182.218.194.156:8080/notification/' + notificationid, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch(console.log);
}
