document.addEventListener('DOMContentLoaded', function () {
    const projectContainer = document.getElementById('project-container');
    const projectsDir = 'images/proyectos';

    fetch(projectsDir)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const projectFolders = Array.from(doc.querySelectorAll('a'))
                .filter(link => link.href.endsWith('/'))
                .map(link => link.textContent.trim());

            projectFolders.forEach(folder => {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project';

                const title = document.createElement('h3');
                title.textContent = folder;
                projectDiv.appendChild(title);

                const reelDiv = document.createElement('div');
                reelDiv.className = 'reel';

                fetch(`${projectsDir}/${folder}`)
                    .then(response => response.text())
                    .then(text => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(text, 'text/html');
                        const images = Array.from(doc.querySelectorAll('a'))
                            .filter(link => link.href.endsWith('.png'))
                            .map(link => link.href);

                        images.forEach(image => {
                            const imgElement = document.createElement('img');
                            imgElement.src = `${projectsDir}/${folder}/${image}`;
                            reelDiv.appendChild(imgElement);
                        });
                    });

                projectDiv.appendChild(reelDiv);
                projectContainer.appendChild(projectDiv);
            });
        });
});