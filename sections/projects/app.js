import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBuxLIUM3MsUMsjxbAd5nYsQ4YT1EMIjmI",
    authDomain: "flutter-developer-96ae8.firebaseapp.com",
    projectId: "flutter-developer-96ae8",
    storageBucket: "flutter-developer-96ae8.appspot.com",
    messagingSenderId: "549982520145",
    appId: "1:549982520145:web:af2dc806075badbe014970",
    measurementId: "G-R1VQLGVQ87"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase Initialized");

const createProjectTile = (projectData) => {
    const projectTile = document.createElement('div');
    projectTile.classList.add('project-tile');

    const projectImage = document.createElement('img');
    projectImage.src = projectData.image;
    projectImage.alt = projectData.title;

    const projectTitle = document.createElement('h3');
    projectTitle.textContent = projectData.title;

    const projectDescription = document.createElement('p');
    projectDescription.textContent = projectData.description;

    const projectLinks = document.createElement('div');
    projectLinks.classList.add('project-links');

    if (projectData.androidLink) {
        const androidLink = document.createElement('a');
        androidLink.href = projectData.androidLink;
        androidLink.textContent = 'Android';
        androidLink.target = '_blank';
        projectLinks.appendChild(androidLink);
    }

    if (projectData.iosLink) {
        const iosLink = document.createElement('a');
        iosLink.href = projectData.iosLink;
        iosLink.textContent = 'iOS';
        iosLink.target = '_blank';
        projectLinks.appendChild(iosLink);
    }

    projectTile.appendChild(projectImage);
    projectTile.appendChild(projectTitle);
    projectTile.appendChild(projectDescription);
    projectTile.appendChild(projectLinks);

    return projectTile;
};

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
