import { db } from './firebase.js';
import { doc, getDoc, collection, query, getDocs, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

let projects = [];        // Array to store all projects
let currentIndex = 0;     // To track current project index

// Extract the projectId from the URL
const urlParams = new URLSearchParams(window.location.search);
let projectId = urlParams.get('projectId');

// Elements to update the UI
const projectDetailContainer = document.getElementById('project-content');
const projectImage = document.getElementById('project-image');
const projectTitle = document.getElementById('project-title');

// Navigation buttons
const prevButton = document.getElementById('prev-project');
const nextButton = document.getElementById('next-project');

// Fetch a single project based on the projectId
const fetchProjectDetail = async () => {
    try {
        // If no projectId in the URL, show the first project
        if (!projectId) {
            if (projects.length > 0) {
                projectId = projects[0].id;  // Default to the first project if no ID is passed
            }
        }

        // Fetch the project from Firestore using projectId
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const projectData = docSnap.data();
            console.log('Project Detail fetched:', projectData);

            // Display project details
            displayProject(projectData);
        } else {
            console.log("No such project found.");
            await fetchProjects(); // Fallback if the project isn't found in the URL
        }
    } catch (error) {
        console.error("Error fetching project details:", error);
    }
};

// Function to display the project content
const displayProject = (projectData) => {
    projectTitle.textContent = projectData.title;
    projectDetailContainer.innerHTML = `
        <p class="project-location">${projectData.workingPlace}</p>
        <div class="tags-container">
            ${projectData.technology.map(tech => `<span class="tag">${tech}</span>`).join('')}
        </div>
        <p class="project-description">${projectData.description}</p>
    `;

    projectImage.src = projectData.image;
    projectImage.alt = projectData.title;

    // Update page title to the project title
    document.title = projectData.title;

    // Update navigation buttons' state
    updateNavigationLinks();
};

// Fetch all projects to populate the projects array
const fetchProjects = async () => {
    try {
        // Query Firestore for active projects
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

        // Once projects are fetched, show the first project if available
        if (projects.length > 0) {
            if (!projectId) {
                projectId = projects[0].id;  // Default to the first project if no ID is passed
            }
            showProjectById(projectId);
        }

    } catch (error) {
        console.error("Error fetching projects:", error);
    }
};

// Function to show the next project
const showNextProject = () => {
    if (currentIndex < projects.length - 1) {
        currentIndex++;
        const nextProject = projects[currentIndex];
        showProjectById(nextProject.id);
    }
};

// Function to show the previous project
const showPreviousProject = () => {
    if (currentIndex > 0) {
        currentIndex--;
        const prevProject = projects[currentIndex];
        showProjectById(prevProject.id);
    }
};

// Function to display a project by its ID
const showProjectById = (id) => {
    const project = projects.find(p => p.id === id);
    if (project) {
        displayProject(project);
        updateUrl(id);  // Update the URL to reflect the current projectId
    }
};

// Function to update the URL with the new projectId
const updateUrl = (newProjectId) => {
    const newUrl = `${window.location.pathname}?projectId=${newProjectId}`;
    history.pushState(null, null, newUrl);
};

// Function to update the navigation links (Next/Previous) for right-click functionality
const updateNavigationLinks = () => {
    const nextProject = projects[currentIndex + 1];
    const prevProject = projects[currentIndex - 1];

    // Update next and prev button href for opening in a new tab
    if (nextProject) {
        nextButton.href = `${window.location.pathname}?projectId=${nextProject.id}`;
    } else {
        nextButton.removeAttribute('href');  // Disable next button link
    }

    if (prevProject) {
        prevButton.href = `${window.location.pathname}?projectId=${prevProject.id}`;
    } else {
        prevButton.removeAttribute('href');  // Disable prev button link
    }

    // Hide buttons if no next or previous project
    nextButton.style.display = nextProject ? 'inline-block' : 'none';
    prevButton.style.display = prevProject ? 'inline-block' : 'none';
};

// Load project details on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
    window.showNextProject = showNextProject;
    window.showPreviousProject = showPreviousProject;
});
