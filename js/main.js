$(document).ready(function(){
  // 창업문의 이동
  $(window).on('scroll',function(){
    var quick_menu = document.querySelector('#quick_menu');
      var scroll_position = $(window).scrollTop();
      $(quick_menu).css({
        'top' : scroll_position + 200 + 'px'
      });
      // console.log(scroll_position);
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
});
