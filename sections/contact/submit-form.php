<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Here you can handle the email sending or database saving
    // For example, you might use mail() function to send an email

    // Respond back with a success message
    echo json_encode(['message' => 'Thank you for your message! We will get back to you soon.']);
    exit;
} else {
    echo json_encode(['message' => 'Invalid request.']);
    exit;
}
?>
