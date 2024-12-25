const RESOLUTIONS_URL = 'https://script.google.com/macros/s/AKfycbwnyxpx7iiJ303_GYdSfjFOsryitUFHExdClohx0xZb6WphR3Q51AzEahH1kGmNsjU8uA/exec'; // Replace with your Google Apps Script Web App URL

document.getElementById('resolutionForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const resolutionText = document.getElementById('resolution').value;

    // Send data to Google Apps Script
    fetch(RESOLUTIONS_URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'addResolution',
            name: name,
            resolution: resolutionText
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('Resolution submitted successfully!');
        document.getElementById('resolution').value = ''; // Clear the resolution field
        document.getElementById('name').value = ''; // Clear the name field
    })
    .catch(error => alert('Error submitting resolution'));
});

// Password-protected resolutions section
function showPasswordPrompt() {
    document.getElementById('passwordModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('passwordModal').style.display = 'none';
}

function checkPassword() {
    const enteredPassword = document.getElementById('password').value;
    const correctPassword = 'NewYear2025'; // Password for resolutions

    if (enteredPassword === correctPassword) {
        getResolutions();
        closeModal();
    } else {
        alert('Incorrect password!');
    }
}

// Fetch resolutions from the Google Apps Script
function getResolutions() {
    fetch(RESOLUTIONS_URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'getResolutions'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        let resolutionListHtml = '<h3>New Year\'s Resolutions:</h3><ul>';
        data.resolutions.forEach(row => {
            resolutionListHtml += `<li><strong>${row.name}</strong>: ${row.resolution}</li>`;
        });
        resolutionListHtml += '</ul>';
        document.getElementById('resolutionList').innerHTML = resolutionListHtml;
        document.getElementById('resolutionList').style.display = 'block';
    });
}
