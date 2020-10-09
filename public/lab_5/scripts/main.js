const myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';

document.querySelector('html').onclick = function() {
    // eslint-disable-next-line no-alert
    alert('Ouch! Stop poking me!');
};