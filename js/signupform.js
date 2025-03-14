// Form Submission Handling
document.getElementById('studentSignupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const fullName = document.getElementById('studentFullName').value;
    const email = document.getElementById('studentEmail').value;
    const phone = document.getElementById('studentPhone').value;
    const college = document.getElementById('studentCollege').value;
    const collegeAddress = document.getElementById('college Address').value;
    const pinCode = document.getElementById('Pin Code').value;
    const course = document.getElementById('studentCourse').value;
    const year = document.getElementById('studentYear').value;
    const abcId = document.getElementById('ABC ID').value;

    // Validate all fields are filled
    if (!fullName || !email || !phone || !college || !collegeAddress || !pinCode || !course || !year || !abcId) {
        showMessage('Please fill all the fields!', 'error');
        return;
    }

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showMessage('Sign up successful! Redirecting...', 'success');
        // Clear form fields
        document.getElementById('studentSignupForm').reset();
        // Redirect to index.html after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to index.html
        }, 2000);
    }, 1000);
});

// Function to show success/error messages
function showMessage(message, type) {
    const messageDiv = document.getElementById('studentMessage');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`; // Add class for styling
    messageDiv.style.display = 'block';

    // Hide message after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}