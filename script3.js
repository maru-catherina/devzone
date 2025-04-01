const spellingVideo = document.getElementById('spellingVideo')
const watchPreviewSpellingVideo=document.getElementById('watchPreviewSpellingVideo')
const spellingVideoCloseButton= document.getElementById('spellingVideoCloseButton')
const recipesVideo = document.getElementById('recipesVideo')
const watchPreviewRecipesVideo=document.getElementById('watchPreviewRecipesVideo')
const recipesVideoCloseButton= document.getElementById('recipesVideoCloseButton')

const video = document.querySelector('.video');
const watchPreviewButton = document.querySelector('.watch-preview');
const closeButton = document.querySelector('.close-button')


watchPreviewSpellingVideo.addEventListener('click', () => {

  spellingVideo.classList.add('show');
  watchPreviewSpellingVideo.style.display = 'none';
  spellingVideoCloseButton.style.display='block'
})
spellingVideoCloseButton.addEventListener('click', () => {

    spellingVideo.classList.remove('show');
    watchPreviewSpellingVideo.style.display = 'block';
    spellingVideoCloseButton.style.display='none'})


watchPreviewRecipesVideo.addEventListener('click', () => {

    recipesVideo.classList.add('show');
    watchPreviewRecipesVideo.style.display = 'none';
    recipesVideoCloseButton.style.display='block'
      })
recipesVideoCloseButton.addEventListener('click', () => {
      
    recipesVideo.classList.remove('show');
    watchPreviewRecipesVideo.style.display = 'block';
    recipesVideoCloseButton.style.display='none'})
      ;