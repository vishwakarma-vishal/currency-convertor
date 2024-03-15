const MAIN_URL = "https://open.er-api.com/v6/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.getElementById("btn");
const fromCurr = document.querySelectorAll("select")[0];
const toCurr = document.querySelectorAll("select")[1];
const resultBox = document.getElementById("result");

//on page load
window.addEventListener("load", () => {
    updateExchangeRate();
});

//adding country & currency code options in select
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target); //function for changing flag
    });
}

//flag updation
function updateFlag(ele) {
    let currCode = ele.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flag = ele.parentElement.querySelector("img");
    flag.src = newSrc;
}

//button click
btn.addEventListener("click", (evt) => {
    evt.preventDefault(); //for preventing button click default behaviour
    updateExchangeRate();
});

//for updating exchange rate
async function updateExchangeRate() {
    let amt = document.getElementById("amount");
    let amtVal = amt.value;
    if (1 > amtVal || amtVal === "") {
        amtVal = 1;
        amt.value = "1";
    }
    //data from API call
    const URL = `${MAIN_URL}/${(fromCurr.value)}`;

    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data.rates;
        let value = rate[(toCurr.value)]
        let finalVal = amtVal * value;
        resultBox.innerText = `$${amtVal} ${(fromCurr.value)} = ₹${finalVal} ${(toCurr.value)}`;
    }
    catch{
        resultBox.innerText = 'Opps: "Unable to fetch data"';
        resultBox.style.color = "red";
    }
}