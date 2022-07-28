var popUpEl = document.querySelector("#pop-up");
var alertMessageEl =document.querySelector("#alert-message");
var closePopUpBtn = document.querySelector("#close-btn");

var closePopUpWindow = function () {
    alertMessageEl.textContent = ""
    popUpEl.style.display = "none"
};

closePopUpBtn.addEventListener("click", closePopUpWindow);