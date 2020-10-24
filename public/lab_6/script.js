/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// You may wish to find an effective randomizer function on MDN.

// const { default: countries } = require("./countries");
// how the frick did the above line just pop outta nowhere??? i didnt add this! >:(

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // Start lab work
      const test = fromServer.filter((individualCountry) => {
        if (individualCountry.code === 'AX') {
          return true; // return true means you keep it, return falso means you throw it out, but you dont need return false, it's assumed
        }
      });
      console.log(test);
      // End lab work in here
      // UNCOMMENT THE BELOW LINE WHEN DONE, IT WAS JUST ANNOYING TO LOOK AT
      // console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});