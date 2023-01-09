const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const desktop__flex = document.querySelector('.desktop__flex');

function toggleHeaderClass() {
    if (window.matchMedia('(min-width: 768px)').matches) {
        header.classList.add('header__desktop');
        main.classList.add('main__desktop');
        footer.classList.add('header__desktop');
        desktop__flex.classList.add('desk__flex');

    } else {
        header.classList.remove('header__desktop');
        main.classList.remove('main__desktop');
        footer.classList.remove('header__desktop');
        desktop__flex.classList.remove('desk__flex');
    }
}

toggleHeaderClass();

window.addEventListener('resize', toggleHeaderClass);

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const tel = document.querySelector('#tel');


// Button
const button__next = document.querySelector('.button__next');
const button__desktop = document.querySelector('.button__desktop');
const button__desktop__back = document.querySelector('.button__desktop__back');
const button__previous = document.querySelector('#button-previous');

button__next.addEventListener('click', handleNext);
button__desktop.addEventListener('click', handleNext);
button__desktop__back.addEventListener('click', handlePreviou);
button__previous.addEventListener('click', handlePreviou);

let count = 0;
const step = document.querySelectorAll('.step');
const button__step = document.querySelector('#button');
const button__mobile__back = document.querySelector('.button__mobile__back');

function handleNext() {
    if (name.value == "" && email.value == "" && tel.value == "") {
        mostrarError('general', 'Please complete name, email and phone number');
        return;
    } else if (name.value == "") {
        mostrarError('name', 'Please enter a name valid');
        return;
    } else if (email.value == "") {
        mostrarError('email', 'Please enter a email valid');
        return;
    } else if (tel.value == "") {
        mostrarError('tel', 'Please enter a phone number valid');
        return;
    }
    // Next step
    
    const activa = document.querySelectorAll('.active');
    const next = document.querySelectorAll('.next');
    
    if (count <= 3) ++count; 
    if (count == 3) {
        button__step.type = 'submit';
        button__step.textContent = 'Submit';
    }

    if(count == 1) {
        button__mobile__back.style.opacity = '1';
        button__mobile__back.disabled = false;
    }

    if ([...next].length && count <= 3) {

        [...step].forEach(elem => elem.classList.remove('step__active'));
        [...activa].forEach(elem => elem.classList.remove('active'));


        [...next][count].classList.add('active');
        [...step][count].classList.add('step__active');
    }
};

function handlePreviou() {


    const activa = document.querySelectorAll('.active');
    const next = document.querySelectorAll('.next');

    
    if (0 <= count) --count; 
    if(count == 0) {
        button__mobile__back.style.opacity = '0';
        button__mobile__back.disabled = true;
    }
    
    if ([...next].length && count < 4) {
        [...step].forEach(elem => elem.classList.remove('step__active'));
        [...activa].forEach(elem => elem.classList.remove('active'));

        
        [...next][count].classList.add('active');
        [...step][count].classList.add('step__active');
    }
}

function mostrarError(error, message) {
    const errorLocation = document.querySelector(`.${error}-error`);


    errorLocation.classList.add('error');

    const text = document.createElement('p');
    text.classList.add('error');
    text.textContent = message;
    errorLocation.appendChild(text);

}