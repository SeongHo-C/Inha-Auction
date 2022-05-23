// 소켓 연결
const memberid = localStorage.getItem('memberId');
let stompClient = null;
socketConnect();
function socketConnect() {
  const socket = new SockJS('http://182.218.194.156:8080/ws'); // 소켓 생성
  stompClient = Stomp.over(socket);
  stompClient.connect(
    { Authorization: localStorage.getItem('token') },
    onConnected
  );

  function onConnected() {
    // 채팅 구독
    stompClient.subscribe('/topic/chat/' + memberid, function (chat) {
      const content = JSON.parse(chat.body);

      const message = content.message;

      let str = '';
      str = `
      <div class="chat-message-left pb-4"><div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
      ${message}</div></div>
      `;

      $('.chat-messages').append(str);

      chat = document.querySelector('.chat-messages');
      chat.scrollTop = chat.scrollHeight;
    });

    // 알림 구독
    stompClient.subscribe('/topic/notify/' + memberid, function (chat) {});
  }
}
