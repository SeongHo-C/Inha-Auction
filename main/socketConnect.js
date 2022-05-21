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
    stompClient.subscribe('/topic/chat/' + memberid, function (e) {});
  }
}
