class FormValidator {
  constructor(config) {
    this.config = config || {
      username: {
        minLength: 3,
        maxLength: 20,
        allowedChars: /^[a-zA-Z0-9_]+$/, // Letters, numbers, underscores only
        noSpaces: true,
      },
      email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
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
      isValid: false,
      message: ""
    };
    value = String(value);

    if (!value) {
      result.message = "Username can't be empty"
    }
    else if (value.length < config.minLength) {
      result.message = `Username must be at least ${config.minLength} characters long`
    }
    else if (value.length > config.maxLength) {
      result.message = `Username must not exceed ${config.maxLength} characters`
    }
    else if (config.noSpaces && /\s/.test(value)) {
      result.message = "Username must not contain spaces"
    }
    else if (!config.allowedChars.test(value)) {
      result.message = "Username can only contain letters, numbers and underscores"
    } else {
      result.isValid = true;
    }

    return result;
  }
  email(value) {
    const config = this.config.email;
    const result = {
      isValid: false,
      message: ""
    };
    value = String(value);

    if (!value) {
      result.message = "Email can't be empty"
    }
    else if (!config.regex.test(value)) {
      result.message = "Invalid email"
    } else {
      result.isValid = true;
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
    else if (config.mustContain && config.mustContain.lowercase && !config.mustContain.lowercase.test(value)) {
      result.message = "Password must contain at least one lowercase letter"
    }
    else if (config.mustContain && config.mustContain.uppercase && !config.mustContain.uppercase.test(value)) {
      result.message = "Password must contain at least one uppercase letter"
    }
    else if (config.mustContain && config.mustContain.number && !config.mustContain.number.test(value)) {
      result.message = "Password must contain at least one number"
    }
    else if (config.mustContain && config.mustContain.specialChar && !config.mustContain.specialChar.test(value)) {
      result.message = "Password must contain at least one special character (!@#$%)"
    } else {
      result.isValid = true;
    }

    return result;
  }
}