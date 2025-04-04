import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXkNWUSI43WbIlFQwT_8I5XVw4qWEwWKg",
    authDomain: "faiz3-portfolio.firebaseapp.com",
    projectId: "faiz3-portfolio",
    storageBucket: "faiz3-portfolio.firebasestorage.app",
    messagingSenderId: "976271288426",
    appId: "1:976271288426:web:504bf909c9fcc921c94213",
    measurementId: "G-WHH0BV5ZXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Fetches data from Firestore
 * @returns {Promise<Object>} Data from Firestore collections
 */
export async function fetchData() {
    try {
        const [profileDoc, educationSnapshot, experienceSnapshot, projectsSnapshot] = await Promise.all([
            getDoc(doc(db, 'profile', '7lfRA429QD5CPa7r9EfU')),
            getDocs(query(collection(db, 'education'), where('isVisible', '==', true))),
            getDocs(collection(db, 'experience')),
            getDocs(query(collection(db, 'projects'), where('isVisible', '==', true)))
        ]);

        if (!profileDoc.exists()) throw new Error('Profile document not found');

        return {
            profile: profileDoc.data(),
            education: educationSnapshot.docs.map(doc => doc.data()),
            experience: experienceSnapshot.docs.map(doc => doc.data()),
            projects: projectsSnapshot.docs.map(doc => doc.data())
        };
    } catch (error) {
        throw new Error(`Firestore fetch failed: ${error.message}`);
    }
}

/**
 * Formats Firestore timestamp or string to readable date
 * @param {Object|string|null} timestamp - Firestore timestamp or ISO string
 * @returns {string} Formatted date or 'Present'
 */
export function formatDate(timestamp) {
    if (!timestamp) return 'Present';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}