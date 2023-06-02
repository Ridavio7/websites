grecaptcha.ready(function () {
    grecaptcha.execute('6LcRbVImAAAAAAZUBfTdnatVxr1r1TkNrf4Q70Q8', { action: 'Контакты' }).then(function (token) {
        var recaptchaResponse = document.getElementById('recaptchaResponse');
        recaptchaResponse.value = token;
    });
});