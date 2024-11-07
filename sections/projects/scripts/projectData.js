// projectData.js
import { db } from './firebase.js';
import { collection, query, getDocs, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { createProjectTile } from './ui.js';

const fetchProjects = async () => {
    try {
        const q = query(collection(db, "projects"), where("isActive", "==", true));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log("No projects found.");
            return;
        }

        const projectContainer = document.getElementById('project-container');
        querySnapshot.forEach((doc) => {
            const projectData = doc.data();
            const projectTile = createProjectTile(projectData);
            projectContainer.appendChild(projectTile);
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
};

export { fetchProjects };  // Export the function to fetch projects
