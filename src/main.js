const resultEl = document.getElementById('result');
const rangeLength = document.getElementById('range');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const clipboardBtn = document.getElementById('clipboard');

rangeLength.addEventListener('input', syncLength);
lengthEl.addEventListener('input', syncLength);

function syncLength(e) {
    const value = e.target.value;
    rangeLength.value = value;
    lengthEl.value = value;
}

const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

clipboardBtn.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password copied to clipboard');
});

generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumbers, hasSymbols, length);
});

function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
    console.log(typesCount);
    const typesArray = [{ upper }, { lower }, { number }, { symbol }].filter(
        (item) => Object.values(item)[0]
    );
    console.log('typesArray: ', typesArray);

    if (typesCount === 0) {
        return '';
    }
    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach((type) => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    console.log(generatePassword);
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
