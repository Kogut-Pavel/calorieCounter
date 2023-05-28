"use strict";

// Блок с переменными

const blockGender = document.querySelector(".app__gender");


// Блок с функциями

// Смена гендера
const changeGender = function(event) {
    let target = event.target;
    if (!target.classList.contains("active")) {
        blockGender.querySelector(".active").classList.remove("active");
        target.classList.add("active");
    } 

    return target.value;
    
}


// Блок с навешиванием слушателей

let genderRatio = blockGender.addEventListener("click", changeGender);
if (genderRatio === undefined) {
    genderRatio = blockGender.querySelector('.active').value;
}