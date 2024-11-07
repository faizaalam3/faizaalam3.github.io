// ui.js

// Function to create a project tile
const createProjectTile = (projectData) => {
    const projectTile = document.createElement('div');
    projectTile.classList.add('project-tile');

    const projectImage = document.createElement('img');
    projectImage.src = projectData.image;
    projectImage.alt = projectData.title;

    const projectTitle = document.createElement('h3');
    projectTitle.textContent = projectData.title;

    const projectWorkPlace = document.createElement('p');
    projectWorkPlace.textContent = `Working Place: ${projectData.workingPlace}`;

    const projectWorkType = document.createElement('p');
    projectWorkType.textContent = `Working Type: ${projectData.workingType}`;

    const projectDescription = document.createElement('p');
    projectDescription.textContent = projectData.description;
    projectDescription.classList.add('project-description');

    const seeMoreLink = document.createElement('a');
    seeMoreLink.href = '#';
    seeMoreLink.textContent = 'See More';
    seeMoreLink.classList.add('see-more-link');
    seeMoreLink.addEventListener('click', (e) => {
        e.preventDefault();
        showProjectDialog(projectData);
    });

    const projectLinks = document.createElement('div');
    projectLinks.classList.add('project-links');

    // Add Android, iOS, and Google Drive links if they exist
    if (projectData.androidLink) {
        const androidLink = document.createElement('a');
        androidLink.href = projectData.androidLink;
        androidLink.innerHTML = '<i class="fab fa-android"></i> Android';
        androidLink.target = '_blank';
        androidLink.classList.add('project-button');
        projectLinks.appendChild(androidLink);
    }

    if (projectData.iosLink) {
        const iosLink = document.createElement('a');
        iosLink.href = projectData.iosLink;
        iosLink.innerHTML = '<i class="fab fa-apple"></i> iOS';
        iosLink.target = '_blank';
        iosLink.classList.add('project-button');
        projectLinks.appendChild(iosLink);
    }

    if (projectData.driveLink) {
        const googleDriveLink = document.createElement('a');
        googleDriveLink.href = projectData.driveLink;
        googleDriveLink.innerHTML = '<i class="fab fa-google-drive"></i> Google Drive';
        googleDriveLink.target = '_blank';
        googleDriveLink.classList.add('project-button');
        projectLinks.appendChild(googleDriveLink);
    }

    const technologyContainer = document.createElement('div');
    technologyContainer.classList.add('technology-container');

    projectData.technology.forEach(tech => {
        const techChip = document.createElement('span');
        techChip.textContent = tech;
        techChip.classList.add('tech-chip');
        technologyContainer.appendChild(techChip);
    });

    projectTile.appendChild(projectImage);
    projectTile.appendChild(projectTitle);
    projectTile.appendChild(projectWorkPlace);
    projectTile.appendChild(projectWorkType);
    projectTile.appendChild(projectDescription);
    projectTile.appendChild(seeMoreLink);
    projectTile.appendChild(technologyContainer);
    projectTile.appendChild(projectLinks);

    return projectTile;
};

// Function to show project dialog with detailed information
const showProjectDialog = (projectData) => {
    const dialog = document.createElement('div');
    dialog.classList.add('project-dialog');

    const dialogContent = document.createElement('div');
    dialogContent.classList.add('project-dialog-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
        dialog.remove();
    });

    const projectImage = document.createElement('img');
    projectImage.src = projectData.image;
    projectImage.alt = projectData.title;

    const projectTitle = document.createElement('h3');
    projectTitle.textContent = projectData.title;

    const projectWorkPlace = document.createElement('p');
    projectWorkPlace.textContent = `Working Place: ${projectData.workingPlace}`;

    const projectWorkType = document.createElement('p');
    projectWorkType.textContent = `Working Type: ${projectData.workingType}`;

    const projectDescription = document.createElement('p');
    projectDescription.textContent = projectData.description;

    const projectLinks = document.createElement('div');
    projectLinks.classList.add('project-links');

    if (projectData.androidLink) {
        const androidLink = document.createElement('a');
        androidLink.href = projectData.androidLink;
        androidLink.innerHTML = '<i class="fab fa-android"></i> Android';
        androidLink.target = '_blank';
        androidLink.classList.add('project-button');
        projectLinks.appendChild(androidLink);
    }

    if (projectData.iosLink) {
        const iosLink = document.createElement('a');
        iosLink.href = projectData.iosLink;
        iosLink.innerHTML = '<i class="fab fa-apple"></i> iOS';
        iosLink.target = '_blank';
        iosLink.classList.add('project-button');
        projectLinks.appendChild(iosLink);
    }

    if (projectData.driveLink) {
        const googleDriveLink = document.createElement('a');
        googleDriveLink.href = projectData.driveLink;
        googleDriveLink.innerHTML = '<i class="fab fa-google-drive"></i> Google Drive';
        googleDriveLink.target = '_blank';
        googleDriveLink.classList.add('project-button');
        projectLinks.appendChild(googleDriveLink);
    }

    const technologyContainer = document.createElement('div');
    technologyContainer.classList.add('technology-container');

    projectData.technology.forEach(tech => {
        const techChip = document.createElement('span');
        techChip.textContent = tech;
        techChip.classList.add('tech-chip');
        technologyContainer.appendChild(techChip);
    });

    dialogContent.appendChild(closeButton);
    dialogContent.appendChild(projectImage);
    dialogContent.appendChild(projectTitle);
    dialogContent.appendChild(projectWorkPlace);
    dialogContent.appendChild(projectWorkType);
    dialogContent.appendChild(projectDescription);
    dialogContent.appendChild(technologyContainer);
    dialogContent.appendChild(projectLinks);
    dialog.appendChild(dialogContent);

    document.body.appendChild(dialog);
};

export { createProjectTile, showProjectDialog };  // Export functions for use in other files
