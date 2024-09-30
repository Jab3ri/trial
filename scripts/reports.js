document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('errorMessage').textContent = '';
    document.getElementById('successMessage').style.display = 'none';

    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (startDate === '' || endDate === '') {
        document.getElementById('errorMessage').textContent = 'All fields are required!';
        return;
    }

    const formData = {
        startDate: startDate,
        endDate: endDate
    };

    fetch('/generate_report', {
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
