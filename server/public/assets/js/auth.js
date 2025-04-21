$(document).ready(() => {
  $('#login-form').on('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
    $(".form-error").text("").hide(); // Hide error message and clear text

    // Get form data
    const username = $('#username').val();
    const password = $('#password').val();

    const validator = new FormValidator({
      username: {
        minLength: 3,
        maxLength: 20,
        allowedChars: /^[a-zA-Z0-9_]+$/,
        noSpaces: true,
      },
      password: {
        minLength: 3,
        maxLength: 30,
        mustContain: null,
        noSpaces: true
      }
    });

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
  $('#signup-form').on('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
    $(".form-error").text("").hide(); // Hide error message and clear text
    // Get form data
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();

    const validator = new FormValidator({
      username: {
        minLength: 3,
        maxLength: 20,
        allowedChars: /^[a-zA-Z0-9_]+$/,
        noSpaces: true,
      },
      email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      },
      password: {
        minLength: 3,
        maxLength: 30,
        mustContain: null,
        noSpaces: true
      }
    });

    const usernameResult = validator.username(username);
    const emailResult = validator.email(email);
    const passwordResult = validator.password(password);

    if (!usernameResult.isValid) {
      $("#username+label.error").text(`* ${usernameResult.message}`);
      return;
    }
    if (!emailResult.isValid) {
      $("#email+label.error").text(`* ${emailResult.message}`);
      return;
    }
    if (!passwordResult.isValid) {
      $("#password+label.error").text(`* ${passwordResult.message}`);
      return;
    }

    //Send AJAX request to backend
    $.ajax({
      url: '/api/auth/signup',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, email, password }),
      success: function (response) {
        if (response.success) {
          // Redirect to login page
          window.location.href = '/login';
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