fetch('http://182.218.194.156:8080/product/categories')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    let clickedId = '';
    let clickedName = '';
    // 기존의 배열로부터 새로운 배열을 생성
    const categoryArr = Array.from(data);

    for (let i = 0; i < categoryArr.length; i++) {
      $('#parent').append(
        '<li class="list-group-item-action list-group-item">' +
          categoryArr[i].name +
          '</li>'
      );
    }

    // 대분류 클릭
    $('#parent li').on('click', function () {
      $('#parent li').removeClass('list-group-item-info');
      $(this).addClass('list-group-item-info');
      const child1 = document.getElementById('children1');
      const child2 = document.getElementById('children2');
      child1.classList.remove('none');
      child1.innerHTML = '';
      child2.innerHTML = '';

      // if ($(this).index() == 0) {
      //   clickedId = '';
      //   clickedName = '';
      //   categoryId(clickedId, clickedName);
      // }
      let children1 = '';
      if ($(this).index() != 0) {
        children1 = categoryArr[$(this).index() - 1].children;
        for (let i = 0; i < children1.length; i++) {
          $('#children1').append(
            '<li class="list-group-item-action list-group-item">' +
              children1[i].name +
              '</li>'
          );
        }
      } else {
        clickedId = '';
        clickedName = '';
        categoryId(clickedId, clickedName);
      }

      // 중분류 클릭
      $('#children1 li').on('click', function () {
        $('#children1 li').removeClass('list-group-item-info');
        $(this).addClass('list-group-item-info');
        const child2 = document.getElementById('children2');
        child2.classList.remove('none');
        child2.innerHTML = '';

        if (children1[$(this).index()].children == '') {
          clickedId = children1[$(this).index()].id;
          clickedName = children1[$(this).index()].name;

          categoryId(clickedId, clickedName);
        }

        const children2 = children1[$(this).index()].children;
        for (let i = 0; i < children2.length; i++) {
          $('#children2').append(
            '<li class="list-group-item-action list-group-item">' +
              children2[i].name +
              '</li>'
          );
        }

        // 소분류 클릭
        $('#children2 li').on('click', function () {
          $('#children2 li').removeClass('list-group-item-info');
          $(this).addClass('list-group-item-info');

          clickedId = children2[$(this).index()].id;
          clickedName = children2[$(this).index()].name;
          categoryId(clickedId, clickedName);
        });
      });
    });
  })
  .catch(function (error) {
    console.log(error);
  });
