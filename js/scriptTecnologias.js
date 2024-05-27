document.addEventListener("DOMContentLoaded", function() {
    const tecnologiasPath = 'images/tecnologias';
    const imageWrapper = document.querySelector('.image-wrapper');
    const perView = 5;
    let totalScroll = 0;
    const delay = 3000;

    fetch(`${tecnologiasPath}/data.txt`)
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
                const imgDiv = document.createElement('div');
                const img = document.createElement('img');
                img.src = `${tecnologiasPath}/${imgName}.png`;
                img.alt = imgTitle;

                const titleElement = document.createElement('p');
                titleElement.className = 'technology-title';
                titleElement.textContent = imgTitle;

                imgDiv.appendChild(img);
                imgDiv.appendChild(titleElement);
                imageWrapper.appendChild(imgDiv);
            }

            imageWrapper.style.setProperty('--per-view', perView);
            const imageItems = document.querySelectorAll('.image-wrapper > *');
            const imageLength = imageItems.length;

            for (let i = 0; i < perView; i++) {
                imageWrapper.insertAdjacentHTML('beforeend', imageItems[i].outerHTML);
            }

            let autoScroll = setInterval(scrolling, delay);

            function scrolling() {
                totalScroll++;
                if (totalScroll == imageLength + 1) {
                    clearInterval(autoScroll);
                    totalScroll = 1;
                    imageWrapper.style.transition = '0s';
                    imageWrapper.style.left = '0';
                    autoScroll = setInterval(scrolling, delay);
                }
                const widthEl = document.querySelector('.image-wrapper > :first-child').offsetWidth + 24;
                imageWrapper.style.left = `-${totalScroll * widthEl}px`;
                imageWrapper.style.transition = '.3s';
            }
        })
        .catch(error => {
            console.error('Error fetching the data file:', error);
        });
});
