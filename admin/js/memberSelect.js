// 회원 조회
fetch('http://182.218.194.156:8080/admin/members?page=1&per_page=10', {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    memberAdd();
    function memberAdd() {
      let htmlData = '';
      const member = data.data;

      for (let i = 0; i < data.count; i++) {
        htmlData += `<tr><td>${member[i].name}</td><td>${member[i].department}</td>
        <td>${member[i].loginId}</td><td>${member[i].phone}</td>
        <td>${member[i].address}</td><td>${member[i].email}</td>
        <td><img class="card-size" src="http://182.218.194.156:8080/image/member-${member[i].id}.png?type=auth" alt="이미지 없음"/></td>
        <td>${member[i].state}</td>
        </tr>`;
      }
      $('#memberTable').html(htmlData);
    }
  })
  .catch(console.log);
