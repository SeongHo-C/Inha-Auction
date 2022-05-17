// 체크박스 하나만 가능하도록
$(document).ready(function () {
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
    }
  });
});
