$(document).ready(function(){
  // 창업문의 이동
  $(window).scroll(function(){
    var scroll_position = $(window).scrollTop(),
    quick_position = $('#quick_menu').css("top");
    $('#quick_menu').css({
      'top' : scroll_position + 200 + 'px',
    });
  });

  // 개인정보 수집이용 동의 활성화
  let p_popup_btn = document.querySelector('.policybtn'),
  p_popup = document.getElementById('policy_popup'),
  p_popup_close = document.querySelector('.p_popup_close'),
  p_close = () => {
    p_popup.classList.add('hidden');
  }
  p_open = () => {
    p_popup.classList.remove('hidden');
  }
  p_popup_close.addEventListener("click", p_close);
  p_popup_btn.addEventListener("click", p_open);
});
