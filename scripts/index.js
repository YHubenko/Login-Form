let form = document.forms[0];
let switchBtn = document.querySelector('.switch-form');
let wrapper = document.querySelector('#wrapper')
let container = document.querySelector('#form-container');
let inputs = document.querySelectorAll('input');
let submit = document.querySelector('.submit-button');
let registrationFlag = false;

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
        if (input.getAttribute('type') !== 'submit' && input.getAttribute('type') !== 'button') {
            if (input.classList.contains('hidden-on-load')) input.classList.remove('hidden-on-load');
            if (input.classList.contains('hidden')) {
                input.classList.add('shown');
                input.classList.remove('hidden');
            } else {
                input.classList.remove('shown');
                input.classList.add('hidden');
            }
            if (input.classList.contains('hidden')) input.required = false;
            else if (input.classList.contains('shown')) input.required = true;
        }
    }

    registrationFlag = !registrationFlag;
}

let users = [];
if (localStorage.length === 0) {
    users = [{
        firstName: 'admin',
        lastName: 'admin',
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'admin222',
        phone: 123456456123
    }];
} else {
    users = JSON.parse(localStorage.getItem('users'));
}

let regPassword = form.passwordReg;
let confirmPass = form.confirmPasswordReg;
let regFirstName = form.firsNameReg;
let regLastName = form.lasNameReg
let regUsername = form.usernameReg;
let regEmail = form.emailReg;
let regPhoneNumber = form.phoneNumberReg;
let loginUsername = form.username;
let loginPassword = form.password;
let loginOutput = form.loginOutput;

form.addEventListener('submit', (e) => {
    if (registrationFlag) {
        if (regPassword.value === confirmPass.value && usernameUnique()) {
            confirmPass.setCustomValidity('');
            regUsername.setCustomValidity('');
            let user = {
                firstName: regFirstName.value,
                lastName: regLastName.value,
                username: regUsername.value.toLowerCase(),
                email: regEmail.value,
                password: regPassword.value,
                phone: regPhoneNumber.value
            }
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        } else if (!usernameUnique()) {
            regUsername.setCustomValidity('User with this username already exists!');
            e.preventDefault();
        } else if (regPassword.value !== confirmPass.value) {
            confirmPass.setCustomValidity('Passwords must be same!');
            e.preventDefault();
        }
    } else {
        let username = loginUsername.value.toLowerCase();
        let password = loginPassword.value;
        for (const user of users) {
            if (username === user.username) {
                if (password === user.password) {
                    loginOutput.value = 'Done!';
                    loginOutput.style.color = 'green';
                    e.preventDefault();
                } else {
                    loginOutput.value = 'Incorrect password!';
                    loginOutput.style.color = '#A80909';
                    e.preventDefault();
                }
                break;
            } else {
                if (users.indexOf(user) === users.length - 1) {
                    loginOutput.value = 'User with this username does not exist!';
                    loginOutput.style.color = '#A80909';
                    e.preventDefault();
                }
            }
        }
    }
})
;

function usernameUnique() {
    for (const user of users) {
        if (regUsername.value.toLowerCase() === user.username) {
            return false;
        }
    }
    return true;
}
