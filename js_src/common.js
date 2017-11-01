$(document).ready(function() {

  //Скролл к верху по клику на таб.
  ScrollToTop('.tab');
  //END

  //Прилипание навигации
  ScrollTransitions('index-banner', 'menu', '#menu');
  //END

  //Включение параллакса для фона шапки
    adhoc_parallax('#index-banner', '0.5');
  //END


  //Обратная навигация из альбома
  $('#Album__Navbar__BackArrow').click(function() {
    $('#Gallery__Grid').fadeOut(0);
    $('#Album__Navbar').fadeOut(0);

    $('#Albums__Grid').fadeIn(400);
    $('#index-banner').fadeIn(400);
    $('#menu').fadeIn(400);

    $('ul.tabs').tabs('select_tab', 'test1');
  });
  //END

  //Обрезка текста в футере
  (function() {
    if(document.documentElement.clientWidth < 768) {
      TextSlice('#FooterText', 30, '');
      // alert('по ходу это мобила!');
    }
  })();


  //Подгрузка альбомов на главную страницу
  $.ajax({
    url: 'https://api.vk.com/method/photos.getAlbums?',
    data: {
      owner_id: '-72629433',
      need_covers: '1',
      photo_sizes: '1'
    },
    dataType: 'jsonp',
    success: function(data) {
      data.response.forEach(function(item) {
        for (i = 0; i < 9; i++) { // длина массива sizes = 9 (всего размеров)
          var typeImg = item.sizes[i].type; // перебираем все type

          if (typeImg == 'r') {
            break; // если находим нужный type, говорим остановить перебор
          }
        }
        var aid = item.aid;
        var thumb = item.sizes[i].src; // а тут выводим в переменную после break!
        var title = item.title;
        $('<div class="col s12 m6 l4"><div class="card waves-effect waves-block waves-light z-depth-5"><div class="card-image"><a class="ajax" onclick="albums(this)" href="#AdHoc__app"><img class="padding" src="' + thumb + '"/><div class="aid">' + item.aid + '</div><span class="card-title">'+ title +'</span></a></div></div></div></div>').appendTo('.nav-albs');
      });
    }
  });
  //END


  //Вставка текущего года в футер
  $('#year').html((new Date()).getFullYear());


});
