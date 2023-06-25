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