let modal = null,
    transactionButton = null,
    cancelButton = null;

window.addEventListener('load', init);
function init() {
    mapInputs();
    addEvents();
}

function mapInputs() {
    modal = document.querySelector('#modal');
    transactionButton = document.querySelector('.new');
    cancelButton = document.querySelector('.cancel');
}

function addEvents() {
    transactionButton.addEventListener('click', newTransaction);
    cancelButton.addEventListener('click', cancelEntry);
}

function newTransaction() {
    modal.classList.add('active');
}

function cancelEntry() {
    modal.classList.remove('active');
}
