window.addEventListener('load', () => {
  console.log('Page loaded successfully!');
  const title = document.getElementById('title');

  function writeTimestamp() {
    const timestamp = new Date();
    console.log('TIMESTAMP', timestamp
      .__proto__
      .constructor
      .now());
    return timestamp;
  }

  title.innerText = `${writeTimestamp()}`;
});
