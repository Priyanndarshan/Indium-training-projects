// Password visibility toggle
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
let passwordVisible = false;
togglePassword.addEventListener("click", function() {
    passwordVisible = !passwordVisible;
    passwordInput.type = passwordVisible ? "text" : "password";
    // Change icon (optional: add a slash for hidden)
    togglePassword.innerHTML = passwordVisible
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5z" stroke="#374151" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3.5" stroke="#374151" stroke-width="2" fill="none"/><line x1="4" y1="20" x2="20" y2="4" stroke="#dc2626" stroke-width="2"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5z" stroke="#374151" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3.5" stroke="#374151" stroke-width="2" fill="none"/></svg>';
});
// Real-time Last Name validation
function validateLastNameRealtime() {
    const lastNameInput = document.getElementById("lastName");
    const lastNameError = document.getElementById("lastNameError");
    if (lastNameInput.value.trim() === "") {
        lastNameInput.style.borderColor = "#dc2626";
        lastNameInput.placeholder = "Last name is required";
        lastNameError.innerText = "Last name is required";
    } else {
        lastNameInput.style.borderColor = "#d1d5db";
        lastNameInput.placeholder = "";
        lastNameError.innerText = "";
    }
}

// When leaving first name or entering email, check last name
document.getElementById("firstName").addEventListener("blur", function() {
    validateLastNameRealtime();
});
document.getElementById("email").addEventListener("focus", function() {
    validateLastNameRealtime();
});
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let isValid = true;

    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value;

    // Clear previous errors
    document.getElementById("firstNameError").innerText = "";
    document.getElementById("lastNameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("phoneError").innerText = "";
    document.getElementById("passwordError").innerText = "";

    // First Name validation
    if (firstName === "") {
        document.getElementById("firstNameError").innerText = "First name is required";
        isValid = false;
    }

    // Last Name validation
    if (lastName === "") {
        document.getElementById("lastNameError").innerText = "Last name is required";
        isValid = false;
    }

    // Email validation
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        document.getElementById("emailError").innerText = "Enter a valid email";
        isValid = false;
    }

    // Phone validation
    let phonePattern = /^[0-9]{10}$/;
    if (!phone.match(phonePattern)) {
        document.getElementById("phoneError").innerText = "Enter a valid 10-digit phone number";
        isValid = false;
    }

    // Password validation
    if (password.length < 8) {
        document.getElementById("passwordError").innerText = "Password must be at least 8 characters";
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
        document.getElementById("myForm").reset();
        document.getElementById("passwordStrength").innerText = "";
    }
});


// Password Strength Checker
document.getElementById("password").addEventListener("input", function() {
    let password = this.value;
    let strengthText = document.getElementById("passwordStrength");

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (password.length === 0) {
        strengthText.innerText = "";
    } else if (strength <= 1) {
        strengthText.innerText = "Weak Password";
        strengthText.style.color = "red";
    } else if (strength <= 3) {
        strengthText.innerText = "Medium Password";
        strengthText.style.color = "orange";
    } else {
        strengthText.innerText = "Strong Password";
        strengthText.style.color = "green";
    }
});
