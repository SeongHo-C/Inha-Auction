function messageBox(roomId) {
  const sendHidden = document.querySelector('#sendHidden');
  sendHidden.style.visibility = 'visible';

  fetch('http://182.218.194.156:8080/chat/room/' + roomId, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      messageBoxAdd();
      function messageBoxAdd() {
        let htmlData = '';
        const info = data.data;
        const messages = info.messages;
        console.log(messages);

        htmlData += `
        <div class="py-2 px-4 border-bottom d-none d-lg-block"><div class="d-flex align-items-center py-1">
          <div class="flex-grow-1 pl-3"><strong>`;

        if (memberId == info.customer.id) {
          htmlData += info.seller.name;
        } else {
          htmlData += info.customer.name;
        }

        htmlData += `</strong></div><div><button class="btn btn-primary mr-1 px-3">신고</button>
        
        </div></div></div>
        `;

        htmlData += `
        <div class="position-relative">
                <div id="room${roomId}" class="chat-messages p-4">
        `;
        for (let i = 0; i < messages.length; i++) {
          if (memberId == messages[i].sender.id) {
            htmlData += `
            <div class="chat-message-right pb-4"><div class="flex-shrink-1 bg-blue rounded py-2 px-3 mr-3">${messages[i].message}</div></div>`;
          } else {
            htmlData += `
            <div class="chat-message-left pb-4"><div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
            ${messages[i].message}</div></div>
            `;
          }
        }
        htmlData += `</div></div>`;

        // htmlData += `<div class="flex-grow-0 py-3 px-4 border-top"><div class="input-group">
        //   <input id="message" type="text" class="form-control" placeholder="Type your message"/>
        //   <button id="sendBtn" class="btn btn-primary">Send</button></div></div>`;

        $('#messageBoxContent').html(htmlData);

        let scroll = document.querySelector('.chat-messages');
        scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
      }
    })
    .catch(console.log);
}
