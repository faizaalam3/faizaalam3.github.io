import { db } from './firebase.js';
import { createProjectTile } from './ui.js';
import { collection, query, getDocs, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

let projects = [];
let currentIndex = 0;

const fetchProjects = async () => {
    try {
        const q = query(collection(db, "projects"), where("isActive", "==", true));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log("No projects found.");
            return;
        }
        querySnapshot.forEach((doc) => {
            const projectData = doc.data();
            projectData.id = doc.id; // Add the id from Firebase
            projects.push(projectData);
        });
        console.log('Projects fetched:', projects);
        displayProject(currentIndex);

    } catch (error) {
        console.error("Error fetching projects:", error);
    }
};

const displayProject = (index) => {
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = ''; // Clear the container
    if (projects.length > 0) {
        console.log("displayProject is called for index ");
        console.log(index);
        const projectData = projects[index];
        const projectTile = createProjectTile(projectData);
        projectContainer.appendChild(projectTile);
    }
};

const showNextProject = () => {
    console.log("Tapped on next button");
    if (currentIndex < projects.length - 1) {
        currentIndex++;
        console.log('Next button clicked, currentIndex:', currentIndex);
        displayProject(currentIndex);
        // Smoothly scroll to the projects section
        document.querySelector("#projects").scrollIntoView({
            behavior: 'smooth'
        });
    }
};

const showPreviousProject = () => {
    console.log("Tapped on previous button");
    if (currentIndex > 0) {
        currentIndex--;
        console.log('Previous button clicked, currentIndex:', currentIndex);
        displayProject(currentIndex);
        // Smoothly scroll to the projects section
        document.querySelector("#projects").scrollIntoView({
            behavior: 'smooth'
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
    window.showNextProject = showNextProject;
    window.showPreviousProject = showPreviousProject;
});
