// Toggle Sidebar (Open/Close)
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

// Show/Hide Color Options
const themeToggleIcon = document.querySelector('.theme-toggle-icon');
const colorOptions = document.querySelector('.color-options');
themeToggleIcon.addEventListener('click', () => {
    colorOptions.classList.toggle('hidden');
});

// Color Change Functionality
const colors = document.querySelectorAll('.color');
const menuIcons = document.querySelectorAll('.open-btn, .close-btn');

colors.forEach(color => {
    color.addEventListener('click', (e) => {
        const selectedColor = e.target.dataset.color;
        
        // Set the theme color to the selected color
        document.documentElement.style.setProperty('--primary-color', selectedColor);

        // Update the color of the menu icons
        menuIcons.forEach(icon => {
            icon.style.color = selectedColor;
        });

        // Save the selected color to localStorage
        localStorage.setItem('selectedColor', selectedColor);
    });
});

// Dark Mode Toggle Functionality
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Ensure the theme color stays
    const selectedColor = localStorage.getItem('selectedColor');
    if (selectedColor) {
        document.documentElement.style.setProperty('--primary-color', selectedColor);
    }

    // Save the dark mode preference
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Apply saved preferences from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('selectedColor');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
    }

    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Job titles to cycle through
const jobTitles = [" Website Designer", " Web Developer", " UI Designer", " Graphic Designer", " Video Editor", " Animator"];
let currentTitleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicTitle = document.getElementById("dynamic-title");

// Function to handle typing and deleting effect
function typeEffect() {
    const currentTitle = jobTitles[currentTitleIndex];

    if (!isDeleting && charIndex <= currentTitle.length) {
        // Type one character at a time
        dynamicTitle.textContent = currentTitle.slice(0, charIndex++);
    } else if (isDeleting && charIndex >= 0) {
        // Delete one character at a time
        dynamicTitle.textContent = currentTitle.slice(0, charIndex--);
    }

    // Check if we need to start deleting
    if (charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000); // Pause before deleting
        return;
    }

    // Check if deletion is complete
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % jobTitles.length; // Move to next title
    }

    // Adjust typing speed
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

// Start the typing effect
typeEffect();



function setActivePage(element) {
    // Remove 'active' class from all links
    document.querySelectorAll('.sidebar ul li a').forEach(link => {
        link.classList.remove('active');
    });

    // Add 'active' class to the clicked link
    element.classList.add('active');
}

// Optionally, set the home page as the default active page on load
document.addEventListener("DOMContentLoaded", () => {
    const defaultActivePage = document.querySelector('[data-page="home"]');
    if (defaultActivePage) defaultActivePage.classList.add('active');
});
