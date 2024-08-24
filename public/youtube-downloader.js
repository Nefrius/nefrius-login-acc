// youtube-downloader.js
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
      window.location.href = 'login.html';
  }

  const youtubeForm = document.getElementById('youtube-form');

  youtubeForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const videoUrl = document.getElementById('video-url').value;
      const resolution = document.getElementById('resolution').value;

      // Perform the download action here
      console.log(`Downloading ${videoUrl} at ${resolution}`);

      // Optionally, you could add code to handle the actual download
  });
});
