// Есть в localStorage?
// if (localStorage.getItem("token")) {
//     window.location.replace("http://127.0.0.1:3337");
// }

class AuthManaging {
    signupUser = async (email, pass) => {
        const res = await fetch("/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password: pass
            })
        });
        const data = await res.json();
        this.notify(data.message);
    };

    loginUser = async (email, pass) => {
        const res = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password: pass
            })
        });
        const data = await res.json();
        this.notify(data.message);

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userLoggedInEmail', email);
            window.location.replace('http://127.0.0.1:3337');
        }
    };

    notify = (message) => {
        Toastify({
            text: `${message}`,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            stopOnFocus: true
        }).showToast();
    }
}

const authInstance = new AuthManaging();

// Call eventHandler for submited modal
const forms = document.querySelectorAll("form");
forms.forEach(form => {
    form.addEventListener("submit", eventHandler);
});

function eventHandler(e) {
    e.preventDefault();

    if (e.target.className === "signup-form") {
        const email = e.target.email.value;
        const pass = e.target.pass.value;
        authInstance.signupUser(email, pass);
    }
    if (e.target.className === "login-form") {
        const email = e.target.email.value;
        const pass = e.target.pass.value;
        authInstance.loginUser(email, pass);
    }
}

$(document).ready(function($) {
    tab = $(".tabs h3 a");
    tab.on("click", function(event) {
        event.preventDefault();
        tab.removeClass("active");
        $(this).addClass("active");
        tab_content = $(this).attr("href");
        $('div[id$="tab-content"]').removeClass("active");
        $(tab_content).addClass("active");
    });
});
