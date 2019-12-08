function login() {
    username = document.getElementById("username").value;
    var data = JSON.stringify(false);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var token_value = this.responseText.substring(1, this.responseText.length-1);
            if (token_value) {
                sessionStorage.setItem('user_token', token_value);
                window.location.href = "earn.html"
            } else {
                alert("Unable to login, please try later.")
            }
        }
    });

    xhr.open("GET", "http://localhost:8000/authenticate/?username="+username);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
}

function check_logged_in() {
    if (sessionStorage.getItem('user_token')) {
        if (url.indexOf("earn.html") != -1) {
        } else {
            window.location.href = "earn.html";
        }
    } else {
        var url = window.location.href;
        if (url.indexOf("login.html") != -1) {
        } else {
            window.location.href = "login.html";
        }
    }

}

function payout() {
    var data = JSON.stringify(false);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert("Payout request received.")
        }
    });

    xhr.open("GET", "http://127.0.0.1:8000/payout/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Token "+sessionStorage.getItem('user_token'));
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
}