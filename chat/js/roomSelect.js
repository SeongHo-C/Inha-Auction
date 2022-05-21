const memberId = localStorage.getItem('memberId');
fetch('http://182.218.194.156:8080/chat/room?memberId=' + memberId, {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data);
    // 채팅방 목록 조회
    roomListAdd();
    function roomListAdd() {
      let htmlData = '';
      const info = data.data;

      htmlData += `<div class="px-4 d-none d-md-block"><div class="d-flex align-items-center"><div class="flex-grow-1">
                    <input type="text" class="form-control my-3" placeholder="Search..."/></div></div></div>`;
      for (let i = 0; i < data.count; i++) {
        htmlData += `
          <a href="#" class="list-group-item list-group-item-action border-1">
          <div class="d-flex align-items-start"><div class="flex-grow-1 ml-3">
            ${info[i].seller.name}
            <div class="small"><span class="fas fa-circle chat-online"></span> Online</div></div></div></a>
          `;
      }
      htmlData += `<hr class="d-block d-lg-none mt-1 mb-0" />`;
      $('#chatRoomList').html(htmlData);
    }
  })
  .catch(console.log);
