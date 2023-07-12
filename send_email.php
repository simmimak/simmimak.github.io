<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Compose the email
    $to = "sdm8499@nyu.edu";
    $headers = "From: $name <$email>";
    $body = "Subject: $subject\n\n$message";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo 'Email sent successfully!';
    } else {
        echo 'Error sending email.';
    }
}
?>
