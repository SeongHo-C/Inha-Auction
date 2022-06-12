let searchValue = localStorage.getItem('adminSearch') || '';

// 회원 조회
fetch(
  `http://182.218.194.156:8080/admin/members?page=1&per_page=10&keyword=${searchValue}`,
  {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    memberAdd();
    function memberAdd() {
      let htmlData = '';
      const member = data.data;
      // 서버 시간
      var xmlHttpRequest;
      if (window.XMLHttpRequest) {
        xmlHttpRequest = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xmlHttpRequest = new ActiveXObject('Microsoft.XMLHTTP');
      } else {
        return;
      }
      xmlHttpRequest.open('HEAD', window.location.href.toString(), false);
      xmlHttpRequest.setRequestHeader('ContentType', 'text/html');
      xmlHttpRequest.send('');

      var serverDate = xmlHttpRequest.getResponseHeader('Date');
      var now = new Date(serverDate);
      console.log(now);

      for (let i = 0; i < data.count; i++) {
        if (member[i].state !== 'ROLE_ADMIN') {
          htmlData += `<tr><td><input id="check" type="checkbox" name="checkMember" value="${member[i].id}"</td>
          <td>${member[i].name}</td><td>${member[i].department}</td>
        <td>${member[i].loginId}</td><td>${member[i].phone}</td>
        <td>${member[i].address}</td><td>${member[i].email}</td>
        <td><img class="card-size" src="http://182.218.194.156:8080/image/member-${member[i].id}.png?type=auth" alt="이미지 없음"/></td>
        <td><select name="state" id="state-select${member[i].id}" onchange="changeState(${member[i].id})">
        <option value="ROLE_USER">승인 회원</option><option value="ROLE_ANONYMOUS">미승인 회원</option><option value="ROLE_ADMIN">관리자</option></select><br>`;

          const bantoDate = new Date(member[i].banDate);
          bantoDate.setHours(0);

          if (member[i].banDate !== null && bantoDate > now) {
            let date = new Date(member[i].banDate).toLocaleDateString();

            htmlData += `<button class="btn btn-primary text-center p-0 mt-2" onclick="stopAlert('${date}')">정지중</button>`;
          }
          htmlData += `</td></tr>`;
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

    const search = document.querySelector('.dataTable-input');
    search.addEventListener('keydown', (event) => {
      if (event.key == 'Enter') {
        const searchVal = search.value;
        localStorage.setItem('adminSearch', searchVal);
        location.reload();
      }
    });
    search.value = searchValue;
  })
  .catch(console.log);

// 정지 해제일 알려주기
function stopAlert(date) {
  console.log(date);
  alert(`정지해제일은 ${date} 입니다.`);
}
