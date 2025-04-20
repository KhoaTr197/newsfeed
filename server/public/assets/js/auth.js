$(document).ready(() => {
  $('#login-form').on('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const username = $('#username').val();
    const password = $('#password').val();

    const validator = new FormValidator();

    const usernameResult = validator.username(username);
    const passwordResult = validator.password(password);

    if(!usernameResult.isValid) {
      $("#username+label.error").text(`* ${usernameResult.message}`);
      return;
    }
    if(!passwordResult.isValid) {
      $("#password+label.error").text(`* ${passwordResult.message}`);
      return;
    }

    //Send AJAX request to backend
    $.ajax({
      url: '/api/auth/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: function(response) {
        if (response.success) {
          // Store the JWT token in localStorage
          localStorage.setItem('token', response.token);
          // Redirect to dashboard
          window.location.href = '/';
        } else {
          // Show error message
          alert(response.message);
        }
      },
      error: function(xhr, status, error) {
        // Handle error
        alert('An error occurred. Please try again.');
      }
    });
  });
})