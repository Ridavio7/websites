$(document).ready(function() {
    $('.header_burger').click(function(event) {
        $('.header_burger,.header_menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
});

$(document).ready(function() {
    $('.block_title').click(function(event) {
        if($('.block').hasClass('one')){
            $('block_title').not($(this)).removeClass('active');
            $('block_settings').not($(this).next()).slideUp(300);
        }
        $(this).toggleClass('active').next().slideToggle(300);
    });
});

window.addEventListener('DOMContentLoaded', function() {
    var select = document.querySelector('#mode'),
        hide = document.querySelectorAll('.wi-fi_settings');
        function change()
        {
            [].forEach.call(hide, function(el) {
                var add = el.classList.contains(select.value) ? "add" : "remove"
                el.classList[add]('show');
            });
        }
        select.addEventListener('change', change);
        change()
    });