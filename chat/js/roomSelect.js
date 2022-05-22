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
          <a href="#?${info[i].id}" class="list-group-item list-group-item-action border-1" onClick="messageBox(${info[i].id})">
          <div class="d-flex align-items-start"><div id="receiver${info[i].id}" class="flex-grow-1 ml-3">`;
        if (memberId == info[i].seller.id) {
          htmlData += `${info[i].customer.name}`;
        } else {
          htmlData += `${info[i].seller.name}`;
        }
        htmlData += `<div class="small"><span class="fas fa-circle chat-online"></span>상품명: ${info[i].product.name}</div></div></div></a>
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
  const room = data.data;
  let receiverId = '';
  for (let i = 0; i < data.count; i++) {
    if (memberId == room[i].customer.id) {
      receiverId = room[i].seller.id;
    } else {
      receiverId = room[i].customer.id;
    }
    console.log(receiverId);
  }
  // 탭, 스페이스
  const pattern = /\s/g;

  sendBtn.addEventListener('click', function (e) {
    if (
      $('#message').val() !== '' &&
      pattern.test($('#message').val()) == false
    ) {
      const url = location.href;
      const split = url.split('?');
      const roomId = split[1];

      data = {
        message: $('#message').val(),
        senderId: memberId,
        receiverId: receiverId,
        roomId: roomId,
      };

      stompClient.send('/app/chat/send', {}, JSON.stringify(data));

      let str = '';
      str = `<div class="chat-message-right pb-4"><div class="flex-shrink-1 bg-blue rounded py-2 px-3 mr-3">${$(
        '#message'
      ).val()}</div></div>`;

      $('.chat-messages').append(str);

      $('#message').val('');

      let chat = document.querySelector('.chat-messages');
      chat.scrollTop = chat.scrollHeight;
    }
  });
}
