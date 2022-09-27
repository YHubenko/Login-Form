let form = document.forms[0];
let switchBtn = document.querySelector('.switch-form');
let wrapper = document.querySelector('#wrapper')
let container = document.querySelector('#form-container');
let inputs = document.querySelectorAll('input');
let submit = document.querySelector('.submit-button');

switchBtn.addEventListener('click', switchForms);
submit.addEventListener('mousedown', () => {
    if (submit.classList.contains('reg')) submit.style.transform = 'translate(3px, 68px)';
    else submit.style.transform = 'translate(3px, 6px)';
    submit.style.boxShadow = 'none';
});
submit.addEventListener('mouseup', () => {
    if (submit.classList.contains('reg')) submit.style.transform = 'translate(0px, 62px)';
    else submit.style.transform = 'translate(0)';
    submit.style.boxShadow = '3px 6px #CA192A';
})

function switchForms() {
    form.classList.toggle('login-form');
    form.classList.toggle('register-form');
    wrapper.classList.toggle('login-wrapper');
    wrapper.classList.toggle('reg-wrapper');
    container.classList.toggle('login-form-div');
    container.classList.toggle('reg-form-div');
    switchBtn.classList.toggle('switch-form-registration');
    submit.classList.toggle('reg');
    switchBtn.classList.toggle('reg');
    if (switchBtn.classList.contains('reg')) {
        switchBtn.style.transform = 'translate(50px, 100px)';
        switchBtn.value = 'Back to Login';
    } else {
        switchBtn.style.transform = 'translate(0)';
        switchBtn.value = 'Not registered yet? Sign Up';
    }
    if (submit.classList.contains('reg')) {
        submit.style.transform = 'translate(0px, 62px)';
    } else {
        submit.style.transform = 'translate(0)';
    }

    for (const input of inputs) {
        if (input.getAttribute('type') !== 'button') {
            if (input.classList.contains('hidden-on-load')) input.classList.remove('hidden-on-load');
            if (input.classList.contains('hidden')) {
                input.classList.add('shown');
                input.classList.remove('hidden');
            } else {
                input.classList.remove('shown');
                input.classList.add('hidden');
            }
        }
    }
}