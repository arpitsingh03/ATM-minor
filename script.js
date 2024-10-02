let balances = {
    checkings: 1000.00,
    savings: 5000.00
};

const loginForm = document.getElementById('loginForm');
const loginScreen = document.getElementById('loginScreen');
const mainMenu = document.getElementById('mainMenu');
const checkingsScreen = document.getElementById('checkingsScreen');
const savingsScreen = document.getElementById('savingsScreen');
const transactionScreen = document.getElementById('transactionScreen');
const transactionTitle = document.getElementById('transactionTitle');
const transactionForm = document.getElementById('transactionForm');

let currentAccount = '';
let currentTransactionType = '';

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const customerNumber = document.getElementById('customerNumber').value;
    const pinNumber = document.getElementById('pinNumber').value;

    if (validateLogin(customerNumber, pinNumber)) {
        loginScreen.style.display = 'none';
        mainMenu.style.display = 'block';
    } else {
        alert('Invalid Customer Number or PIN.');
    }
});

function validateLogin(customerNumber, pinNumber) {
    // Dummy validation for two accounts
    return (customerNumber === "952141" && pinNumber === "191904") ||
           (customerNumber === "123" && pinNumber === "123");
}

function redirectToAccount(accountType) {
    currentAccount = accountType;
    mainMenu.style.display = 'none';
    if (accountType === 'checkings') {
        checkingsScreen.style.display = 'block';
    } else if (accountType === 'savings') {
        savingsScreen.style.display = 'block';
    }
}

function showBalance(accountType) {
    alert(`${capitalize(accountType)} Balance: $${balances[accountType].toFixed(2)}`);
}

function navigateTo(transactionType, accountType) {
    currentTransactionType = transactionType;
    currentAccount = accountType;
    const transactionAction = capitalize(transactionType);
    transactionTitle.textContent = `${transactionAction} (${capitalize(accountType)} Account)`;
    checkingsScreen.style.display = 'none';
    savingsScreen.style.display = 'none';
    transactionScreen.style.display = 'block';
}

transactionForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (currentTransactionType === 'withdraw') {
        if (balances[currentAccount] < amount) {
            alert('Insufficient funds.');
            return;
        }
        balances[currentAccount] -= amount;
    } else if (currentTransactionType === 'deposit') {
        balances[currentAccount] += amount;
    } else if (currentTransactionType === 'transfer') {
        let otherAccount = currentAccount === 'checkings' ? 'savings' : 'checkings';
        if (balances[currentAccount] < amount) {
            alert('Insufficient funds to transfer.');
            return;
        }
        balances[currentAccount] -= amount;
        balances[otherAccount] += amount;
    }

    alert(`${capitalize(currentTransactionType)} of $${amount.toFixed(2)} successful.`);
    goBackToAccount();
});

function goBackToAccount() {
    transactionScreen.style.display = 'none';
    if (currentAccount === 'checkings') {
        checkingsScreen.style.display = 'block';
    } else {
        savingsScreen.style.display = 'block';
    }
}

function goBackToMainMenu() {
    checkingsScreen.style.display = 'none';
    savingsScreen.style.display = 'none';
    mainMenu.style.display = 'block';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function exitATM() {
    alert('Thank you for using the ATM.');
    location.reload();
}