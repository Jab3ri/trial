document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent normal form submission

    // Clear previous error messages
    document.getElementById('errorMessage').textContent = '';
    document.getElementById('successMessage').style.display = 'none';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    if (name === '' || email === '' || phone === '' || address === '') {
        document.getElementById('errorMessage').textContent = 'All fields are required!';
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('errorMessage').textContent = 'Please enter a valid email address.';
        return;
    }

    if (!/^\d+$/.test(phone)) {
        document.getElementById('errorMessage').textContent = 'Phone number must contain only digits.';
        return;
    }

    const formData = {
        name: name,
        email: email,
        phone: phone,
        address: address
    };

    fetch('/submit_registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('successMessage').style.display = 'block';
        } else {
            document.getElementById('errorMessage').textContent = data.error;
        }
    })
    .catch(error => {
        document.getElementById('errorMessage').textContent = 'An error occurred. Please try again.';
    });
});
