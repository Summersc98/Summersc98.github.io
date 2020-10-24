/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// You may wish to find an effective randomizer function on MDN.

// const { default: countries } = require("./countries");
// how the frick did the above line just pop outta nowhere??? i didnt add this!

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

      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }

      // random function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

      // below chunk inspired by code from https://stackoverflow.com/questions/47907534/using-map-to-add-incrementing-values-to-js-objects
      const indexedList = fromServer.map((uniqueCountry, index) => Object.assign({}, uniqueCountry, { id: index }));
      // console.table(indexedList);

      // i am unreasonably proud of this (probably) really bad code chunk
      const tenUnique = [];
      function get10unique() {
        number = getRandomInt(243);
        if (tenUnique.includes(number)) {
          get10unique();
        }
        else {
          tenUnique.push(number);
        }
        if (tenUnique.length < 10) {
          get10unique();
        }
      }
      get10unique();
      // console.log(tenUnique);

      const countrylist = indexedList.filter(function(individualCountry) {
        if(tenUnique.includes(individualCountry.id) === true) {
          return true;
        }
      });
      console.log(countrylist);

      // since I'm basically using the original index values, and they were alphabetically sorted to begin with,
      // i don't need to touch alphabetic sorting here
      // i can just sort by id
      const zyx = countrylist.sort(function(a, b) {
        const indexA = a.id;
        const indexB = b.id;
        if(indexA > indexB) {
          return -1;
        }
        else {
          return 1;
        }
      });
      console.table(zyx);

      // const newThing = document.createElement("ol");
      // newThing.appendChild(zyx);
      // document.body.insert

      // below code chunk taken from lecture 7.2
      // i really could not figure out how to do this one any other way
      const ul = document.createElement('ul');
      ul.className = 'flex-inner';
      $('form').prepend(ul);
      zyx.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
        $(li).append(`<label for=${el.code}>${el.name}</label>`);
        $(ul).append(li);
      });

      // End lab work in here
      // UNCOMMENT THE BELOW LINE WHEN DONE, IT WAS JUST ANNOYING TO LOOK AT
      // console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});