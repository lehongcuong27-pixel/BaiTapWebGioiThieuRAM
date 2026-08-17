const loginBtn = document.querySelector('[name ="login"]');
const registerBtn = document.querySelector('[name="register"]');
const closeButtons = document.querySelectorAll('.close-button');


const loginForm = document.querySelector('[name="login-form"]');
const registerForm = document.querySelector('[name="register-form"]');


closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
    });
});

loginBtn.addEventListener('click', () => {
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
})

registerBtn.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
})

function validateLoginForm(username, password) {
    if (username === '' || password === '') {
        alert('Vui lòng nhập đầy đủ thông tin đăng nhập.');
        return false;
    }
    else{
        const validUsername = /^[a-zA-Z]\w{4,11}$/
        const validPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\s\w])(\S{8,})$/
        if (!validUsername.test(username) || !validPassword.test(password)){
            return false
        }
        else{
            return true
        }
    }
}

function validateRegisterForm(username, email, password) {
    if (username === '' || email === '' || password === '') {
        alert('Vui lòng nhập đầy đủ thông tin đăng ký.');
        return false;
    }
    else{
        const validUsername = /^[a-zA-Z]\w{4,11}$/
        const validPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\s\w])(\S{8,})$/
        const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!validUsername.test(username) || !validPassword.test(password) || !validEmail.test(email)){
            return false
        }
        else{
            return true
        }
    }
}

loginForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const username = loginForm.querySelector('input[name="username"]').value.trim();
    const password = loginForm.querySelector('input[name="password"]').value.trim();

    const isValid = validateLoginForm(username, password);
    if (!isValid) {
        alert("Thông tin đăng nhập không hợp lệ. Vui lòng kiểm tra lại.");
        return;
    }

    const userList = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = userList.find(user => user.userName === username);

    if (!matchedUser) {
        alert("Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại.");
        return;
    }

    if (matchedUser.userPassword === password) {
        alert("Đăng nhập thành công!");
        window.location.href = "../HTML/Products.html";
    } 
    else {
        alert("Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại.");
    }
})

registerForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const username = registerForm.querySelector('input[name="register-username"]').value.trim();
    const email = registerForm.querySelector('input[name="register-email"]').value.trim();
    const password = registerForm.querySelector('input[name="register-password"]').value.trim();

    const isValid = validateRegisterForm(username, email, password);
    if (!isValid) {
        alert("Thông tin đăng ký không hợp lệ. Vui lòng kiểm tra lại.");
        return;
    }

    const userList = JSON.parse(localStorage.getItem("users")) || [];
    const isExistingUser = userList.some(user => user.userEmail === email);
    if (isExistingUser) {
        alert("Email đã tồn tại. Vui lòng sử dụng email khác.");
    }
    else{
        alert("Đăng ký thành công!Vui lòng đăng nhập để tiếp tục");
        localStorage.setItem("users", JSON.stringify([...userList, { userName: username, userEmail: email, userPassword: password }]));
    }
})

async function changeImage(){
    const imgList = await fetch("http://localhost:3000/rams")
    const imgs = await imgList.json()
    
    const srcImg = imgs.map(img => img.imageUrl)
    const change = document.querySelector(".change-img")
    const firstImg = change.querySelector("[name = 'firstImg']")
    const secondImg = change.querySelector("[name = 'secondImg']")

    firstImg.src = `${srcImg[0][0]}`
    secondImg.src = `${srcImg[srcImg.length-1][[srcImg.length-1].length-1]}`
    let firstNoNext = 0;
    let secondNoNext = 0;

    let firstNoPrev = srcImg.length-1 ;
    let secondNoPrev = srcImg[srcImg.length-1].length-1;
    setInterval(() => {
        secondNoNext = secondNoNext + 1
        if (secondNoNext > srcImg[firstNoNext].length - 1) {
            firstNoNext = firstNoNext + 1
            if (firstNoNext > srcImg.length - 1) {
                firstNoNext = 0
            }
            secondNoNext = 0
        }
        
        firstImg.src = `${srcImg[firstNoNext][secondNoNext]}`
    }, 1000);


    setInterval(() => {
        secondNoPrev = secondNoPrev - 1
        if (secondNoPrev < 0) {
            firstNoPrev = firstNoPrev - 1
            if (firstNoPrev < 0) {
                firstNoPrev = srcImg.length - 1
            }
            secondNoPrev = srcImg[firstNoPrev].length-1
        }
        secondImg.src = `${srcImg[firstNoPrev][secondNoPrev]}`
    }, 1000);
}
changeImage()