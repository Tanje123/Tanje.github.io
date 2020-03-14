function showCloseMenu(){
    let menuContent = document.getElementById("menu-overlay");
    if (menuContent.style.visibility === 'visible'){
        menuContent.style.visibility = 'hidden'
    } else {
        menuContent.style.visibility = 'visible'
    }
}