"use strict";

// ! Добавить проверку на ввод только цифр
// ! Переименовать переменные на правильные с точки зрения англ. языка(Например: btnResult => resultBtn)

// Блок с переменными

const blockGender = document.querySelector(".app__gender");
const age = document.querySelector('.app__anthropometry input[name="age"');
const height = document.querySelector('.app__anthropometry input[name="height"');
const weight = document.querySelector('.app__anthropometry input[name="weight"');
const anthropometryList = document.querySelectorAll('.app__anthropometry input');
const activityList = document.querySelectorAll('.app__activity label');
const btnResult = document.querySelector('.app__btn-result');
const btnClear = document.querySelector('.app__btn-clear');
const resultBlock = document.querySelector('.app__block-result');
const weightMaintenance = document.querySelector('.app__weight-maintenance');
const weightLoss = document.querySelector('.app__weight-loss');
const weightGain = document.querySelector('.app__weight-gain');

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
    hideModal();
}

// Расчёт по формуле для получени количества каллорий для базовой потребности организма с учётом коэффициента нагрузок
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
    const weightMaintenanceNum = getCalculations();
    const weightLossNum = Math.round(weightMaintenanceNum * 0.85);
    const weightGainNum = Math.round(weightMaintenanceNum * 1.15);
    outputResult(weightMaintenanceNum, weightLossNum, weightGainNum);
    showModal();
}

// Вывод результата
const outputResult = function(maintenance, loss, gain) {
    weightMaintenance.textContent = `${maintenance}`;
    weightLoss.textContent = `${loss}`;
    weightGain.textContent = `${gain}`;
}

// Показать окошко с результатом
const showModal = function() {
    resultBlock.classList.add('show');
}

const hideModal = function() {
    resultBlock.classList.remove('show');
}


// Блок с навешиванием слушателей

anthropometryList.forEach(item => {
    item.addEventListener('input', () => {
        anthropometryObj = getAnthropometry();
    });
});

activityList.forEach(item => {
    item.addEventListener('input', () => {
        activityRatio = getActivity(item);
    });
});

blockGender.addEventListener("click", changeGender);
btnResult.addEventListener('click', getResult);
btnClear.addEventListener('click', clearInputs);