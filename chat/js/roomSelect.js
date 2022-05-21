const memberId = localStorage.getItem('memberId');
fetch('http://182.218.194.156:8080/chat/room?memberId=' + memberId, {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data);
    // 채팅방 목록 조회
    sendMessage(data);

    roomListAdd();
    function roomListAdd() {
      let htmlData = '';
      const info = data.data;

      htmlData += `<div class="px-4 d-none d-md-block"><div class="d-flex align-items-center"><div class="flex-grow-1">
                    <input type="text" class="form-control my-3" placeholder="Search..."/></div></div></div>`;
      for (let i = 0; i < data.count; i++) {
        htmlData += `
          <a href="#?${info[i].id}" class="list-group-item list-group-item-action border-1">
          <div class="d-flex align-items-start"><div class="flex-grow-1 ml-3">`;
        if (memberId == info[i].seller.id) {
          htmlData += `${info[i].customer.name}`;
        } else {
          htmlData += `${info[i].seller.name}`;
        }
        htmlData += `<div class="small"><span class="fas fa-circle chat-online"></span>상품: ${info[i].product.name}</div></div></div></a>
          `;
      }
      htmlData += `<hr class="d-block d-lg-none mt-1 mb-0" />`;
      $('#chatRoomList').html(htmlData);
    }
  })
  .catch(console.log);

// 메시지 전송
function sendMessage(data) {
  const sendBtn = document.querySelector('#sendBtn');
  sendBtn.addEventListener('click', function (e) {
    const url = location.href;
    const split = url.split('?');
    const roomId = split[1];
    let receiverId = '';
    const room = data.data;
    for (let i = 0; i < data.count; i++) {
      if (memberId == room[i].customer.id) {
        receiverId = room[i].seller.id;
      } else {
        receiverId = room[i].customer.id;
      }
    }

    data = {
      message: $('#message').val(),
      senderId: memberId,
      receiverId: receiverId,
      roomId: roomId,
    };

    stompClient.send('/app/chat/send', {}, JSON.stringify(data));

    $('#message').val('');
  });
}

function messageBox(data) {
  console.log(data);
}
