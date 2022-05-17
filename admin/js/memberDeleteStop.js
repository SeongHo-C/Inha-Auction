// 체크박스 하나만 가능하도록

$(function () {
  $('input[type="checkbox"][name="checkBid"]').click(function () {
    if ($(this).prop('checked')) {
      $('input[type="checkbox"][name="checkBid"]').prop('checked', false);
      $(this).prop('checked', true);
      const checkIdx = $(this).val();
      console.log(checkIdx);

      // 탈퇴하기
      const deleteBtn = document.getElementById('deleteBtn');
      deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();

        fetch('http://182.218.194.156:8080/admin/members/' + checkIdx, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            alert(data.data);
            location.reload(true);
          })
          .catch(console.log);
      });

      // 정지하기
      const memberStopBtn = document.getElementById('memberStopBtn');
      memberStopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const stopMap = new Map();

        const banDate = document.getElementById('banDate').value;
        console.log(banDate);
        console.log(checkIdx);
        stopMap.set(checkIdx, banDate);
        console.log(stopMap);
        let stopmapToArray = Object.fromEntries(stopMap);
        fetch('http://182.218.194.156:8080/admin/members/ban', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify(stopmapToArray),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            location.reload(true);
          })
          .catch(console.log);
      });
    }
  });
});
