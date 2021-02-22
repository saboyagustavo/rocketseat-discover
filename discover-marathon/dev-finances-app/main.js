let modal = null,
    transactionButton = null,
    cancelButton = null,
    transactionsTable = null,
    incomes = null,
    expenses = null,
    balance = null,
    form = null,
    descriptionInput = null,
    amountInput = null,
    dateInput = null;

window.addEventListener('load', init);
function init() {
    mapIO();
    addEvents();

    render();
}

function mapIO() {
    modal = document.querySelector('#modal');
    transactionButton = document.querySelector('.new');
    cancelButton = document.querySelector('.cancel');
    transactionsTable = document.querySelector('#data-table tbody');
    incomes = document.getElementById('incomes');
    expenses = document.getElementById('expenses');
    balance = document.getElementById('total');
    form = document.getElementById('form');
    descriptionInput = document.getElementById('description');
    amountInput = document.getElementById('amount');
    dateInput = document.getElementById('date');
}

function addEvents() {
    transactionButton.addEventListener('click', Modal.open);
    cancelButton.addEventListener('click', Modal.close);
    form.addEventListener('submit', Form.handleSubmit);
}

const Modal = {
    open() {
        modal.classList.add('active');
    },

    close() {
        modal.classList.remove('active');
    },
};

const Form = {
    handleSubmit(event) {
        event.preventDefault();
        try {
            Form.validateFields();
            const data = Form.formatValues();
            activities.add(data);
            Form.clearFields();
            Modal.close();
        } catch (error) {
            alert(error.message);
        }
    },

    getValues() {
        return {
            description: descriptionInput.value,
            amount: amount.value,
            date: date.value,
        };
    },
    validateFields() {
        const { description, amount, date } = Form.getValues();

        if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
            throw new Error('Please fill in the form fields.');
        }
    },
    formatValues() {
        let { description, amount, date } = Form.getValues();
        amount = Utils.formatAmount(amount);
        date = Utils.formatDate(date);

        return {
            description,
            amount,
            date,
        };
    },
    clearFields() {
        descriptionInput.value = '';
        amountInput.value = '';
        dateInput.value = '';
    },
};

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : '';

        value = String(value).replace(/\D/g, '');
        value /= 100;
        value = value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'CAD',
        });

        return signal + value;
    },

    formatAmount(value) {
        return (value = Number(value) * 100);
    },
    formatDate(date) {
        const splittedDate = date.split('-');
        date = `${splittedDate[1]}.${splittedDate[2]}.${splittedDate[0]}`;
        return date;
    },
};

const activities = {
    add(data) {
        transactions.push(data);
        render();
    },
    remove(index) {
        transactions.splice(index, 1);
        render();
    },

    updateBalance(data) {
        incomes.innerHTML = Utils.formatCurrency(this.countIncomes(data));
        expenses.innerHTML = Utils.formatCurrency(this.countExpenses(data));
        balance.innerHTML = Utils.formatCurrency(this.countTotal(data));
    },
    countIncomes(transactions) {
        let incomeAmount = 0;
        transactions.forEach(transaction => {
            if (transaction.amount > 0) {
                incomeAmount += transaction.amount;
            }
        });
        return incomeAmount;
    },
    countExpenses(transactions) {
        let expensesAmount = 0;
        transactions.forEach(transaction => {
            if (transaction.amount < 0) {
                expensesAmount += transaction.amount;
            }
        });
        return expensesAmount * -1;
    },
    countTotal(data) {
        const total = this.countIncomes(data) + this.countExpenses(data);
        return total;
    },
};

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem('dev.finances:transactions')) || [];
    },

    set(transactions) {
        localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions));
    },
};

const transactions = Storage.get();

function buildDataTable(data) {
    transactionsTable.innerHTML = '';

    const assembleTransactionTable = (transaction, index) => {
        const { description, amount, date } = transaction;
        const formattedAmount = Utils.formatCurrency(amount);
        const cssClass = amount > 0 ? 'income' : 'expense';
        const html = `
            <tr>
                <td class="description">${description}</td>
                <td class="${cssClass}">${formattedAmount}</td>
                <td class="date">${date}</td>
                <td>
                    <img onclick="activities.remove(${index})" class="clickable" src="./media/assets/minus.svg" alt="Remove transaction" />
                </td>
            </tr>`;

        return html;
    };

    const addTransaction = (transaction, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = assembleTransactionTable(transaction, index);
        transactionsTable.appendChild(tr);
        tr.dataset.index = index;
        console.log('\nNEW TRANSACTION ADDED:', transaction);
    };

    assembleTransactionTable(data);
    transactions.forEach(transaction => addTransaction(transaction));
}

function render() {
    buildDataTable(transactions);
    activities.updateBalance(transactions);
    Storage.set(transactions);
}
