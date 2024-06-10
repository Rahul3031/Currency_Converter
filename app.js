const BASE_URL="https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const msg_1=document.querySelector(".msg-1");
const msg_2=document.querySelector(".msg-2");

window.addEventListener("load",()=>{
    updateExchangeRate();
});


// for(let code in countryList){
//     console.log(code,countryList[code]);
// }

for(let select of dropdowns){
    for(currCode in countryList) {
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name=="from" && currCode=="USD"){
            newOption.selected="selected";
        }
        if(select.name=="to" && currCode=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);

        select.addEventListener("change", (evt)=>{
            updateFlag(evt.target);
        });
    } 
}

const updateFlag=(element)=>{
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newSrc;
}

btn.addEventListener("click", (evt)=>{
    // to prevent the default behaviour of form
    evt.preventDefault(); 
    updateExchangeRate();
});

const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amnval=amount.value;
    if(amnval==="" || amnval<1) {
        amnval=1;
        amount.value="1";
    } 
    // console.log(fromCurr.value,toCurr.value);


    const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalAmount = (amnval*rate).toFixed(2); 
    // console.log(finalAmount);
    msg_1.innerText =`${amnval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    msg_2.innerText = `Last Update: ${data.date}`;
}


