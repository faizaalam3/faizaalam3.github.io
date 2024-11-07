// app.js
import { fetchProjects } from './projectData.js';

document.addEventListener('DOMContentLoaded', () => {
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    const projectContainer = document.getElementById('project-container');

    if (scrollLeftBtn && scrollRightBtn && projectContainer) {
        scrollLeftBtn.addEventListener('mouseover', () => {
            projectContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('mouseover', () => {
            projectContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
    } else {
        console.error('One or more elements not found!');
    }

    fetchProjects();
});
