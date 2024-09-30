document.getElementById('billingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('errorMessage').textContent = '';
    document.getElementById('successMessage').style.display = 'none';

    const customerId = document.getElementById('customerId').value;
    const amountDue = document.getElementById('amountDue').value;

    if (customerId === '' || amountDue === '') {
        document.getElementById('errorMessage').textContent = 'All fields are required!';
        return;
    }

    const formData = {
        customerId: customerId,
        amountDue: amountDue
    };

    fetch('/generate_bill', {
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
