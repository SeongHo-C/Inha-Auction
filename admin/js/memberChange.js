const map = new Map();

function changeState(memberid) {
  const selectValue = $('#state-select' + memberid + ' option:selected').val();

  map.set(memberid, selectValue);
}

const checkBtn = document.getElementById('checkBtn');
checkBtn.addEventListener('click', (e) => {
  e.preventDefault();

  let mapToArray = Object.fromEntries(map);
  console.log(mapToArray);
  fetch('http://182.218.194.156:8080/admin/members', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(mapToArray),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.data);
      location.reload(true);
    })
    .catch(console.log);
});
