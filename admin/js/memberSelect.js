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
        if (member[i].state !== 'ROLE_ADMIN') {
          htmlData += `<tr><td><input type="checkbox" name="checkBid" value="${member[i].id}"</td>
          <td>${member[i].name}</td><td>${member[i].department}</td>
        <td>${member[i].loginId}</td><td>${member[i].phone}</td>
        <td>${member[i].address}</td><td>${member[i].email}</td>
        <td><img class="card-size" src="http://182.218.194.156:8080/image/member-${member[i].id}.png?type=auth" alt="이미지 없음"/></td>
        <td><select name="state" id="state-select${member[i].id}" onchange="changeState(${member[i].id})">
        <option value="ROLE_USER">ROLE_USER</option><option value="ROLE_ANONYMOUS">ROLE_ANONYMOUS</option><option value="ROLE_ADMIN">ROLE_ADMIN</option></select></td>
        </tr>`;
        } else {
        }
      }
      $('#memberTable').html(htmlData);
    }

    // select 박스 option 값 선택하기
    optionValue();
    function optionValue() {
      const member = data.data;
      console.log(member);
      for (let i = 0; i < data.count; i++) {
        if (member[i].state == 'ROLE_USER') {
          $('#state-select' + member[i].id)
            .val('ROLE_USER')
            .prop('selected', true);
        } else if (member[i].state == 'ROLE_ANONYMOUS') {
          $('#state-select' + member[i].id)
            .val('ROLE_ANONYMOUS')
            .prop('selected', true);
        }
      }
    }
  })
  .catch(console.log);
