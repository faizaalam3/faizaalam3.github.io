function scrollProjects(direction) {
    const projectsList = document.querySelector('.projects-list');
    const scrollAmount = 320; // Adjust based on the width of .project-item and margin
    if (direction === 'left') {
        projectsList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
        projectsList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}
