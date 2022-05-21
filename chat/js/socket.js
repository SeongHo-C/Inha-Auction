let stompClient = null;

function connect() {
  const socket = new SockJS('/users'); // 소켓 생성
  stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame) => {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/users', (response) => {
      console.log(response);
      console.log(JSON.parse(response.body));
    });
  });
}

function send() {
  console.log('sending');
  const message = document.getElementById('message').value;
  // 세번째 인자는 서버로 보낼 때 추가하고 싶은 stomp 바디
  stompClient.send('/app/user', {}, JSON.stringify({ message: message }));
}
