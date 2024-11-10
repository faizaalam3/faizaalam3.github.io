const createProjectTile = (projectData) => {
    const projectTile = document.createElement('div');
    projectTile.classList.add('project-tile');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    const projectTitle = document.createElement('h2');
    projectTitle.textContent = projectData.title;

    const projectLocation = document.createElement('p');
    projectLocation.classList.add('project-location');
    projectLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${projectData.workingPlace}`;

    const tagsContainer = document.createElement('div');
    tagsContainer.classList.add('tags-container');

    projectData.technology.forEach(tech => {
        const tag = document.createElement('span');
        tag.classList.add('tag');
        tag.textContent = tech;
        tagsContainer.appendChild(tag);
    });

    const projectDescription = document.createElement('p');
    projectDescription.classList.add('project-description');
    const maxDescriptionLength = 500; // Adjust this value as needed

    if (projectData.description.length > maxDescriptionLength) {
        projectDescription.textContent = projectData.description.substring(0, maxDescriptionLength) + '... ';
        const readMoreLink = document.createElement('span');
        readMoreLink.classList.add('read-more-button');
        readMoreLink.textContent = 'Read More';
        
        // On clicking "Read More", redirect to project-detail.html with the project ID in the URL
        readMoreLink.onclick = () => {
            const projectId = projectData.id; // Assuming projectData has a unique id field
            window.open(`/sections/projects/project-detail.html?projectId=${projectData.id}`, '_blank');
        };
        
        projectDescription.appendChild(readMoreLink); // Append Read More text
    } else {
        projectDescription.textContent = projectData.description;
    }

    // Container for links (Android, iOS)
    const linkButtonsContainer = document.createElement('div');
    linkButtonsContainer.classList.add('link-buttons-container');

    const detailsButton = document.createElement('button');
    detailsButton.classList.add('details-button');
    detailsButton.textContent = 'View Details';
    detailsButton.onclick = () => {
        const projectId = projectData.id;
        window.open(`/sections/projects/project-detail.html?projectId=${projectData.id}`, '_blank');
    };
    linkButtonsContainer.appendChild(detailsButton);


    if (projectData.iosLink) {
        if (projectData.iosLink.trim() != "") {
            const iosButton = document.createElement('button');
            iosButton.classList.add('ios-button');
            iosButton.textContent = 'iOS';
            iosButton.onclick = () => {
                window.open(projectData.iosLink, '_blank');
            };
            linkButtonsContainer.appendChild(iosButton);
        }
    }

    if (projectData.androidLink) {
        if (projectData.androidLink != "") {
            const androidButton = document.createElement('button');
            androidButton.classList.add('android-button');
            androidButton.textContent = 'Android';
            androidButton.onclick = () => {
                window.open(projectData.androidLink, '_blank');
            };
            linkButtonsContainer.appendChild(androidButton);
        }
    }

    contentContainer.appendChild(projectTitle);
    contentContainer.appendChild(projectLocation);
    contentContainer.appendChild(tagsContainer);
    contentContainer.appendChild(projectDescription);
    contentContainer.appendChild(linkButtonsContainer);

    const projectImage = document.createElement('img');
    projectImage.src = projectData.image;
    projectImage.alt = projectData.title;
    projectImage.classList.add('project-image');

    // Make the image clickable to navigate to the project detail page
    projectImage.onclick = () => {
        const projectId = projectData.id;
        window.open(`/sections/projects/project-detail.html?projectId=${projectData.id}`, '_blank');
    };

    projectTile.appendChild(contentContainer);
    projectTile.appendChild(projectImage);

    return projectTile;
};

export { createProjectTile };
