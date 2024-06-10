function showLoading() {
    document.getElementById('loading-overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideLoading() {
    document.getElementById('loading-overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}