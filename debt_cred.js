const readline = require('readline');
const fs = require('fs');

let debts = {}; 


function loadDebts() {
    if (fs.existsSync('debts.json')) {
        const data = fs.readFileSync('debts.json', 'utf8');
        Object.assign(debts, JSON.parse(data));
    }
}


function saveDebts() {
    fs.writeFileSync('debts.json', JSON.stringify(debts, null, 2));
}


function processTransaction(A, B, X) {
    if (!debts[A]) debts[A] = { owes: {}, owedBy: {} };
    if (!debts[B]) debts[B] = { owes: {}, owedBy: {} };

    if (!debts[A].owes[B]) debts[A].owes[B] = 0;
    if (!debts[B].owedBy[A]) debts[B].owedBy[A] = 0;

    debts[A].owes[B] += X;
    debts[B].owedBy[A] += X;

    saveDebts();
}

// Query the total debt owed by a person
function queryDebtOwedByPerson(person) {
    if (!debts[person]) return 0;
    return Object.values(debts[person].owes).reduce((acc, val) => acc + val, 0);
}

// Query the total money owed to a person
function queryMoneyOwedToPerson(person) {
    if (!debts[person]) return 0;
    return Object.values(debts[person].owedBy).reduce((acc, val) => acc + val, 0);
}

// Query the person with the most money owed
function queryPersonWithMostMoneyOwed() {
    let maxPerson = null;
    let maxAmount = 0;

    for (let person in debts) {
        const totalOwed = queryMoneyOwedToPerson(person);
        if (totalOwed > maxAmount) {
            maxPerson = person;
            maxAmount = totalOwed;
        }
    }

    return maxPerson;
}

// Query the person with the most debt
function queryPersonWithMostDebt() {
    let maxPerson = null;
    let maxAmount = 0;

    for (let person in debts) {
        const totalDebt = queryDebtOwedByPerson(person);
        if (totalDebt > maxAmount) {
            maxPerson = person;
            maxAmount = totalDebt;
        }
    }

    return maxPerson;
}
//clear
function clearOldEntries() {
    debts= {}
}


// Initialize the command-line interface
function startCLI() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    });

    console.log('Welcome to the Debt Management System!');
    console.log('Available commands:');
    console.log('- transaction A,B,X');
    console.log('- queryOwedBy A');
    console.log('- queryOwedTo A');
    console.log('- queryMostOwed');
    console.log('- queryMostDebt');
    console.log('- clearOldEntries');
    console.log('- exit');

    rl.prompt();

    rl.on('line', (line) => {
        const [command, ...args] = line.trim().split(' ');

        switch (command) {
            case 'transaction':
                if (args.length === 1) {
                    const [A, B, X] = args[0].split(',');
                    processTransaction(A, B, parseFloat(X));
                    console.log(`Processed transaction: ${A} owes ${B} $${X}`);
                } else {
                    console.log('Invalid transaction format. Use: transaction A,B,X');
                }
                break;

            case 'queryOwedBy':
                if (args.length === 1) {
                    const person = args[0];
                    const debt = queryDebtOwedByPerson(person);
                    console.log(`${person} owes a total of $${debt}`);
                } else {
                    console.log('Invalid format. Use: queryOwedBy A');
                }
                break;

            case 'queryOwedTo':
                if (args.length === 1) {
                    const person = args[0];
                    const owed = queryMoneyOwedToPerson(person);
                    console.log(`A total of $${owed} is owed to ${person}`);
                } else {
                    console.log('Invalid format. Use: queryOwedTo A');
                }
                break;

            case 'queryMostOwed':
                const mostOwedPerson = queryPersonWithMostMoneyOwed();
                console.log(`${mostOwedPerson} owed the most money.`);
                break;

            case 'queryMostDebt':
                const mostDebtPerson = queryPersonWithMostDebt();
                console.log(`${mostDebtPerson} owes the most money.`);
                break;

            case 'clearOldEntries':
                clearOldEntries();
                console.log('All old entries cleared');
                
                break;    

            case 'exit':
                rl.close();
                break;

            default:
                console.log('Unknown command. Please try again.');
                break;
        }

        rl.prompt();
    }).on('close', () => {
        console.log('Exiting the Debt Management System.');
        process.exit(0);
    });
}

loadDebts();
startCLI();
