const messageBox = document.getElementById('div-message');
        const messageInput = document.getElementById('message');
        const sendButton = document.getElementById('send-btn');
        const locationButton = document.getElementById('location');

        const wsURI = 'wss://echo-ws-service.herokuapp.com/';
        let websocket = new WebSocket(wsURI);

        function writeToScreen(message, messageType) {
            let messageElement = document.createElement("div");

            // Add a CSS class based on the message type
            messageElement.classList.add(messageType.toLowerCase());

            // Check if the message contains a link and make it clickable
            const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;
            const match = message.match(linkRegex);

            if (match) {
                const link = document.createElement('a');
                link.href = match[2];
                link.target = '_blank';
                link.textContent = 'Location';
                messageElement.innerHTML = link.outerHTML;
            } else {
                messageElement.textContent = message;
            }

            messageBox.appendChild(messageElement);
            messageBox.scrollTop = messageBox.scrollHeight;
        }

        websocket.onopen = (event) => {
            console.log('WebSocket connection opened:', event);
        };

        websocket.onmessage = (event) => {
            const message = event.data;
            const messageType = getMessageType(message);

            // Display the response message unless it's a location message
            if (messageType !== 'LOCATION') {
                writeToScreen(message, 'RESPONSE');
            }
        };

        websocket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        websocket.onerror = (event) => {
            console.error('WebSocket error:', event);
        };

        function sendMessage(message, messageType) {
            writeToScreen(message, messageType);
            websocket.send(message);
            messageInput.value = '';
        }

        function getMessageType(message) {
            const firstWord = message.split(' ')[0].toUpperCase();
            return firstWord;
        }

        sendButton.addEventListener('click', () => {
            const message = messageInput.value.trim();
            if (message) {
                sendMessage(message, 'SENT');
            }
        });

        messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const message = messageInput.value.trim();
                if (message) {
                    sendMessage(message, 'SENT');
                }
            }
        });

        locationButton.addEventListener('click', () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const osmLink = document.createElement('a');
                    osmLink.href = `https://www.openstreetmap.org/?mlat=${position.coords.latitude}&mlon=${position.coords.longitude}`;
                    osmLink.target = '_blank';
                    osmLink.textContent = 'Location';

                    // Display only the content of the "SENT" message for the location
                    writeToScreen(osmLink.outerHTML, 'SENT');
                }, (error) => {
                    console.error('Error getting location:', error);
                });
            } else {
                console.error('Geolocation is not supported by your browser');
            }
        });