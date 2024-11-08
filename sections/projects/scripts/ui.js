// Function to create a project tile
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
    projectDescription.textContent = projectData.description;

    // Container for links (Android, iOS, Drive)
    const linkButtonsContainer = document.createElement('div');
    linkButtonsContainer.classList.add('link-buttons-container');

    // Add Private button if driveLink exists
    if (!projectData.iosLink && !projectData.androidLink) {
        const driveButton = document.createElement('button');
        driveButton.classList.add('drive-button');
        driveButton.textContent = 'Private App';
        if(projectData.driveLink){
        driveButton.onclick=()=>{
            window.open(projectData.driveLink,'_blank');
        };}
        linkButtonsContainer.appendChild(driveButton);
    }

    // Add iOS button if iosLink exists
    if (projectData.iosLink) {
        if(projectData.iosLink.trim()!=""){
            const iosButton = document.createElement('button');
            iosButton.classList.add('ios-button');
            iosButton.textContent = 'iOS';
            iosButton.onclick = () => {
            window.open(projectData.iosLink, '_blank');
            };
            linkButtonsContainer.appendChild(iosButton);
        }
    }

    // Add Android button if androidLink exists
    if (projectData.androidLink) {
        if(projectData.androidLink!=""){
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

    projectTile.appendChild(contentContainer);
    projectTile.appendChild(projectImage);

    return projectTile;
};
export {createProjectTile}