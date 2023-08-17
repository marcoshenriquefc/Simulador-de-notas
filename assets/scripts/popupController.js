function openPopup() {
    const $popupArea = document.querySelector('.background-popup');

    $popupArea.classList.add('active')
}

function closePopup(event) {
    const popupArea = document.querySelector('.background-popup');

    if (popupArea === event.target) {
        popupArea.classList.remove('active');
    }
}
