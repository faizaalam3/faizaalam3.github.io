<?php
// Logging to help debug
file_put_contents('log.txt', 'Request Method: ' . $_SERVER["REQUEST_METHOD"] . PHP_EOL, FILE_APPEND);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Email to send to
    $to = "fi.faizaalam@gmail.com";

    // Subject of the email
    $email_subject = $subject;

    // Message content
    $email_message = "Name: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Message:\n$message\n";

    // Headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $email_subject, $email_message, $headers)) {
        // Respond back with a success message
        echo json_encode(['message' => 'Thank you for your message! We will get back to you soon.']);
    } else {
        echo json_encode(['message' => 'Failed to send email. Please try again later.']);
    }
    exit;
} else {
    file_put_contents('log.txt', 'Invalid Request Method' . PHP_EOL, FILE_APPEND);
    echo json_encode(['message' => 'Invalid request.']);
    exit;
}
?>
