<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";

    $mail = new PHPMailer(true);

    $mail->CharSet = "UTF-8";
    $mail->IsHTML(true);

    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $email_template = "template_mail.html";

    $body = file_get_contents($email_template);
    $body = str_replace('%name%', $name, $body);
    $body = str_replace('%phone%', $phone, $body);
    $body = str_replace('%email%', $email, $body);
    $body = str_replace('%message%', $message, $body);

    $mail->addAddress("development@proektit.ru");   // Здесь введите Email, куда отправлять
    $mail->setFrom($email);
    $mail->Subject = "[Заявка с формы]";
    $mail->MsgHTML($body);

    $message = "Данные отправлены!";

    $response = ["message" => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>