/* eslint-disable linebreak-style */
/* eslint-disable no-console */

function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  // start of code from demo
  function range(int) {
    const arr = [];
    for (let i = 0; i < int; i += 1) {
      arr.push(i);
    }
    return arr;
  }
  function getRandomIntInclusive(min, max) {
    const min1 = Math.ceil(min);
    const max1 = Math.floor(max);
    return Math.floor(Math.random() * (max1 - min1 + 1) + min1); // The maximum is inclusive and the minimum is inclusive
  }
  async function loadData() {
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
  
    const arrayOfTenItems = range(10);
    const randomRestaurantsArray = arrayOfTenItems.map((item) => {
      const which = getRandomIntInclusive(0, json.length);
      const restaurant = json[which]; // we are not worrying about uniqueness here
      return restaurant;
    });
    
    console.log('this is 10 elements of our data as it comes in');
    console.table(randomRestaurantsArray); // This shows the shape of our data as it arrives
    // console.table(json);

  
    /// And now, how to get what we want
    const newDataShape = json.reduce((collection, item, i) => {
      // for each item, check if we have a category for that item already
      const findCat = collection.find((findItem) => findItem.label === item.category);
      
      if (!findCat) {
        collection.push({
          label: item.category,
          y: 1
        });
      } else {
        const position = collection.findIndex(el => el.label === item.category);
        collection[position].y += 1;
      }
      return collection;
    }, []);
  
    console.log("here's the data in the shape we want it:")
    console.table(newDataShape);
  }
  
  window.onload = loadData;
  // end of code from demo
  const list = newDataShape;
  return list;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Change This Title'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Change This Title',
      labelFontSize: 12,
      scaleBreaks: {customBreaks: []} // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});

window.onload = convertRestaurantsToCategories();