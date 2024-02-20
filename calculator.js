// This fucntion is holding all the values from x, y, operator, and the result once its entered into the prompt section
function getInputs() {
    let operations = []; // An empty array to store operations

    do {
        let x_int = parseFloat(prompt("Value of x"));
        if (isNaN(x_int)) break; // Exit if cancel is pressed or input is not a number
        
        let oper = prompt("Operator (+, -, *, /, %)");
        if (!oper) break; // Exit if cancel is pressed
        
        let y_int = parseFloat(prompt("Value of y"));
        if (isNaN(y_int)) break; // Exit if cancel is pressed or input is not a number
        
        let result;
        
        switch (oper) {
            case '+':
                result = x_int + y_int;
                break;
            case '-':
                result = x_int - y_int;
                break;
            case '*':
                result = x_int * y_int;
                break;
            case '/':
                if (y_int === 0) {
                    alert("Computation error: Division by zero.");
                    continue;
                } else {
                    result = x_int / y_int;
                }
                break;
            case '%':
                result = x_int % y_int;
                break;
            default:
                alert("Computation error: Incorrect operator");
                continue;
        }

        operations.push({ x_int, oper, y_int, result });
    } while (confirm("Continue?"));

    results1Table(operations);
    results2Table(operations);
}

// this fucntion is taking the stored infromation and adding it to the first table
function results1Table(operations) {
    // Check if the table already exists
    let existingTable = document.getElementById('resultsTable');
    if (existingTable) {
        existingTable.remove(); // Removes the existing table
    }

    // Create a new table
    const table = document.createElement('table');
    table.setAttribute('border', '1');
    table.setAttribute('id', 'resultsTable'); // Assign an ID to the new table

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Style the header row
    headerRow.style.backgroundColor = 'orange'; 

    ['X', 'Operator', 'Y', 'Result'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    operations.forEach(op => {
        const tr = document.createElement('tr');
        
        // Array of operation values including the operator
        const operationValues = [op.x_int, op.oper, op.y_int, op.result];
        
        operationValues.forEach((value, index) => {
            const td = document.createElement('td');
            td.textContent = value;
            
            // For finding the operator index and giving it the background color
            if (index === 1) { 
                td.style.backgroundColor = 'tan'; 
            }
            
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);

    // Append the new table to the body or another element of your choice
    document.body.appendChild(table);
}

// This fucntion is taking the stored infromation and adding it to the second table
function results2Table(operations) {
    // Check if the table already exists
    let existingTable = document.getElementById('statsTable');
    if (existingTable) {
        existingTable.remove(); // Remove the existing table
    }

    // Create a new table
    const table = document.createElement('table');
    table.setAttribute('border', '1');
    table.setAttribute('id', 'statsTable'); // Assign an ID to the new table

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.style.backgroundColor = 'orange'; 
    ['Min', 'Max', 'Average', 'Total'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Initialize variables for min, max, total, and average
    let min = Math.min(...operations.map(op => op.result));
    let max = Math.max(...operations.map(op => op.result));
    let total = operations.reduce((acc, op) => acc + op.result, 0);
    let average = total / operations.length;

    // Create table body with a single row for the statistics
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    [min, max, average, total].forEach(value => {
        const td = document.createElement('td');
        td.textContent = value.toFixed(2); // Formatting numbers to 2 decimal places
        tr.appendChild(td);
    });
    tbody.appendChild(tr);
    table.appendChild(tbody);

    // Append the new table to the body 
    document.body.appendChild(table);
}

// This is here so the prompt doesnt pop up every time the page is refreshed
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startButton').addEventListener('click', getInputs);
});

