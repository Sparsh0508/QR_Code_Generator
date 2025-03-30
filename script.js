
function showForm(formId) {
    const forms = document.querySelectorAll('.qr-form');
    forms.forEach(form => {
        form.style.display = 'none';
    });

    const selectedForm = document.getElementById(formId);
    if (selectedForm) {
        selectedForm.style.display = 'block';
    }
}

// Function to update the hex value when color is selected
function updateHex(colorId, hexId) {
    const colorPicker = document.getElementById(colorId);
    const hexInput = document.getElementById(hexId);
    hexInput.value = colorPicker.value;
}

// Function to generate the QR Code
function generatorQRCode() {
    // const formId = document.querySelector('.qr-form[style="display: block;"]').id;
    // let qrData = '';

    const formId = document.querySelector('.qr-form[style="display: block;"]').id;

    // Validate form before generating the QR code
    if (!validateForm(formId)) {
        return;  // Stop if validation fails
    }

    let qrData = '';
    
    // Extracting data based on the selected form
    switch (formId) {
        case 'link':
            const linkUrl = document.getElementById('link-url').value;
            qrData = linkUrl ? linkUrl : '';
            break;

        case 'email':
            const email = document.getElementById('E-Mail').value;
            const subject = document.getElementById('Email-Subject').value;
            const message = document.getElementById('EmailMessage').value;
            qrData = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            break;

        case 'wifi':
            const ssid = document.getElementById('Wifi').value;
            const password = document.querySelector('#wifi input[placeholder="Enter Wi-Fi Password:"]').value;
            qrData = `WIFI:T:WPA;S:${ssid};P:${password};;`;
            break;

        case 'call':
            const callNumber = document.getElementById('call-url').value;
            qrData = `tel:${callNumber}`;
            break;

        case 'event':
            const eventTitle = document.getElementById('event').value;
            const startDate = document.getElementById('Start').value;
            const endDate = document.getElementById('end').value;
            const location = document.getElementById('Location').value;
            qrData = `BEGIN:VEVENT\nSUMMARY:${eventTitle}\nDTSTART:${startDate.replace(/-/g, '')}\nDTEND:${endDate.replace(/-/g, '')}\nLOCATION:${location}\nEND:VEVENT`;
            break;

        case 'text':
            qrData = document.querySelector('#text textarea').value;
            break;

        case 'sms':
            const smsNumber = document.getElementById('sms-number').value;
            const smsMessage = document.getElementById('smsmessage').value;
            qrData = `SMSTO:${smsNumber}:${smsMessage}`;
            break;

        case 'whatsapp':
            const whatsappNumber = document.getElementById('whatsappnumber').value;
            const whatsappMessage = document.getElementById('whatsappmessage').value;
            qrData = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            break;

        case 'social':
            const socialUrl = document.getElementById('socialurl').value;
            qrData = socialUrl;
            break;

        default:
            alert('Please select a form to generate QR Code');
            return;
    }

    // QR code colors
    const qrColor = document.getElementById('qr-color').value;
    const qrBgColor = document.getElementById('bg-color').value;

    // Generating QR Code
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code

    new QRCode(qrCodeContainer, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: qrColor,
        colorLight: qrBgColor,
        correctLevel: QRCode.CorrectLevel.H
    });
}


function downloadQRCode() {
    const qrCodeContainer = document.getElementById('qr-code').querySelector('img');
    if (!qrCodeContainer) {
        alert("Please generate a QR code first.");
        return;
    }

    const link = document.createElement('a');
    link.href = qrCodeContainer.src;
    link.download = 'qr_code.png';
    link.click();
}


function clearForm() {
    const forms = document.querySelectorAll('.qr-form');
    forms.forEach(form => {
        form.reset();
    });
    document.getElementById("qr-code").innerHTML = "";
}
function validateForm(formId) {
    let isValid = true;
    let errorMessage = "";

    switch (formId) {
        case "link":
            const linkUrl = document.getElementById("link-url").value;
            if (!linkUrl || !/^https?:\/\/[^\s]+$/.test(linkUrl)) {
                errorMessage = "Please enter a valid URL (e.g., https://example.com).";
                isValid = false;
            }
            break;

        case "email":
            const email = document.getElementById("E-Mail").value;
            if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                errorMessage = "Please enter a valid email address.";
                isValid = false;
            }
            break;

        case "text":
            const textMessage = document.querySelector('#text textarea').value;
            if (!textMessage) {
                errorMessage = "Please enter a text message.";
                isValid = false;
            }
            break;

        case "call":
            const callNumber = document.getElementById("call-url").value;
            if (!callNumber || !/^\+?\d{10,15}$/.test(callNumber)) {
                errorMessage = "Please enter a valid phone number.";
                isValid = false;
            }
            break;

        case "sms":
            const smsNumber = document.getElementById("sms-number").value;
            if (!smsNumber || !/^\+?\d{10,15}$/.test(smsNumber)) {
                errorMessage = "Please enter a valid SMS number.";
                isValid = false;
            }
            break;

        case "whatsapp":
            const whatsappNumber = document.getElementById("whatsappnumber").value;
            if (!whatsappNumber || !/^\+?\d{10,15}$/.test(whatsappNumber)) {
                errorMessage = "Please enter a valid WhatsApp number.";
                isValid = false;
            }
            break;

        case "wifi":
            const wifiSSID = document.getElementById("Wifi").value;
            const wifiPassword = document.querySelector('#wifi input[placeholder="Enter Wi-Fi Password:"]').value;

            if (!wifiSSID) {
                errorMessage = "Please enter a WiFi SSID.";
                isValid = false;
            }
            if (!wifiPassword) {
                errorMessage = "Please enter a WiFi Password.";
                isValid = false;
            }
            break;

        case "event":
            const eventTitle = document.getElementById("event").value;
            const eventStartDate = document.getElementById("Start").value;
            const eventEndDate = document.getElementById("end").value;
            const eventLocation = document.getElementById("Location").value;

            if (!eventTitle) {
                errorMessage = "Please enter an event title.";
                isValid = false;
            } else if (!eventStartDate) {
                errorMessage = "Please enter a start date.";
                isValid = false;
            } else if (!eventEndDate) {
                errorMessage = "Please enter an end date.";
                isValid = false;
            } else if (!eventLocation) {
                errorMessage = "Please enter an event location.";
                isValid = false;
            } else if (new Date(eventEndDate) < new Date(eventStartDate)) {
                errorMessage = "Event start date cannot be later than end date.";
                isValid = false;
            }
            break;

        case "social":
            const socialMediaUrl = document.getElementById("socialurl").value;
            if (!socialMediaUrl || !/^https?:\/\/[^\s]+$/.test(socialMediaUrl)) {
                errorMessage = "Please enter a valid social media URL (e.g., https://facebook.com).";
                isValid = false;
            }
            break;

        default:
            isValid = true;
    }

    if (!isValid) {
        alert(errorMessage);
    }
    return isValid;
}
