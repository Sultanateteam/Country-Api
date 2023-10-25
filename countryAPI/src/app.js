import "../src/css/main.css"

//// Selections
const search = document.querySelector('#search')
const select = document.getElementById('select');
const body = document.querySelector('body');
const countries = document.querySelector('.countries')
const mode = document.querySelector('.mode')
// const modes = document.querySelectorAll('.modes')
const loader = document.querySelector('.loader')


//// Variables

const API = 'https://restcountries.com/v3.1/all'
// const API = 'https://restcountries.com/v3.1/name/{name}'

/// Functions

let modeBody = localStorage.getItem('mode')

const changeMode = () => {
    if(modeBody){
        body.classList.add(modeBody)
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


search.addEventListener('input', founds)

select.addEventListener("change", () => {
    if(select.value === 'all'){
        getApi(API)
        return
    }
    getApi(`https://restcountries.com/v3.1/region/${select.value}`)
});

function sorts(){
    countryInfo.sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

let countryInfo
const getData = async (resource) => {
    loader.classList.remove('Dnone')
    const result = await fetch(resource)
    if(!result.ok){
        throw new Error('Page Not Found Error 404')
    }
    const info = await result.json()
    return info
}

function getApi(api){
    getData(api).then((data) => {
        countryInfo =  data
        sorts()
        con(countryInfo)
    }).catch((error) => {
        console.log(error.message)
    }).finally(() => {
        loader.classList.add('Dnone')
    })
}

getApi(API)

function founds(){
    let a = countryInfo.filter(element => element.name.common.toLowerCase().includes(search.value.toLowerCase()))
    con(a)
}

function con(data){
    countries.innerHTML = ''
    data.forEach((e) => {
        countries.innerHTML += `
        <div class="country">
            <img src='${e.flags.svg}' alt="${e.altSpellings[1]}">
            <div class="info">
                <h1>${e.name.common}</h1>
                <p>Population: <span>${e.population}</span></p>
                <p>Region: <span>${e.continents}</span></p>
                <p>Capital: <span>${e.capital ? e.capital : 'Not capital'}</span></p>
            </div>
            <a href="./about.html?country=name/${e.name.common}" ></a>
        </div>`
    });
}
