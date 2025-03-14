// Form Submission Handling
document.querySelector('.mentorship-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const mentor = document.getElementById('mentor').value;
    const topic = document.getElementById('topic').value;
    const time = document.getElementById('time').value;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showMessage('Booking successful! Redirecting...', 'success');

        // Add smooth transition effect to the form
        document.querySelector('.mentorship-form-container').style.transform = 'scale(0.98)';
        document.querySelector('.mentorship-form-container').style.transition = 'transform 0.3s ease';

        // Redirect to another page after 2 seconds
        setTimeout(() => {
            window.location.href = '/confirmation.html'; // Redirect to confirmation page
        }, 2000);
    }, 1000);
});

// Function to show success/error messages
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`; // Add class for styling
    document.querySelector('.mentorship-form-container').appendChild(messageDiv);

    // Hide message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}