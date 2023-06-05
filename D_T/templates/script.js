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

$(document).ready(function(){
    const box = document.getElementById('dhcp');

    function handleRadioClick() {
        if (document.getElementById('show').checked) {
        box.style.display = 'block';
        } else {
        box.style.display = 'none';
        }
    }
    
    const radioButtons = document.querySelectorAll('input[name="example"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('click', handleRadioClick);
    });
    
})

$(document).ready(function(){
    const box = document.getElementById('ip');

    function handleRadioClick() {
        if (document.getElementById('hide').checked) {
        box.style.display = 'block';
        } else {
        box.style.display = 'none';
        }
    }
    
    const radioButtons = document.querySelectorAll('input[name="example"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('click', handleRadioClick);
    });
    
})