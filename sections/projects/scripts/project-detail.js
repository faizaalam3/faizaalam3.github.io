// project-detail.js
import { db } from './firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const projectDetailContainer = document.getElementById('project-content');
const projectImage = document.getElementById('project-image');
const projectTitle = document.getElementById('project-title');

// Extract the projectId from the URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('projectId');

const fetchProjectDetail = async () => {
    try {
        // Fetch the project details using the projectId
        const docRef = doc(db, "projects", projectId); // Assumes the collection name is "projects"
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const projectData = docSnap.data();
            console.log('Project Detail fetched:', projectData);

            // Populate the content on the page
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
        } else {
            console.log("No such project found.");
        }
    } catch (error) {
        console.error("Error fetching project details:", error);
    }
};

// Load project details on page load
document.addEventListener('DOMContentLoaded', fetchProjectDetail);
