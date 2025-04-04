import { fetchData, formatDate } from './app.js';

// Theme Management
const root = document.documentElement;

/**
 * Sets the theme based on user preference or system settings
 * @param {string} theme - 'light', 'dark', or 'auto'
 */
function setTheme(theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', theme === 'auto' ? (prefersDark ? 'dark' : 'light') : theme);
    localStorage.setItem('theme', theme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'auto';
setTheme(savedTheme);

// Theme switcher event listeners
document.getElementById('theme-light').addEventListener('click', () => setTheme('light'));
document.getElementById('theme-dark').addEventListener('click', () => setTheme('dark'));
document.getElementById('theme-auto').addEventListener('click', () => setTheme('auto'));

// Auto theme on system change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'auto') setTheme('auto');
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
    const isExpanded = navLinks.classList.toggle('active');
    menuToggle.textContent = isExpanded ? '✕' : '☰';
    menuToggle.setAttribute('aria-expanded', isExpanded);
});

/**
 * Loads data from Firestore and populates the page
 */
async function loadData() {
    const loading = document.getElementById('loading');
    try {
        const { profile, education, experience, projects } = await fetchData();

        // Profile
        const profileImage = document.getElementById('profile-image');
        profileImage.src = profile.image || 'images/profile.jpg'; // Fallback image
        document.getElementById('greeting').textContent = profile.greeting || 'Hello';
        document.getElementById('name').textContent = profile.name || 'Faiz Aalam';
        document.getElementById('description').textContent = profile.description || 'A passionate developer.';
        document.getElementById('about-description').textContent = profile.about || 'A passionate developer.';

        // Social Links
        const socialLinks = document.getElementById('social-links');
        (profile.links || []).filter(link => link.isVisible).forEach(link => {
            const a = document.createElement('a');
            a.href = link.link;
            a.textContent = link.title;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            socialLinks.appendChild(a);
        });

        // Education
        const educationList = document.getElementById('education-list');
        education.forEach(data => {
            const item = document.createElement('div');
            item.className = 'education-item';
            item.innerHTML = `
                <h3>${data.degree} in ${data.field}</h3>
                <p>${data.institution}</p>
                <p>${formatDate(data.start)} - ${formatDate(data.end)}</p>
                <p>Grade: ${data.grade || 'N/A'}</p>
            `;
            educationList.appendChild(item);
        });

        // Experience
        const experienceList = document.getElementById('experience-list');
        experience.forEach(data => {
            const item = document.createElement('div');
            item.className = 'experience-item';
            item.innerHTML = `
                <h3>${data.job}</h3>
                <p>${data.company} - ${data.type}</p>
                <p>${formatDate(data.start)} - ${formatDate(data.end)}</p>
            `;
            experienceList.appendChild(item);
        });

        // Projects
        const projectsList = document.getElementById('projects-list');
        projects.forEach(data => {
            const imagePath = data.image ? data.image.replace('public/', '/') : '';
            const item = document.createElement('div');
            item.className = 'project-card';
            item.innerHTML = `
                ${imagePath ? `<img src="${imagePath}" alt="${data.name}" loading="lazy">` : ''}
                <h3>${data.name}</h3>
                <p>${data.description}</p>
                <a href="${data.link}" target="_blank" rel="noopener noreferrer">View Project</a>
                <div class="tags">${(data.tags || []).map(tag => `<span>${tag}</span>`).join('')}</div>
            `;
            projectsList.appendChild(item);
        });

        // Fade out loading
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 500);
    } catch (error) {
        console.error('Error loading data:', error);
        loading.innerHTML = `<p>Error: ${error.message}. Please refresh or try again later.</p>`;
    }
}

// Intersection Observer for animations
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Load data on page load
document.addEventListener('DOMContentLoaded', loadData);