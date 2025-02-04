document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const alertBox = document.getElementById("alert");
    const formTitle = document.getElementById("form-title");

   
    document.getElementById("show-login").addEventListener("click", function () {
        registerForm.classList.add("d-none");
        loginForm.classList.remove("d-none");
        formTitle.textContent = "Login";
    });

    document.getElementById("show-register").addEventListener("click", function () {
        loginForm.classList.add("d-none");
        registerForm.classList.remove("d-none");
        formTitle.textContent = "Register";
    });


    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("full-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-password").value.trim();

        if (!fullName || !email || !password) {
            showAlert("Please fill all fields!", "danger");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.email === email)) {
            showAlert("Email already registered!", "warning");
            return;
        }

        users.push({ fullName, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        showAlert("Registration successful! Please login.", "success");

        registerForm.reset();
    });


    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const validUser = users.find(user => user.email === email && user.password === password);

        if (validUser) {
            showAlert(`Welcome, ${validUser.fullName}! Login successful.`, "success");
            loginForm.reset();
        } else {
            showAlert("Invalid email or password!", "danger");
        }
    });


    function showAlert(message, type) {
        alertBox.textContent = message;
        alertBox.className = `alert alert-${type}`;
        alertBox.classList.remove("d-none");

        setTimeout(() => {
            alertBox.classList.add("d-none");
        }, 3000);
    }
});
