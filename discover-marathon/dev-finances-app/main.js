let modal = null,
    transactionButton = null,
    cancelButton = null,
    transactionsTable = null;

window.addEventListener('load', init);
function init() {
    mapInputs();
    addEvents();

    render();
}

function mapInputs() {
    modal = document.querySelector('#modal');
    transactionButton = document.querySelector('.new');
    cancelButton = document.querySelector('.cancel');
    transactionsTable = document.querySelector('#data-table tbody');
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

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : '';

        value = String(value).replace(/\D/g, '');
        value /= 100;
        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'CAD',
        });

        return signal + value;
    },
};

const activity = {
    income() {
        //sum entries;
    },
    expenses() {
        // sum every expense
    },
    total() {
        //total = income - expense;
    },
};

const transactions = [
    {
        id: 1,
        description: 'Website design',
        amount: 250057,
        date: '01.23.2021',
    },
    {
        id: 2,
        description: 'Internet',
        amount: -20000,
        date: '02.01.2021',
    },
    {
        id: 3,
        description: 'Rent',
        amount: -130000,
        date: '02.05.2021',
    },
];

function render() {
    buildDataTable(transactions);
}

function buildDataTable(data) {
    const assembleTransactionTable = transaction => {
        const { description, amount, date } = transaction;
        const formattedAmount = Utils.formatCurrency(amount);
        const cssClass = amount > 0 ? 'income' : 'expense';
        const html = `
            <tr>
                <td class="description">${description}</td>
                <td class="${cssClass}">${formattedAmount}</td>
                <td class="date">${date}</td>
                <td>
                    <img src="./media/assets/minus.svg" alt="Remove transaction" />
                </td>
            </tr>`;

        return html;
    };

    const addTransaction = (transaction, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = assembleTransactionTable(transaction);
        transactionsTable.appendChild(tr);

        console.log('\nNEW TRANSACTION ADDED:', transaction);
    };

    assembleTransactionTable(data);
    transactions.forEach(transaction => addTransaction(transaction));
}
