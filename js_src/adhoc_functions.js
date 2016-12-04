
//Прилипание навигации
function ScrollTransitions(HeaderId, ElementID, Element) {
  var HeaderHeight = document.getElementById(HeaderId).offsetHeight,
      // NavbarHeight = document.getElementById(ElementID).offsetHeight,
      ScrollTop = 0;

  $(window).scroll(function() {

    if (window.pageYOffset > HeaderHeight) {
      $(Element).addClass('fixed');
      $('#'+HeaderId).css('margin-bottom', '56px');
    }
    else {
      $(Element).removeClass('fixed');
      $('#'+HeaderId).css('margin-bottom', '0');
    }
  });
};
//END


//Обрезка до 30 символов
function TextSlice(element, CharsNumber, AdditionSymbol) {
  var SlicedText = $(element).text().slice(0,CharsNumber);

  $(element).text(SlicedText+AdditionSymbol);
}
//END





// Функция открытия альбома, получения фоток, расстановки итемов
function albums(el) {

  //Вводим переменную - название альбома
  var AlbumTitile = el.text.replace(/\d/g, '');

  //Заполняем название альбома
  $('#GalleryTitle').text(AlbumTitile);

  if(document.documentElement.clientWidth < 768) {
    if($('#GalleryTitle').text().length > 16) {
      TextSlice('#GalleryTitle', 15, '…');
    }
  }
  

  // скрываем альбомы и хэдер
  $('#Albums__Grid').fadeOut(0);
  $('#index-banner').fadeOut(0);
  $('#menu').fadeOut(0);

  // Показываем содержимое альбома и навбар
  $('#Album__Navbar').fadeIn(400);
  $('#Gallery__Grid').fadeIn(400);

  //инициализируем контейнер для масонри и указываем элемент плитки
  var $container = $('.grid').masonry({
    itemSelector: '.grid-item'
  });

  // очищаем сетку методом плагина masonry()
  $container.masonry('remove', $('.grid-item')).masonry();

    // посылаем аякс запрос в вк на фотки из альбома
  $.ajax({
    url: 'https://api.vk.com/method/photos.get?',
    data: {
      owner_id: '-72629433',
      album_id: el.text, // аргумент ID альбома
      count:30
    },
    dataType: 'jsonp',
    success: function(data) {
      data.response.forEach(function(item) {
        var img = item.src_big.replace('https://', 'http://'),
            bigImage = item.src_xxbig.replace('https://', 'http://');
        !img ? img = item.src_big : img; 

        if ($(window).width() > 1920) {
          var moreBlocks = '<a href="'+bigImage+'" class="grid-item grid-item__beforeLoad"><img src="' + bigImage + '" alt="" class="img-alb responsive-img z-depth-3"/></a>';
        }
        else {
          var moreBlocks = '<a href="'+bigImage+'" class="grid-item grid-item__beforeLoad"><img src="' + img + '" alt="" class="img-alb responsive-img z-depth-3"/></a>';
        }

        var $moreBlocks = $(moreBlocks);
            $container.append($moreBlocks);
            $container.masonry('appended', $moreBlocks);
            $container.masonry('layout');
            $container.imagesLoaded().done(function() {
              $('.grid-item').removeClass('grid-item__beforeLoad'); //Убираем класс первоначальной серой плитки
              $container.masonry('layout'); // после подгрузки фотографий, начинаем упорядочивание >:
            });
      });

      if ($(window).width() > 480) {
        $('.grid').each(function() {
          $(this).magnificPopup({
            delegate: '.grid-item',
            type: 'image',
            gallery: {
              enabled: true,
              preload: [1,3]
            },
            zoom: {
              enabled: true, // By default it's false, so don't forget to enable it

              duration: 300, // duration of the effect, in milliseconds
              easing: 'ease-in-out'
            },
            fixedContentPos: true
          })
        });        
      }
      else {
        $('.grid-item').click(function(s) {
          s.preventDefault();
        })
      }
    }
  });
};
//END




// Параллакс эффект
function adhoc_parallax(element, ScrollSpeed) {

  $(window).scroll(function() {
    var ScrollTop = window.pageYOffset;

    $(element).css('background-position', '50% '+ScrollTop*ScrollSpeed+'px')
    
  });
};
//END


// Скролл к верху страницы по клику на элемент
function ScrollToTop(element) {
  $(element).click(function() {
    window.scrollTo(0, 0);
  })
};
//END