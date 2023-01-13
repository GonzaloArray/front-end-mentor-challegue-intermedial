const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const desktop__flex = document.querySelector('.desktop__flex');
const radio = document.querySelector('#radio');
const check = document.querySelector('#checkbox');
const formulario = document.querySelector('#formulario');

// Data
const data = [
    {
        title: 'arcade',
        cash: '$9/mo',
        price: 9,
        id: 1
    },
    {
        title: 'advanced',
        cash: '$12/mo',
        price: 12,
        id: 2
    },
    {
        title: 'pro',
        cash: '$15/mo',
        price: 15,
        id: 3
    },
]
const dataSub = [
    {
        title: 'Online service',
        cash: '$1/mo',
        price: 1,
        id: 1
    },
    {
        title: 'Larger storage',
        cash: '$2/mo',
        price: 2,
        id: 2
    },
    {
        title: 'Customizable Profile',
        cash: '$2/mo',
        price: 2,
        id: 3
    },
]

function toggleHeaderClass() {
    if (window.matchMedia('(min-width: 768px)').matches) {
        header.classList.add('header__desktop');
        main.classList.add('main__desktop');
        desktop__flex.classList.add('desk__flex');

    } else {
        header.classList.remove('header__desktop');
        main.classList.remove('main__desktop');

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
const subs__child = document.querySelector('#subs_child');
const success = document.querySelector('#success');

document.addEventListener('DOMContentLoaded', startApp);
button__next.addEventListener('click', handleNext);
button__previous.addEventListener('click', handlePreviou);
radio.addEventListener('change', handleGame);
check.addEventListener('change', handleSub);
formulario.addEventListener('submit', handleSubmit);


let count = 0;
const step = document.querySelectorAll('.step');
const step__desk = document.querySelectorAll('.step-desk');
const button__step = document.querySelector('#button');
const button__mobile__back = document.querySelector('.button__mobile__back');

// Result the information game
let result;
let subs;

function startApp() {
    const inputCheck = document.querySelectorAll('input[type="checkbox"]');
    const check = [...inputCheck, inputCheck];

    const trueCheck = check.filter(inputCheck => inputCheck.checked);
    const valueCheck = trueCheck.map(check => check.value);
    const dataFilter = dataSub.filter(elem => elem.title == valueCheck[0]);
    subs = dataFilter;

}
function handleSubmit(e) {
    e.preventDefault();
    if (count >= 4) {
        success.innerHTML = `
            <section>
                <div class="final__step">
                    <img src="./assets/images/icon-thank-you.svg" alt="">
                    <h2>Thank you!</h2>
                    <p class="final__description">Thanks for confirming your subscription! We hope you have fun 
                        using our platform. If you ever need support, please feel free 
                        to email us at support@loremgaming.com.</p>
                </div>
            </section>
        `;
    }else{
        ++count
    }
}

function handleGame() {
    const inputRadio = document.querySelectorAll('input[type="radio"]');
    const check = [...inputRadio, inputRadio];

    const trueCheck = check.filter(inputCheck => inputCheck.checked);
    const valueCheck = trueCheck.map(check => check.value)
    const dataFilter = data.filter(elem => elem.title == valueCheck[0]);
    result = dataFilter;
}

function handleSub() {
    const inputCheck = document.querySelectorAll('input[type="checkbox"]');
    const check = [...inputCheck, inputCheck];

    const trueCheck = check.filter(inputCheck => inputCheck.checked);
    const valueCheck = trueCheck.map(check => check.value)

    let sub = []
    const data = dataSub.filter(eventos => {
        valueCheck.forEach(value => {
            if (eventos.title.includes(value)) {
                sub.push(eventos)
            }
        })

        subs = sub
    })
}

function handleNext() {

    if (name.value == "") {
        mostrarError('name', 'Please enter a name valid');
        return;
    } else if (!email.value.includes('@') || email.value == '') {
        mostrarError('email', 'Please enter a email valid');
        return;
    } else if (tel.value == "") {
        mostrarError('tel', 'Please enter a phone number valid');
        return;
    }
    // Next step
    const activa = document.querySelectorAll('.active');
    const next = document.querySelectorAll('.next');

    if (count == 1) {
        button__mobile__back.style.opacity = '1';
        button__mobile__back.disabled = false;

        const inputRadio = document.querySelectorAll('input[type="radio"]');
        const check = [...inputRadio, inputRadio];

        const trueCheck = check.filter(inputCheck => inputCheck.checked);
        const valueCheck = trueCheck.map(check => check.value)
        const dataFilter = data.filter(elem => elem.title == valueCheck[0]);
        result = dataFilter;
    }


    if (count == 2) {
        if (!result.length) return

        const game = document.querySelector('#game');
        const money = document.querySelector('#money');
        const total = document.querySelector('#total');

        game.textContent = `${result[0].title}`
        money.textContent = `${result[0].cash}`


        const data = new Set(subs)
        limpiarHTML();

        data.forEach(elem => {
            const div = document.createElement('div');
            div.className = 'step__4 step__info'
            div.innerHTML = `
                <div class="step4__child">
                    <h2 id="game" class="check__title">${elem.title}</h2>
                </div>
                <span class="step__total" id="money">${elem.cash}</span>
            `;
            subs__child.appendChild(div);
        })

        const dataTotal = subs.reduce((acc, prev) => {
            return acc + prev.price
        }, 0)

        total.textContent = `$${dataTotal + result[0].price}/mo`;
    }

    if (count <= 3) ++count;

    if (count == 3) {
        button__step.type = 'submit';
        button__step.textContent = 'Submit';
    }

    if ([...next].length && count <= 3) {

        [...step].forEach(elem => elem.classList.remove('step__active'));
        [...activa].forEach(elem => elem.classList.remove('active'));
        [...step__desk][count].classList.remove('active');



        [...next][count].classList.add('active');
        [...step][count].classList.add('step__active');
        [...step__desk][count].classList.add('active');
    }

};

function handlePreviou() {

    const activa = document.querySelectorAll('.active');
    const next = document.querySelectorAll('.next');


    if (0 <= count) --count;
    if (count <= 2) {
        button__step.type = 'button';
        button__step.textContent = 'Next step';
    }
    if (count == 0) {
        button__mobile__back.style.opacity = '0';
        button__mobile__back.disabled = true;
    }

    if ([...next].length && count < 4) {
        [...step].forEach(elem => elem.classList.remove('step__active'));
        [...activa].forEach(elem => elem.classList.remove('active'));
        [...step__desk][count].classList.remove('active');


        [...next][count].classList.add('active');
        [...step][count].classList.add('step__active');
        [...step__desk][count].classList.add('active');
    }
}

function mostrarError(error, message) {
    const errorLocation = document.querySelector(`.${error}-error`);
    const errorquery = document.querySelector('.error');

    if (!errorquery) {
        errorLocation.classList.add('error');
        const text = document.createElement('p');
        text.classList.add('error');
        text.textContent = message;
        errorLocation.appendChild(text);

        setTimeout(() => {
            errorLocation.textContent = ""
            errorLocation.classList.remove('error');
        }, 2000);
    }


}

function limpiarHTML() {
    subs__child.textContent = '';
}

