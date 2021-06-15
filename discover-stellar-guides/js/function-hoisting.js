window.addEventListener('load', init);

function init() {
  console.log('Page loaded successfully!');

  const title = document.getElementById('title');

  const myName = 'Gustavo';

  writeAName(myName); // -> name successfully writed
  function writeAName(name) {
    title.innerText = `Hello, ${name}.`;
    return console.log(`The name "${name}" was writed on page's title.`);
  }

  /*-------- anonymous function approach

  const defaultTitle = 'Hello world!';

  writeDefaultTitle(); // -> ReferenceError: Cannot access before initialization
  const writeDefaultTitle = function () {
    title.innerText = `Hello, ${defaultTitle}.`;
    return console.log(`"${defaultTitle}" was writed on page's title.`);
  };

  --------*/

  /*------- var hoisting approach --------*/
  const anyName = 'someone';

  writeTitleWithoutName(anyName); // -> TypeError: writeTitleWithoutName is not a function
  var writeTitleWithoutName = function (any) {
    title.innerText = `Hello, ${any}.`;
    return console.log(`"${any}" was writed on page's title.`);
  };


}