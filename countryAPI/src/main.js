import "../src/css/main.css"

//// Selection
const mid = document.querySelector('.mid')
const mode = document.querySelector('.mode')
const body = document.querySelector('body');
const loader = document.querySelector('.loader')


//// Variables


let modeBody = localStorage.getItem('mode')

const getLocation = window.location.search
const urlParams = new URLSearchParams(getLocation)
const country = urlParams.get('country')

const API = `https://restcountries.com/v3.1/${country}`
console.log(API)
///// Function


const changeMode = () => {
    if(modeBody){
        body.classList.add(modeBody)
        console.log(localStorage.getItem('mode'))
        document.querySelector('.dark').classList.add('Dnone')
        document.querySelector('.light').classList.remove('Dnone')
    }else{
        document.querySelector('.dark').classList.remove('Dnone')
        document.querySelector('.light').classList.add('Dnone')
    }
}    

changeMode()

mode.addEventListener('click', () => {
    modeBody = modeBody ? '' : 'night'
    console.log(modeBody)
    localStorage.setItem('mode', modeBody)
    body.classList.toggle('night')
    changeMode()
})



const reference = async (api) => {
    loader.classList.remove('Dnone')
    const data = await fetch(api)
    const a = await data.json()
    const b = await a[0]
    wape(b)
    loader.classList.add('Dnone')
}

reference(API)

function wape(data){
    mid.innerHTML = `
    <div class="all-info">
        <div class="flag">
            <img src="${data.flags.svg}" alt="${data.flags.alt}">
        </div>
        <div class="information">
            <h1>${data.name.common}</h1>
            <div class="inner">
                <div class="left">
                    <p><span>Native Name: </span>${(Object.values(data.name.nativeName))[0].official}</p>
                    <p><span>Population: </span>${data.population}</p>
                    <p><span>Region: </span>${data.region}</p>
                    <p><span>Sub Region: </span>${data.subregion?data.subregion:data.region}</p>
                    <p><span>Capital: </span>${data.capital ? data.capital : 'Not Capital'}</p>
                </div>
                <div class="right">
                    <p><span>Top Level Domain:</span> ${data.tld}</p>
                    <p><span>Languages:</span> ${Object.values(data.languages)}</p>
                    <p><span>Currencies:</span> ${Object.values(data.currencies)[0].name}</p>
                </div>
            </div>
            <div class="borders">
                <span>Border countries: </span>
            </div>
        </div>
    </div>
    `
    if(data.borders){data.borders.forEach(border =>{
        document.querySelector('.borders').innerHTML += 
        ` <a href="./about.html?country=/alpha/${border}" class="border"> ${border}</a>`
    })}else{
        document.querySelector('.borders').innerHTML = 'Not border whith another countries' 
    }
    console.log(data)
    console.log(Object.values(data.languages))
}