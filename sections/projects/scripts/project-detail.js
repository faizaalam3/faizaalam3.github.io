// project-detail.js
import { db } from './firebase.js';
import { doc, getDoc, collection, query, getDocs, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";  // Added necessary imports

let projects = [];
let currentIndex = -1;  // This will be updated when we fetch the project details
let isProjectsFetched = false;  // Track if the projects have been fetched

const projectDetailContainer = document.getElementById('project-content');
const projectImage = document.getElementById('project-image');
const projectTitle = document.getElementById('project-title');

// Extract the projectId from the URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('projectId');

// Fetch all projects if not fetched yet
const fetchProjects = async () => {
    if (!isProjectsFetched) {
        try {
            const q = query(collection(db, "projects"), where("isActive", "==", true));  // Create a query to get active projects
            const querySnapshot = await getDocs(q);  // Get documents based on the query
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
            isProjectsFetched = true;

            // Set the initial project index
            currentIndex = projects.findIndex(project => project.id === projectId);
            displayProject(currentIndex);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }
};

// Display project details on the page
const displayProject = (index) => {
    if (index < 0 || index >= projects.length) {
        console.log('Invalid project index.');
        return;
    }

    const projectData = projects[index];
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
};

// Fetch project details on page load
const fetchProjectDetail = async () => {
    try {
        const docRef = doc(db, "projects", projectId); // Assumes the collection name is "projects"
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const projectData = docSnap.data();
            console.log('Project Detail fetched:', projectData);
            displayProject(currentIndex); // Display project fetched by projectId
        } else {
            console.log("No such project found.");
        }
    } catch (error) {
        console.error("Error fetching project details:", error);
    }
};

// Show next project
const showNextProject = () => {
    if (currentIndex < projects.length - 1) {
        currentIndex++;
        displayProject(currentIndex);
    }
};

// Show previous project
const showPreviousProject = () => {
    if (currentIndex > 0) {
        currentIndex--;
        displayProject(currentIndex);
    }
};

// Initialize the page by fetching projects and details
document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
    fetchProjectDetail();
    window.showNextProject = showNextProject;
    window.showPreviousProject = showPreviousProject;
});
