// jquery ready function

$(function() {
  
  /* -------------------------
  /*  LANGUAGES
   *
   */

  var languages = ['en', 'de'];
  var lang_query_param = 'lang';
  var lang_cookie_name = 'timm_lang'
  var lang_cookie_expires = 365   // days

  $('#lang-menu').show();

  // language menu handler
  // show only those language-specific elements that match the user language
  $('#lang-menu span').click(function(){
    for (var i = 0; i < languages.length; i++) {
      var $menu_item = $('#lang-menu span.'+languages[i]);
      var $lang_elements = $('.lang-'+languages[i]);

      if ( $(this).hasClass(languages[i]) ) {
        $lang_elements.show();
        $menu_item.addClass('active');

        // set lang cookie
        $.cookie(lang_cookie_name, languages[i], { expires: lang_cookie_expires });
      } else {
        $lang_elements.hide();
        $menu_item.removeClass('active');
      };
    };

    // hide language separator elements
    $('.lang-sep').hide();

    // remove query string from url
    var url_path = window.location.href.split('?')[0];
    if ( window.location.href != url_path ) window.location.replace(url_path);
  });

  // get preferred language: from url -> from cookie -> default
  var query_lang = getQueryVariable(lang_query_param);
  var cookie_lang = $.cookie(lang_cookie_name);
  if ( $.inArray(query_lang, languages) > -1 ) {
    // set language from query parameter
    $('#lang-menu span.'+query_lang).trigger('click');
  } else if ( $.inArray(cookie_lang, languages) > -1 ) {
    // set language from cookie
    $('#lang-menu span.'+cookie_lang).trigger('click');
  } else {
    // default to english
    $('#lang-menu span.en').trigger('click');   
  };


  /* -------------------------
  /*  FUNCTIONS
   *
   */

  // http://css-tricks.com/snippets/javascript/get-url-variables/
  function getQueryVariable(variable)
  {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for ( var i=0; i<vars.length; i++ ) {
      var pair = vars[i].split("=");
      if( pair[0] == variable ) return pair[1];
    }
    return false;
  } 

});

