document.addEventListener("DOMContentLoaded", function() {
    const projectsPath = 'images/proyectos';
    const projectsSection = document.getElementById('projects');

    const projects = [
        { folder: 'proyecto1', images: ['img1.png', 'img2.png'] },
        { folder: 'proyecto2', images: ['img1.png', 'img2.png'] }
        // Añade más proyectos aquí
    ];

    // Limpiar solo los elementos 'div' con la clase 'project'
    Array.from(projectsSection.getElementsByClassName('project')).forEach(element => element.remove());

    const projectsContainer = document.createElement('div');
    projectsContainer.className = 'projects-container';
    projectsSection.appendChild(projectsContainer);

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';

        const img = document.createElement('img');
        img.src = `${projectsPath}/${project.folder}/${project.images[0]}`;
        img.className = 'project-image fade-in';

        const titleElement = document.createElement('p');
        titleElement.className = 'project-title';
        projectDiv.appendChild(img);
        projectDiv.appendChild(titleElement);

        // Leer el archivo data.txt para obtener el título del proyecto
        fetch(`${projectsPath}/${project.folder}/data.txt`)
            .then(response => response.text())
            .then(data => {
                const titleMatch = data.match(/title="([^"]+)"/);
                if (titleMatch && titleMatch[1]) {
                    titleElement.textContent = titleMatch[1];
                } else {
                    titleElement.textContent = "Sin título";
                }
            });

        projectsContainer.appendChild(projectDiv);

        let currentIndex = 0;
        let intervalId;

        const startImageTransition = () => {
            intervalId = setInterval(() => {
                img.classList.remove('fade-in');
                img.classList.add('fade-out');

                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % project.images.length;
                    img.src = `${projectsPath}/${project.folder}/${project.images[currentIndex]}`;
                    img.classList.remove('fade-out');
                    img.classList.add('fade-in');
                }, 500); // Duración de la animación de fade-out
            }, 2000); // Cambia este valor para ajustar el tiempo entre transiciones
        };

        const stopImageTransition = () => {
            clearInterval(intervalId);
        };

        projectDiv.addEventListener('mouseenter', startImageTransition);
        projectDiv.addEventListener('mouseleave', stopImageTransition);
    });
});
