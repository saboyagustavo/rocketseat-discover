window.addEventListener('load', () => {
  console.log('Page loaded successfully!');

  let typeCoercionExample = 1 + '1';
  console.log('EXAMPLE =>', typeCoercionExample, typeof typeCohersionExample); //11 string

  typeCoercionExample = 'a' + 1;
  console.log('EXAMPLE2 =>', typeCoercionExample, typeof typeCohersionExample); //a1 string

  let str = '1';
  str = Number(str);
  console.log('EXAMPLE3 =>', str, typeof str); //1 number

  str = 'a';
  str = Number(str);
  console.log('EXAMPLE4 =>', str, typeof str); // NaN number

  let num = 1000;
  num = num.toString();
  console.log('EXAMPLE5 =>', num, typeof num,
    '\nLENGTH => ', num.length); // EXAMPLE5 => 1000 string LENGTH => 4
});
