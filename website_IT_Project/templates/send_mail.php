<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";

    $mail = new PHPMailer(true);
	
    $mail->CharSet = "UTF-8";
    $mail->IsHTML(true);

    $name = $_POST["name"];
    $email = $_POST["email"];
	$phone = $_POST["phone"];
    $message = $_POST["message"];
	$email_template = "template_mail.html";

    $body = file_get_contents($email_template);
	$body = str_replace('%name%', $name, $body);
	$body = str_replace('%email%', $email, $body);
	$body = str_replace('%phone%', $phone, $body);
	$body = str_replace('%message%', $message, $body);

    $mail->addAddress("info@proektit.ru");   // Здесь введите Email, куда отправлять
	$mail->setFrom($email);
    $mail->Subject = "[Заявка с формы]";
    $mail->MsgHTML($body);

    if (!$mail->send()) {
        $message = "Ошибка отправки";
    } else {
        $message = "Данные отправлены!";
    }
	
	$response = ["message" => $message];

    header('Content-type: application/json');
    echo json_encode($response);

    // Проверяем была ли отправлена форма
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['recaptcha_response'])) {

    // Создаем POST запрос
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = '***';
    $recaptcha_response = $_POST['recaptcha_response'];

    // Отправляем POST запрос и декодируем результаты ответа
    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);

    // Принимаем меры в зависимости от полученного результата
    if ($recaptcha->score >= 0.5) {
        // Проверка пройдена - отправляем сообщение.
    } else {
        // Проверка не пройдена. Показываем ошибку.
    }

}
?>
