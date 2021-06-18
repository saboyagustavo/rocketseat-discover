function doSomething(something) {
  console.log('before callback exection');

  something();

  console.log('after callback exection');
}

doSomething(() => console.log('inside the callback execution'));