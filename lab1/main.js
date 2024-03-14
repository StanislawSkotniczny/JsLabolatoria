let autoCalculate = false; 

function Oblicz() {
    const inputs = document.querySelectorAll('.valueInput');
    let sum = 0, values = [];

    inputs.forEach(input => {
        const value = parseFloat(input.value) || 0;
        values.push(value);
        sum += value;
    });

    const average = values.length > 0 ? sum / values.length : 0;
    const min = Math.min(...values);
    const max = Math.max(...values);

    document.getElementById('result').innerHTML = `
        Suma: ${sum}<br>
        Średnia: ${average}<br>
        Min: ${min}<br>
        Max: ${max}
    `;
}

function addField() {
    const container = document.getElementById('fieldsContainer');
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'inputWrapper';

    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'valueInput';
    newInput.placeholder = `wartość ${document.querySelectorAll('.valueInput').length + 1}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Usuń';
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', function() { removeField(inputWrapper); });

    inputWrapper.appendChild(newInput);
    inputWrapper.appendChild(deleteButton);
    container.appendChild(inputWrapper);

    if (autoCalculate) {
        newInput.addEventListener('input', Oblicz);
    }
}

function removeField(wrapper) {
    wrapper.remove();
    if (autoCalculate) Oblicz();
}

function activateAutoCalculate() {
    if (!autoCalculate) {
        document.querySelectorAll('.valueInput').forEach(input => {
            input.addEventListener('input', Oblicz);
        });
        autoCalculate = true;
    }
    Oblicz();
}

function setupDeleteButtons() {
    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', function() {
            removeField(button.parentElement);
        });
    });
}

function initialize() {
    document.getElementById('addButton').addEventListener('click', addField);
    document.getElementById('calculateButton').addEventListener('click', activateAutoCalculate);
    setupDeleteButtons();
}

initialize();