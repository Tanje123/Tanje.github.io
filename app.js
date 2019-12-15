const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click',()=>{
        nav.classList.toggle('nav-active')
});
}

navSlide();

function get_current_user() {
    var value = sessionStorage.getItem('user_token');
    if (value) {
        if (value.length != 0) {

            signin_nav = document.getElementById("signin-button");
            signin_link = document.getElementById("login-link");

            // Text
            signin_nav.innerHTML = "Earn";
            signin_link.innerHTML = "Earn";

            // Href
            signin_nav.href = "earn.html";
            signin_link.href = "earn.html";
        }
    }
}

function get_user_earning() {
    var data = JSON.stringify(false);
    var earnings = document.getElementById("earning-amount");
    var spinner = document.getElementsByClassName("spinner");
    var content = document.getElementById("content-body");
    var email = document.getElementById("profile-email");
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var details = JSON.parse(this.responseText);
            earnings.innerHTML = "$" + details['earnings'];
            if (spinner.length == 1) {
                spinner[0].style.visibility = 'hidden';
            }
            if (content) {
                content.style.visibility = 'visible';
            }
            if (email) {
                email.innerHTML = details['username'];
            }
        }
    });

    xhr.open("GET", "https://offers-mobile.herokuapp.com/profile/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Token "+sessionStorage.getItem('user_token'));
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}

function get_available_offers() {
    var data = JSON.stringify(false);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert(this.responseText)
            if (this.responseText == "987") {
                alert("Please come back on a mobile device.");
                return
            }
            html_list = document.getElementById("offer-list");
            list = JSON.parse(this.responseText);
            list.forEach(function (item, index) {
                html_list = document.getElementById("offer-list");
                var tr = document.createElement("tr");
                var th_1 = document.createElement("th");
                var th_2 = document.createElement("th");
                var th_3 = document.createElement("th");
                var th_6 = document.createElement("th");
                var br = document.createElement("br");

                th_1.innerHTML = item.type;
                th_1.setAttribute("class", "badge badge-primary");
                th_2.innerHTML = item.title;
                th_3.innerHTML = item.description;
                th_6.innerHTML = "$" + item.payout;
                var img = document.createElement('img');
                img.src = item.image;
                tr.append(img, th_1, th_2, th_3, th_6);
                tr.setAttribute("class", "offer-link");
                tr.onclick = function() {  window.open(item.link); };
                html_list.append(tr);
                html_list.append(br);
            });
        }
    });

    xhr.open("GET", "https://offers-mobile.herokuapp.com/offers/?ip="+ip);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Token "+sessionStorage.getItem('user_token'));
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);

}