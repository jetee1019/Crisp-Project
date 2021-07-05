// //data from transactions-category

// const TransactionDataAll = [
//     { id: 1, category: 'Food', amount: 300 },
//     { id: 2, category: 'Transport', amount: 50 },
//     { id: 3, category: 'Entertainment', amount: 100 },
//     { id: 4, category: 'Bills', amount: 150 }

//    ];

//    var TransactionData = null;

const user_id = "K1733982Q";

function myFunction() {
  // data later get from the mysql
  var data = [
    { label: "Food", amount: 300 },
    { label: "Transport", amount: 50 },
    { label: "Entertainment", amount: 100 },
  ];
  var svg = d3
    .select("svg") //drawing the canvas
    .append("svg")
    .attr("width", 500)
    .attr("height", 200);

  svg
    .selectAll("rect") //this whole section is the data
    .data(data)
    .enter()
    .append("rect") //rectangle without parameters
    .attr("transform", function (d, i) {
      return "translate(" + 20 + "," + i * 25 + ")";
    })

    .attr("fill", "#86BAA1")
    .attr("height", 20)
    .attr("width", function (d) {
      return d.amount + "px";
    });
  //width = 40px

  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("transform", function (d, i) {
      return "translate(0," + Number(i * 25 + 15) + ")";
    })
    .attr("fill", "black")
    .text(function (d) {
      return d.label;
    });
}

//date filter
function dateFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  function filterdateFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
}

//category filter
function catFunction() {
  document.getElementById("myDropdown2").classList.toggle("show");
  function filtercatFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput2");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown2");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
}
//To see how to get category input by document.getElementbyID
//Type into category (e.g.Transport) to filter, leave blank to remove filter
var category = "Transport";

function filterTransactions(category, user_id) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `http://localhost:3000/transactions/list/by-category?category=${category}&user_id='${user_id}'`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      var table = document.getElementById("myTable");
      table.innerHTML = `<tr>
      <th>Transaction ID</th>
      <th>Timestamp</th>
      <th>Category</th>
      <th>Description</th>
      <th>Amount</th>
    </tr>`;
      data.forEach((item) => {
        table.innerHTML += `
          <tr>
            <td>${item.transaction_id}</td>
            <td>${item.transaction_date}</td>
            <td>${item.category}</td>
            <td>${item.description_id}</td>
            <td>${item.amount}</td>
          </tr>`;
      });
    })
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function init() {
  filterTransactions("",user_id)
};

init()