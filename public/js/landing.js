function showDialog(dialogId) {
    document.getElementById(dialogId).style.display = 'flex';
}

function hideDialog(dialogId) {
    document.getElementById(dialogId).style.display = 'none';
}

// Close dialog when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('dialog')) {
        event.target.style.display = 'none';
    }
} 