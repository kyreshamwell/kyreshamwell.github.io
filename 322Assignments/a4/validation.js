document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('getinfo');

    form.onsubmit = function(event) {
        event.preventDefault(); // Prevent the form from actually submitting

        // Validate Username
        var usernameInput = document.getElementById('username');
        usernameInput.setAttribute('data-field-name', 'Username');
        var username = usernameInput.value;
        validateField(usernameInput, username.length >= 4 && username.length <= 12, "Username", "a valid username between 4 and 12 characters.");

        
        // Validate Email
        var emailInput = document.getElementById('email');
        emailInput.setAttribute('data-field-name', 'Email');
        var email = emailInput.value;
        var emailRegex = /[^@]+@[^@]+\.(com|net|org|edu)/;
        validateField(emailInput, emailRegex.test(email), "Email", "a valid email.");


        // Validate Phone Number
        var phoneNumberInput = document.getElementById('phoneNumber');
        phoneNumberInput.setAttribute('data-field-name', 'Phone Number');
        var phone = phoneNumberInput.value;
        var phoneRegex = /^\(\d{3}\)-\d{3}-\d{4}$/;
        validateField(phoneNumberInput, phoneRegex.test(phone), "Phone Number", "a valid phone number format.");


        // Validate Password
        var passwordInput = document.getElementById('password');
        passwordInput.setAttribute('data-field-name', 'Password');
        var password = passwordInput.value;
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{9,}$/;
        validateField(passwordInput, passwordRegex.test(password), "Password", "Password longer than 8 characters, has an uppercase, lowercase, a number, and special character.");


        // Validate Confirm Password
        var confirmPasswordInput = document.getElementById('confirmPassword');
        confirmPasswordInput.setAttribute('data-field-name', 'Confirm Password');
        var confirmPassword = confirmPasswordInput.value;
        var password = document.getElementById('password').value;
        validateField(confirmPasswordInput, password === confirmPassword && confirmPassword.length > 0, "Confirm Password ", " Password that matches.");


        // Validate Gender
        var genderInputs = document.querySelectorAll('input[name="gender"]');
        var genderSelected = Array.from(genderInputs).some(input => input.checked);
        validateField(genderInputs[0], genderSelected, "Gender", " a gender.");


        // Validate Age
        var ageSelect = document.getElementById('age');
        var ageSelected = ageSelect.value !== 'i';
        validateField(ageSelect, ageSelected, "Age group", " an age group.");

      
        // Validate Favorite Genre
        var genreInputs = document.querySelectorAll('input[name="genre"]');
        var genreSelected = Array.from(genreInputs).some(input => input.checked);
        validateField(genreInputs[0], genreSelected, "Genre ", " at least one genre.");
        
    };

    // This whole funtion works on printing the correct error messages 
    function validateField(input, isValid, errorMessage, warningMessage = null) {
        var errorList = document.getElementById("error-list");
    
        // Determine the correct identifier for the input or group of inputs
        var errorIdentifier = input.id || input.name;
    
        // Remove previous error for this input if exists
        var existingError = document.querySelector(`#error-list .error-${errorIdentifier}`);
        if (existingError) {
            errorList.removeChild(existingError);
        }
    
        // If the field is invalid, determine the type of message to display
        if (!isValid) {
            var errorItem = document.createElement("li");
            errorItem.className = `error-${errorIdentifier}`; // Add a specific class to identify the error element
    
            const constantPart = "Please Enter "; // This part remains in default text color
    
            if (input.type === 'select-one' && input.value === 'i') {
                // For select inputs with the placeholder 'i' as value
                errorItem.innerHTML = `<span>${constantPart}</span><span style="color: red;">${errorMessage}</span>`;
                input.style.borderColor = 'red';
            } else if (input.type !== 'radio' && input.type !== 'checkbox' && input.value) {
                // For individual text inputs with some incorrect value
                const warningText = warningMessage || errorMessage;
                errorItem.innerHTML = `${constantPart}<span style="color: darkorange;">${warningText}</span>`;
                input.style.borderColor = 'darkorange';
    
                // Specific case for password mismatch
                if (input.id === 'confirmPassword') {
                    alert("Passwords do not match.");
                }
            } else if (!input.value || input.type === 'radio' || input.type === 'checkbox') {
                // For empty text inputs or unselected radio/checkbox
                errorItem.innerHTML = `<span>${constantPart}<span style="color: red;">${errorMessage}</span></span>`;
                input.style.borderColor = 'red';
            }
    
            errorList.appendChild(errorItem);
        } else {
            input.style.borderColor = '';
        }
    }
    
    
    
    window.clearForm = function() {
        // Clears all the information in each textbox 
        var form = document.getElementById('getinfo'); 
        form.reset(); 
    
        // Clear all input border colors
        var inputs = form.querySelectorAll('input, select');
        inputs.forEach(function(input) {
            input.style.borderColor = '';
        });
    
        // Clear the error messages from the list
        var errorList = document.getElementById('error-list');
        if (errorList) {
            errorList.innerHTML = ''; // Clear the list's contents
        }
    };
    
    
});
