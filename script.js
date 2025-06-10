import { fetchData, formatDate } from './app.js';

// Theme Management
const root = document.documentElement;
const themes = ['light', 'dark', 'auto'];
let currentThemeIndex = themes.indexOf(localStorage.getItem('theme') || 'auto');

/**
 * Sets the theme based on user preference or system settings
 * @param {string} theme - 'light', 'dark', or 'auto'
 */
function setTheme(theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveTheme = theme === 'auto' ? (prefersDark ? 'dark' : 'light') : theme;
    root.setAttribute('data-theme', effectiveTheme);
    localStorage.setItem('theme', theme);
    updateThemeButton(theme);
}

/**
 * Updates the theme button icon based on the current theme
 * @param {string} theme - 'light', 'dark', or 'auto'
 */
function updateThemeButton(theme) {
    const button = document.getElementById('theme-toggle');
    const icon = button.querySelector('i');
    if (theme === 'light') {
        icon.className = 'fas fa-sun';
        button.setAttribute('aria-label', 'Switch to dark theme');
    } else if (theme === 'dark') {
        icon.className = 'fas fa-moon';
        button.setAttribute('aria-label', 'Switch to auto theme');
    } else {
        icon.className = 'fas fa-adjust';
        button.setAttribute('aria-label', 'Switch to light theme');
    }
}

// Initialize theme
setTheme(themes[currentThemeIndex]);

// Theme toggle event listener
document.getElementById('theme-toggle').addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[currentThemeIndex]);
});

// Auto theme on system change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'auto') setTheme('auto');
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = navLinks.classList.toggle('active');
        menuToggle.textContent = isExpanded ? '✕' : '☰';
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.textContent = '☰';
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * Loads data from Firestore and populates the page
 */
async function loadData() {
    const loading = document.getElementById('loading');
    try {
        const { profile, education, experience, projects } = await fetchData();

        // Sort data (latest first)
        experience.sort((a, b) => b.start.seconds - a.start.seconds);
        education.sort((a, b) => b.start.seconds - a.start.seconds);
        if (projects[0]?.date) {
            projects.sort((a, b) => b.date.seconds - a.date.seconds);
        }

        // Profile
        document.getElementById('profile-image').src = profile.image || 'images/profile.jpg';
        document.getElementById('greeting').textContent = profile.greeting || 'Hello';
        document.getElementById('name').textContent = profile.name || 'Faiz Aalam';
        document.getElementById('description').textContent = profile.description || 'A passionate developer.';
        document.getElementById('about-description').textContent = profile.about || 'A passionate developer.';

        // Social Links with Icons
        const socialLinks = document.getElementById('social-links');
        const iconMap = {
            'Whatsapp': 'fab fa-whatsapp',
            'LinkedIn': 'fab fa-linkedin',
            'Gmail': 'fab fa-google',
        };
        (profile.links || []).filter(link => link.isVisible).forEach(link => {
            const a = document.createElement('a');
            a.href = link.link;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            const iconClass = iconMap[link.title] || 'fas fa-link';
            a.innerHTML = `<i class="${iconClass}"></i>`;
            a.setAttribute('aria-label', link.title);
            socialLinks.appendChild(a);
        });

        // Projects
        const projectsList = document.getElementById('projects-list');
        projects.forEach(data => {
            const imagePath = data.image?.replace('public/', '/') || '';
            const item = document.createElement('div');
            item.className = 'project-card';
            item.innerHTML = `
                ${imagePath ? `<img src="${imagePath}" alt="${data.name}" loading="lazy">` : ''}
                <h3>${data.name}</h3>
                <p>${data.description}</p>
                <a href="${data.link}" class="view-project-btn" target="_blank" rel="noopener noreferrer">View Project</a>
                <div class="tags">${(data.tags || []).map(tag => `<span>${tag}</span>`).join('')}</div>
            `;
            projectsList.appendChild(item);
        });

        // Experience
        const experienceList = document.getElementById('experience-list');
        experience.forEach(data =>

 {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="timeline-icon"><i class="fas fa-briefcase"></i></div>
                <div class="timeline-content">
                    <h3>${data.job}</h3>
                    <p>${data.company} - ${data.type}</p>
                    <p>${formatDate(data.start)} - ${formatDate(data.end)}</p>
                </div>
            `;
            experienceList.appendChild(item);
        });

        // Education
        const educationList = document.getElementById('education-list');
        education.forEach(data => {
            const item = document.createElement('div');
            item.className = 'education-item';
            item.innerHTML = `
                <h3><i class="fas fa-graduation-cap"></i> ${data.degree} in ${data.field}</h3>
                <p>${data.institution}</p>
                <p>${formatDate(data.start)} - ${formatDate(data.end)}</p>
                <p>Grade: ${data.grade || 'N/A'}</p>
            `;
            educationList.appendChild(item);
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

// Load data on DOM content loaded
document.addEventListener('DOMContentLoaded', loadData);