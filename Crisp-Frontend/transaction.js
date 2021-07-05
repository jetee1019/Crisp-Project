const add_date = document.getElementById('add-date');
const add_amt = document.getElementById('add-amount');
const add_desc = document.getElementById('add-desc');

// const dummyTransactions = [
//   { add_date: 12/6/2021, add_amt: -20, add_desc: 'BUS' },
//   { add_date: 15/6/2021, add_amt: 300, add_desc: 'GIFTS' },
// ];

// const localStorageTransactions = JSON.parse(
//     localStorage.getItem('transactions')
//   );
  
//   let transactions =
//     localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();
  
    if (add_date.value.trim() === '' || add_amt.value.trim() === '' || add_desc.value.trim() === '' ) {
      alert('Please add a date, amount and description');
    } else {
      const transaction = {
        add_date: add_date.value,
        add_amt: +add_amt.value,
        add_desc: add_desc.value
      };
  
    //   transactions.push(transaction);
  
    //   // addTransactionDOM(transaction);
  
    //   updateValues();
  
    //   updateLocalStorage();
      
    //   add_date.value = '';
    //   add_amt.value = '';
    //   add_desc.value = '';
    }
  }

  // Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
  
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
    const income = amounts
      .filter(item => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
  
    const expense = (
      amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
      -1
    ).toFixed(2);
  
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
  }
  
  // Remove transaction by ID
  function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
  
    updateLocalStorage();
  
    init();
  }
  
  // Update local storage transactions
  function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
  
  // Init app
  function init() {
    list.innerHTML = '';
  
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
  init();

  add.addEventListener('click', addTransaction);