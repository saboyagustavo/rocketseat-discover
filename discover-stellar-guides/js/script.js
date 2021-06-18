window.addEventListener('load', () => {
  console.log('Page loaded successfully!');

  let sentence = "All you need is love";
  sentence = sentence.toUpperCase();
  console.log(sentence); // -> uppercase

  sentence = sentence.split('');
  console.log(sentence); // -> letter by letter

  sentence = sentence.join('').split(' ');
  console.log(sentence); // -> word by word

  sentence = sentence.join('_').toLowerCase();
  console.log(sentence); // -> lowered case and each word separated by underscore

  console.log(sentence.includes('love')); //true
});
