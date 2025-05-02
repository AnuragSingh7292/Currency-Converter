const  Base_url ="https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg p")


for(let select of dropdowns)
{
    for(currcode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode  === "USD")
        {
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currcode  === "INR")
            {
                newOption.selected = "selected";
            }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag =  (element) => {
    let  currCode = element.value;
    let countryCode = countryList[currCode];
    let newImageSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

   let img =  element.parentElement.querySelector("img");
   img.src = newImageSrc;

};

btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amountVal =  document.querySelector(".amount input").value;

    if(amountVal === "" || amountVal < 1)
    {
        alert("Please enter a valid amount");
        amountVal = 1
    }

    // console.log(fromCurr.value.toLowerCase())
    const URL = `${Base_url}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL)

    let data = await response.json();
    // console.log(data);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate);

    let finalAmount = amountVal  * rate;

    msg.innerText = `${amountVal}  ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});


