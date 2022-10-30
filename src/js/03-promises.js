import Notiflix from 'notiflix';

let getEl = selector => document.querySelector(selector);
const inpDelay = getEl('input[name="delay"]');
const inpStep = getEl('input[name="step"]');
const inpAmount = getEl('input[name="amount"]');
const form = getEl('.form');

form.addEventListener('submit',promiseGenerator );

function getRandom() {
  return Math.random() > 0.3;
};

function promiseGenerator() {
  event.preventDefault();
  const maxAmmount = inpAmount.value;

  let delay = Number(inpDelay.value);
  let step = Number(inpStep.value);
  const shownTime = [0,delay];

  for (let i = 1; i <= maxAmmount; i += 1){    

  setTimeout(() => {  
   const promise = new Promise((resolve, reject) => {          
    if (getRandom()) {
      resolve(`✅ Fulfilled promise ${i} in ${shownTime[i]}ms`)
    } else {
      reject(`❌ Rejected promise ${i} in ${shownTime[i]}ms`)
    }
  });
  promise
    .then(value => {
      Notiflix.Notify.success(value);
    })
    .catch(error => {
      Notiflix.Notify.failure(error);
    });    
  }, delay);
    delay += step;
    shownTime.push(delay);
  }  
}