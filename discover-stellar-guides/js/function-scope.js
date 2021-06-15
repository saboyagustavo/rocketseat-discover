window.addEventListener('load', init());

function init() {
  console.log('Page loaded successfully!');
  const title = document.getElementById('title');

  let subject = 'ReactJS';
  console.log(subject);


  function createSubject() {
    subject = 'JavaScript';
    return subject;
  }

  console.log(subject);

  createSubject();
  console.log(subject);

  title.innerText = subject;
  console.log(createSubject());
}

