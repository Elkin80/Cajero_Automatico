var cuentas = [
    { nombre: "Mali", saldo: 200 },
    { nombre: "Gera", saldo: 290 },
    { nombre: "Maui", saldo: 67 },
];

var selectedAccount = null;
var currentBalance = 0;

function showActions() {
    document.getElementById("actions").classList.remove("hidden");
}

function showBalance() {
    document.getElementById("balance").classList.remove("hidden");
    document.getElementById("balanceAmount").textContent = "$" + currentBalance;
}

function updateBalance(amount) {
    currentBalance += amount;
}

function showForm(formId) {
    document.getElementById(formId).classList.remove("hidden");
}

function hideForms() {
    document.getElementById("depositForm").classList.add("hidden");
    document.getElementById("withdrawForm").classList.add("hidden");
}

function isValidAmount(amount) {
    return amount >= 10 && amount <= 990;
}

function performTransaction(amount) {
    updateBalance(amount);
    showBalance();
}

function login() {
    var passwordInput = document.getElementById("passwordInput");
    var password = passwordInput.value;
    passwordInput.value = "";
    if (selectedAccount && selectedAccount.password === password) {
        showActions();
    } else {
        alert("Contraseña incorrecta. Inténtalo nuevamente.");
    }
}

function selectAccount() {
    var selectAccount = document.getElementById("selectAccount");
    var selectedName = selectAccount.value;
    selectedAccount = cuentas.find(account => account.nombre === selectedName);
    document.getElementById("actions").classList.add("hidden");
    document.getElementById("balance").classList.add("hidden");
    hideForms();
    if (selectedAccount) {
        document.getElementById("passwordInput").classList.remove("hidden");
        document.getElementById("loginBtn").classList.remove("hidden");
    } else {
        alert("Selecciona una cuenta válida.");
    }
}

function checkBalance() {
    showBalance();
}

function deposit() {
    showForm("depositForm");
}

function withdraw() {
    showForm("withdrawForm");
}

function depositConfirm() {
    var depositAmount = parseFloat(document.getElementById("depositAmount").value);
    if (isValidAmount(depositAmount)) {
    performTransaction(depositAmount);
    hideForms();
    } else {
    alert("Ingresa un monto válido (entre $10 y $990).");
    }
}

function withdrawConfirm() {
    var withdrawAmount = parseFloat(document.getElementById("withdrawAmount").value);
    if (isValidAmount(withdrawAmount)) {
        if (currentBalance >= withdrawAmount) {
            performTransaction(-withdrawAmount);
            hideForms();
        } else {
            alert("Saldo insuficiente.");
    }
        } else {
        alert("Ingresa un monto válido (entre $10 y $990).");
    }
}

