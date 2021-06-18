window.addEventListener('load', () => {
  console.log('Page loaded successfully!');

  const str = 'uncopyrightable';
  console.log('str.length=>', str.length); // -> 15

  const num = 1000;
  console.log(num.length); // -> undefined
  console.log('converted num length =>', String(num).length); // -> 4
});
