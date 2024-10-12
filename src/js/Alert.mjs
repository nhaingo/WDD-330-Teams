const alertsUrl = '/json/alerts.json';

export default class Alert {
    constructor() {
        this.alerts = [];
        this.loadAlerts();
    }

    async loadAlerts() {
        try {
            const response = await fetch(alertsUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch alerts');
            }
            this.alerts = await response.json();
            this.displayAlerts();
        } catch (error) {
            console.error('Error loading alerts:', error);
        }
    }

    displayAlerts() {
        if (this.alerts.length > 0) {
            const alertSection = document.createElement('section');
            alertSection.classList.add('alert-list');

            this.alerts.forEach(alert => {
                const alertMessage = document.createElement('p');
                alertMessage.textContent = alert.message;
                alertMessage.style.backgroundColor = alert.background;
                alertMessage.style.color = alert.color;
                alertMessage.style.padding = '10px';
                alertMessage.style.margin = '10px 0';
                alertMessage.style.position = 'relative';

                const closeButton = document.createElement('span');
                closeButton.textContent = ' ×';
                closeButton.style.cursor = 'pointer';
                closeButton.style.position = 'absolute';
                closeButton.style.right = '10px';
                closeButton.style.top = '50%';
                closeButton.style.transform = 'translateY(-50%)';
                closeButton.style.color = alert.color;

                closeButton.addEventListener('click', () => {
                    alertSection.removeChild(alertMessage);
                    if (alertMessage.parentNode) {
                        alertMessage.parentNode.removeChild(alertMessage);
                    }
                });

                alertMessage.appendChild(closeButton);
                alertSection.appendChild(alertMessage);
            });

            const mainElement = document.querySelector('main');
            mainElement.prepend(alertSection);
        }
    }
}