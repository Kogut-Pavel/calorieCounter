"use strict";

// ! Добавить проверку на ввод только цифр

// Блок с переменными

const blockGender = document.querySelector(".app__gender");
const age = document.querySelector('.app__anthropometry input[name="age"');
const height = document.querySelector('.app__anthropometry input[name="height"');
const weight = document.querySelector('.app__anthropometry input[name="weight"');
const anthropometryList = document.querySelectorAll('.app__anthropometry input');
const activityList = document.querySelectorAll('.app__activity label');
const btnResult = document.querySelector('.app__btn-result');
const btnClear = document.querySelector('.app__btn-clear');

let genderValue = blockGender.querySelector('.active').value;
let anthropometryObj = {};
let activityRatio = activityList[0].firstElementChild.value;

// Блок с функциями

// Смена гендера
const changeGender = function(event) {
    let target = event.target;
    if (!target.classList.contains("active")) {
        blockGender.querySelector(".active").classList.remove("active");
        target.classList.add("active");
    } 
    genderValue = target.value;
}

// Получаем возраст/рост/вес
const getAnthropometry = function() {
    let ageNumber = Number(age.value);
    let heightNumber = Number(height.value);
    let weightNumber = Number(weight.value);
    if (ageNumber !== 0  && heightNumber !== 0 && weightNumber !== 0) {
        removeDisabledButton(btnResult);
    } else {
        setDisabledButton(btnResult);
    }

    if (ageNumber !== 0  || heightNumber !== 0 || weightNumber !== 0) {
        removeDisabledButton(btnClear);
    } else {
        setDisabledButton(btnClear);
    }

    return { ageNumber, heightNumber, weightNumber };
}

// Получаем коэффициент активности 
const getActivity = function(item) {
    if (!item.classList.contains("active")) {
        document.querySelector(".app__activity .active").classList.remove("active");
        item.classList.add('active');
    }
    let itemValue = document.querySelector(".app__activity .active input").value;
    
    return itemValue;
}

// Активировать кнопку
const removeDisabledButton = function(btn) {
    btn.removeAttribute('disabled');
};

// Деактивировать кнопку
const setDisabledButton = function(btn) {
    if (!btn.hasAttribute('disabled')) {
        btn.setAttribute('disabled', 'disabled');
    }
};

// Очистить поля и расчёт
const clearInputs = function() {
    age.value = '';
    height.value = '';
    weight.value = '';

    setDisabledButton(btnClear);
    setDisabledButton(btnResult);
}

const getCalculations = function() {
    let normalResult = 0;
    if (genderValue === 'male') {
        normalResult = Math.round((66.5 + (13.75 * anthropometryObj.weightNumber) + (5.003 * anthropometryObj.heightNumber) - (6.775 * anthropometryObj.ageNumber)) * activityRatio);
    } else {
        normalResult = Math.round((655.1 + (9.563 * anthropometryObj.weightNumber) + (1.85 * anthropometryObj.heightNumber) - (4.676 * anthropometryObj.ageNumber)) * activityRatio);
    }
    return normalResult;
}

// Получить результат
const getResult = function() {
    console.log('Результат:');
    console.log(`Пол: ${genderValue}`);
    console.log(`Поддержание веса: ${getCalculations()} ккал`);
    console.log(`Снижение веса: ${Math.round(getCalculations() * 0.85)} ккал`);
    console.log(`Набор веса: ${Math.round(getCalculations() * 1.15)} ккал`)
}


// Блок с навешиванием слушателей

anthropometryList.forEach(item => {
    item.addEventListener('change', () => {
        anthropometryObj = getAnthropometry();
    });
});

activityList.forEach(item => {
    item.addEventListener('change', () => {
        activityRatio = getActivity(item);
    });
});

blockGender.addEventListener("click", changeGender);
btnResult.addEventListener('click', getResult);
btnClear.addEventListener('click', clearInputs);