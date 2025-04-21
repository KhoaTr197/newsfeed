$(document).ready(() => {
  $('#login-form').on('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
    $(".form-error").text("").hide(); // Hide error message and clear text

    // Get form data
    const username = $('#username').val();
    const password = $('#password').val();

    const validator = new FormValidator();

    const usernameResult = validator.username(username);
    const passwordResult = validator.password(password);

    if (!usernameResult.isValid) {
      $("#username+label.error").text(`* ${usernameResult.message}`);
      return;
    }
    if (!passwordResult.isValid) {
      $("#password+label.error").text(`* ${passwordResult.message}`);
      return;
    }

    //Send AJAX request to backend
    $.ajax({
      url: '/api/auth/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: function (response) {
        if (response.success) {
          // Redirect to admin dashboard
          window.location.href = '/admin';
        } else {
          // Show error message
          $(".form-error").text("Something went wrong! Please Try Again").show();
        }
      },
      error: function (xhr, status, error) {
        // Show error message
        if (xhr.responseJSON) {
          $(".form-error").text(xhr.responseJSON.message).show();
        }
      }
    });
  });
})