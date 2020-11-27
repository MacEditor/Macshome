$(document).ready(function(){
  function resize_quick(){
    if($(window).width() < 1281){
      $(quick_menu).css({
        'top' : 'auto'
      });
    }
  }
  // 창업문의 이동
  $(window).on('scroll',function(){
    if($(window).width() > 1280){
      var quick_menu = document.querySelector('#quick_menu');
      var scroll_position = $(window).scrollTop();
      $(quick_menu).css({
        'top' : scroll_position + 200 + 'px'
      });
      // console.log(scroll_position);
  	}else{
      resize_quick()
    }
  });
  // 창업문의 반응형
  $(window).resize(resize_quick());

  // 창업문의 종료
  let quick_switch = true;
  $(".quick_title > span, .quick_close_m").click(function(){
    if(quick_switch == true){
      $("#quick_menu").addClass('active');
      quick_switch = false;
    }else{
      $("#quick_menu").removeClass('active');
      quick_switch = true;
    }
  });

  // 개인정보 수집이용 동의 활성화
  let p_popup_btn = document.querySelector('.policybtn'),
  p_popup = document.getElementById('policy_popup'),
  p_popup_layout = document.querySelector('.policy_layout'),
  p_popup_close = document.querySelector('.p_popup_close');

  p_popup_layout.onclick = function(){
    p_popup.classList.remove('show');
  }
  p_popup_close.onclick = function(){
    p_popup.classList.remove('show');
  }
  p_popup_btn.onclick = function(){
    p_popup.classList.add('show');
  }

  // 햄버거 메뉴 활성화
  function more_resize(){
    if($(window).width() > 1024){
      $(".menu_more_m").removeClass("active");
    }
  }
  $(".menuicon_m").click(function(){
    if($(window).width() < 1025){
      $(".menu_more_m").addClass("active");
      $(this).addClass("active");
    }else{
      more_resize();
    }
  });
  $(".menu_more_m_close").click(function(){
    $(".menu_more_m").removeClass("active");
    $(".menuicon_m").removeClass("active");
  });
});
