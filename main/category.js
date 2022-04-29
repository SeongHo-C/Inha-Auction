let map = new Map([]);

fetch('http://182.218.194.156:8080/product/categories')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // 기존의 배열로부터 새로운 배열을 생성
    const categoryArr = Array.from(data);

    for (let i = 0; i < categoryArr.length; i++) {
      $('#parent').append(
        '<li class="list-group-item-action list-group-item">' +
          categoryArr[i].name +
          '</li>'
      );
    }

    // 대분류 클릭 -> 중분류
    const childBook = categoryArr[0].children;
    const childCloth = categoryArr[1].children;
    const childProduct = categoryArr[2].children;
    $('#parent li').click(function () {
      $('#parent li').removeClass('list-group-item-info');
      $(this).addClass('list-group-item-info');
      const child1 = document.getElementById('children1');
      const child2 = document.getElementById('children2');
      child1.classList.remove('none');
      child1.innerHTML = '';
      child2.innerHTML = '';
      // 도서 대분류
      if ($(this).index() == 1) {
        for (let i = 0; i < childBook.length; i++) {
          $('#children1').append(
            '<li class="list-group-item-action list-group-item">' +
              categoryArr[0].children[i].name +
              '</li>'
          );
        }
        const childDepart = categoryArr[0].children[0].children;
        $('#children1 li').click(function () {
          $('#children1 li').removeClass('list-group-item-info');
          $(this).addClass('list-group-item-info');
          child2.classList.remove('none');
          child2.innerHTML = '';
          console.log(childDepart);
          // 도서 중분류
          if ($(this).index() == 0) {
            for (let i = 0; i < childDepart.length; i++) {
              $('#children2').append(
                '<li class="list-group-item-action list-group-item" id="' +
                  categoryArr[0].children[0].children[i].id +
                  '">' +
                  categoryArr[0].children[0].children[i].name +
                  '</li>'
              );
              //  map.set(
              //    categoryArr[0].children[0].children[i].name,
              //    categoryArr[0].children[0].children[i].id
              //  );
            }
          }
          $('#children2 li').on('click', function (event) {
            $('#children2 li').removeClass('list-group-item-info');
            $(this).addClass('list-group-item-info');
            // register.html에 보내 줄 값
            //  productId = map.get($(this).text());
            //  console.log(productId);
          });
        });
        // 의류 대분류
      } else if ($(this).index() == 2) {
        for (let i = 0; i < childCloth.length; i++) {
          $('#children1').append(
            '<li class="list-group-item-action list-group-item">' +
              categoryArr[1].children[i].name +
              '</li>'
          );
        }
        const childClothes = categoryArr[1].children[0].children;
        $('#children1 li').click(function () {
          child2.classList.remove('none');
          child2.innerHTML = '';
          // 의류 중분류
          if ($(this).index() == 0) {
            for (let i = 0; i < childClothes.length; i++) {
              $('#children2').append(
                '<li class="list-group-item-action list-group-item">' +
                  categoryArr[1].children[0].children[i].name +
                  '</li>'
              );
            }
          }
        });
        // 전자제품 대분류
      } else if ($(this).index() == 3) {
        for (let i = 0; i < childProduct.length; i++) {
          $('#children1').append(
            '<li class="list-group-item-action list-group-item">' +
              categoryArr[2].children[i].name +
              '</li>'
          );
        }
        const childProducts = categoryArr[2].children[0].children;
        $('#children1 li').click(function () {
          child2.classList.remove('none');
          child2.innerHTML = '';
          // 전자제품 중분류
          if ($(this).index() == 0) {
            for (let i = 0; i < childProducts.length; i++) {
              $('#children2').append(
                '<li class="list-group-item-action list-group-item">' +
                  categoryArr[2].children[0].children[i].name +
                  '</li>'
              );
            }
          }
        });
      }
    });
  })

  .catch(function (error) {
    console.log(error);
  });
