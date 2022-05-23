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
  })
  .catch(console.log);
