// scriptCertifications.js
document.addEventListener("DOMContentLoaded", function() {
    const certsPath = 'images/certificaciones';
    const certsContainer = document.querySelector('.certs-container');

    fetch(`${certsPath}/data.txt`)
        .then(response => response.text())
        .then(data => {
            const imageNameMap = {};
            const lines = data.split('\n');
            lines.forEach(line => {
                const match = line.match(/(img\d+)="([^"]+)"/);
                if (match) {
                    imageNameMap[match[1]] = match[2];
                }
            });

            for (const [imgName, imgTitle] of Object.entries(imageNameMap)) {
                const certDiv = document.createElement('div');
                certDiv.className = 'cert';

                const img = document.createElement('img');
                img.src = `${certsPath}/${imgName}.png`;
                img.className = 'cert-image';
                img.alt = imgTitle;

                const titleElement = document.createElement('p');
                titleElement.className = 'cert-title';
                titleElement.textContent = imgTitle;

                certDiv.appendChild(img);
                certDiv.appendChild(titleElement);
                certsContainer.appendChild(certDiv);
            }
        })
        .catch(error => {
            console.error('Error fetching the data file:', error);
        });
});
