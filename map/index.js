let but = document.querySelector('#but').addEventListener('click', serch)
// let fors = docuement.querySelector('#for');
let parent = document.getElementById('for');
window.addEventListener('load', myfun);
function myfun() {
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
        const crd = pos.coords;

        // console.log('Your current position is:');
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);

       se(crd.latitude,crd.longitude)
       fo(crd.latitude,crd.longitude)

       

    }
}
function se(c,x) {
    let value = document.getElementById('serc').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${c}&lon=${x}&units=metric&appid=c463b47d57b84be0c36e4f11f5f7e62c`
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
           display(res)
        })
        .catch(function (err) {
            console.log(err);
        })
}
async function fo(c,x) {
    let value = document.getElementById('serc').value;
    for (let i = 0; i < 7; i++) {
        parent.children[i].innerHTML = null;
    }
    const urls = `https://api.openweathermap.org/data/2.5/forecast?lat=${c}&lon=${x}&units=metric&appid=c463b47d57b84be0c36e4f11f5f7e62c`
    let data = await fetch(urls);
    let res = await data.json();
    sub(res)


}


function serch() {
    let value = document.getElementById('serc').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=c463b47d57b84be0c36e4f11f5f7e62c`
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            let x = true;
            display(res,x);
        })
        .catch(function (err) {
            console.log(err);
        })
}


function display(print,l) {
    let second = document.querySelector('#secnd');
    let data = document.getElementById('data');
    let cont = document.getElementById('co');
    let temp = document.getElementById('temp');
    let degre = document.getElementById('degree');
    let cloud = document.getElementById('cloud');
    let hum = document.getElementById('hum');
    cont.innerText = null;
    degre.innerHTML = null;
    cloud.innerHTML = null;
    hum.innerHTML = null;
    data.style.background = " rgba(24,24,27,0.2)";
    cont.innerText = `${print.name}, ${print.sys.country}`;
    let h3 = document.createElement('h3');
    let img = document.createElement('img');
    img.src = `https://openweathermap.org/img/wn/${print.weather[0].icon}@2x.png`
    let e =print.main.temp
     e = Number(e);
    h3.innerText = `${e.toFixed()}° C`;
    degre.append(img, h3);
    let p = document.createElement('p');
    p.innerText = `Feels like ${e.toFixed()}°C. ${print.weather[0].description}.`
    cloud.append(p);
    let p2 = document.createElement('p');
    p2.innerText = `Humidity: ${print.main.humidity}%`;
    let p3 = document.createElement('p');
    p3.innerText = `Pressure: ${print.main.pressure}`;
    hum.append(p2, p3);
    let x = document.getElementById('time');
    x.innerText = "Aug 6, 11:51am"
    let g = document.getElementById('gmap_canvas')
    g.src = `https://maps.google.com/maps?q=${print.name}&t=&z=9&ie=UTF8&iwloc=&output=embed`
   if(l){
    forstar();
   }
   
}
async function forstar() {
    let value = document.getElementById('serc').value;
    for (let i = 0; i < 7; i++) {
        parent.children[i].innerHTML = null;
    }
    const urls = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&cnt=7&units=metric&appid=c463b47d57b84be0c36e4f11f5f7e62c`
    let data = await fetch(urls);
    let res = await data.json();
    sub(res)


}

function sub(res){
    let arr = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "wed"]
    let i = 0;
    res.list.forEach(function (el) {
        let x = parent.children[i];
        let h5 = document.createElement('h5');
        // console.log(arr[i]);
        h5.innerText = arr[i];
        let img = document.createElement('img')
        img.src = `https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`
        let h = document.createElement('h5');
        let e =el.main.temp
        e = Number(e);
        h.innerText = `${e.toFixed()}°`;
        x.append(h5, img, h);
        x.style.background = " rgba(24,24,27,0.2)";
        x.style.color = "white"
        i++;

})
// console.log(res);
}
