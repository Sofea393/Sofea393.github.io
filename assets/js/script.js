// Load the Gmail API client library
gapi.load('client:auth2', initClient);

// Initialize the Gmail API client
function initClient() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY', // Replace with your API key
        clientId: 'YOUR_CLIENT_ID', // Replace with your client ID
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
        scope: 'https://www.googleapis.com/auth/gmail.send'
    }).then(function () {
        // Enable the submit button after initialization
        document.getElementById('email-form').addEventListener('submit', sendEmail);
    });
}

// Function to send an email
function sendEmail(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Compose the email
    const emailContent = `
        To: sitiaisyahsofeabintiazizul@gmail.com
        Subject: New Contact Form Submission from ${name}
        
        ${message}
    `;

    const base64EncodedEmail = btoa(emailContent);

    // Send the email using the Gmail API
    gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': base64EncodedEmail
        }
    }).then(function(response) {
        console.log('Email sent successfully:', response);
    }, function(error) {
        console.error('Error sending email:', error);
    });
}
