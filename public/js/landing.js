import { signUp, signIn } from './auth.js';

// Make these functions global
window.showDialog = function(dialogId) {
    document.getElementById(dialogId).style.display = 'flex';
}

window.hideDialog = function(dialogId) {
    document.getElementById(dialogId).style.display = 'none';
}

// Close dialog when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('dialog')) {
        event.target.style.display = 'none';
    }
}

// Handle sign up
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signUp(email, password);
    if (result.success) {
        alert('Successfully signed up!');
        hideDialog('signup-dialog');
        window.location.href = 'analyze.html';
    } else {
        alert('Error: ' + result.error);
    }
});

// Handle sign in
document.getElementById('signin-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn(email, password);
    if (result.success) {
        alert('Successfully signed in!');
        hideDialog('signin-dialog');
        window.location.href = 'analyze.html';
    } else {
        alert('Error: ' + result.error);
    }
});

// Add at the beginning of the file after imports
document.addEventListener('DOMContentLoaded', () => {
    // Sign in button
    document.getElementById('signin-btn').addEventListener('click', () => {
        showDialog('signin-dialog');
    });

    // Sign up button
    document.getElementById('signup-btn').addEventListener('click', () => {
        showDialog('signup-dialog');
    });

    // Close buttons
    document.getElementById('signin-close').addEventListener('click', () => {
        hideDialog('signin-dialog');
    });

    document.getElementById('signup-close').addEventListener('click', () => {
        hideDialog('signup-dialog');
    });
}); 