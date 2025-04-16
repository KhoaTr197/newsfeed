class FormValidator {
  constructor() {
    this.config = {
      username: {
        minLength: 3,
        maxLength: 20,
        allowedChars: /^[a-zA-Z0-9_]+$/, // Letters, numbers, underscores only
        noSpaces: true,
      },
      password: {
        minLength: 8,
        maxLength: 30,
        mustContain: {
          uppercase: /[A-Z]/, // At least one uppercase letter
          lowercase: /[a-z]/, // At least one lowercase letter
          number: /[0-9]/, // At least one number
          specialChar: /[!@#$%^&*(),.?":{}|<>]/, // At least one special character
        },
        noSpaces: true,
      },
    };
  }
  username(value) {
    const config = this.config.username;
    const result = {
      isValid: true,
      message: ""
    };
    value = String(value);

    if (!value) {
      result.isValid = false;
      result.message = "Username can't be empty"
    }
    else if (value.length < config.minLength) {
      result.isValid = false;
      result.message = `Username must be at least ${config.minLength} characters long`
    }
    else if (value.length > config.maxLength) {
      result.isValid = false;
      result.message = `Username must not exceed ${config.maxLength} characters`
    }
    else if (config.noSpaces && /\s/.test(value)) {
      result.isValid = false;
      result.message = "Username must not contain spaces"
    }
    else if (!config.allowedChars.test(value)) {
      result.isValid = false;
      result.message = "Username can only contain letters, numbers and underscores"
    }

    return result;
  }
  password(value) {
    const config = this.config.password;
    const result = {
      isValid: false,
      message: ""
    };
    value = String(value);

    if (!value) {
      result.message = "Password can't be empty"
    }
    else if (value.length < config.minLength) {
      result.message = `Password must be at least ${config.minLength} characters long`
    }
    else if (value.length > config.maxLength) {
      result.message = `Password must not exceed ${config.maxLength} characters`
    }
    else if (config.noSpaces && /\s/.test(value)) {
      result.message = "Password must not contain spaces"
    }
    else if (!config.mustContain.lowercase.test(value)) {
      result.message = "Password must contain at least one lowercase letter"
    }
    else if (!config.mustContain.lowercase.test(value)) {
      result.message = "Password must contain at least one lowercase letter"
    }
    else if (!config.mustContain.uppercase.test(value)) {
      result.message = "Password must contain at least one uppercase letter"
    }
    else if (!config.mustContain.number.test(value)) {
      result.message = "Password must contain at least one number"
    }
    else if (!config.mustContain.specialChar.test(value)) {
      result.message = "Password must contain at least one special character (!@#$%)"
    } else {
      result.isValid = true
    }

    return result;
  }
}

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

    // Send AJAX request to backend
    // $.ajax({
    //   url: '/api/login', // Replace with your backend login endpoint
    //   type: 'POST',
    //   contentType: 'application/json',
    //   data: JSON.stringify({ username, password }),
    //   success: function(response) {
    //     if (response.success) {
    //       // Store the JWT token in localStorage
    //       localStorage.setItem('token', response.token);
    //       // Redirect to dashboard
    //       window.location.href = '/dashboard';
    //     } else {
    //       // Show error message
    //       alert(response.message);
    //     }
    //   },
    //   error: function(xhr, status, error) {
    //     // Handle error
    //     alert('An error occurred. Please try again.');
    //   }
    // });
  });
})