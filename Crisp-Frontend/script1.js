// //data from transactions-category

// const TransactionDataAll = [
//     { id: 1, category: 'Food', amount: 300 },
//     { id: 2, category: 'Transport', amount: 50 },
//     { id: 3, category: 'Entertainment', amount: 100 },
//     { id: 4, category: 'Bills', amount: 150 }

//    ];

//    var TransactionData = null;

var user_id = "K1733982Q";

function myFunction() {
  // data later get from the mysql
  var data = [
    { label: "Food", amount: 200 },
    { label: "Transport", amount: 50 },
    { label: "Entertainment", amount: 100 },
    {label: "Income", amount: 300},
  ];
  
    //canvas
    var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2;
    
    //The <g> SVG element is a container used to group other SVG elements.
    var g = svg.append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  // set the color scale  
    var color = d3.scaleOrdinal([
          'green', 'red', 'blue', 'orange']);
  
    // Compute the position of each group on the pie:   
    var pie = d3.pie().value(function(d) { 
          return d.amount; 
       });
    //radius for the arc   
    var path = d3.arc()
                 .outerRadius(radius - 10)
                 .innerRadius(0);
    
    //radius for the label      
    var label = d3.arc()
                  .outerRadius(radius)
                 .innerRadius(radius - 80);
          
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    var arc = g.selectAll(".arc")
             .data(pie(data))
             .enter()
             .append("g")
             .attr("class", "arc");
  
        arc.append("path")
             .attr("d", path)
             .attr("fill", function(d) { return color(d.data.label); });
  
             console.log(arc);
      
        arc.append("text")
           .attr("transform", function(d) { 
             return "translate(" + label.centroid(d) + ")"; 
     })
          
          .text(function(d) { return d.data.label; });
  
          svg.append("g")
          .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
          .append("text").text()
          .attr("class", "title")
          
    }

// //date filter
// function dateFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
//   function filterdateFunction() {
//     var input, filter, ul, li, a, i;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     div = document.getElementById("myDropdown");
//     a = div.getElementsByTagName("a");
//     for (i = 0; i < a.length; i++) {
//       txtValue = a[i].textContent || a[i].innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         a[i].style.display = "";
//       } else {
//         a[i].style.display = "none";
//       }
//     }
//   }
// }

// //category filter
// function catFunction() {
//   document.getElementById("myDropdown2").classList.toggle("show");
//   function filtercatFunction() {
//     var input, filter, ul, li, a, i;
//     input = document.getElementById("myInput2");
//     filter = input.value.toUpperCase();
//     div = document.getElementById("myDropdown2");
//     a = div.getElementsByTagName("a");
//     for (i = 0; i < a.length; i++) {
//       txtValue = a[i].textContent || a[i].innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         a[i].style.display = "";
//       } else {
//         a[i].style.display = "none";
//       }
//     }
//   }
// }
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
      <th>Edit</th>
      <th>Transaction ID</th>
      <th>Timestamp</th>
      <th>Category</th>
      <th>Description</th>
      <th>Amount</th>
      <th>Delete</th>
    </tr>`;
      data.forEach((item) => {
        table.innerHTML += `
          <tr>
            <td><a onClick="onEdit(this)">Edit</a></td>
            <td>${item.transaction_id}</td>
            <td>${item.transaction_date}</td>
            <td>${item.category}</td>
            <td>${item.description_id}</td>
            <td>${item.amount}</td>
            <td><a onClick="onDelete(this)">Delete</a></td>
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

//Transaction table
var selectedRow = null

// HTML form submission
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["date"] = document.getElementById("date").value;
    formData["amount"] = document.getElementById("amount").value;
    formData["desc"] = document.getElementById("desc").value;
    formData["cat"] = document.getElementById("cat").value;
    return formData;
}

//After HTML form submission, create a new record dynamically in HTML table
//Added Edit and Delete buttons dynamically for each record in the HTML table
function insertNewRecord(data) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "amount": data.amount,
    "transaction_date": data.date,
    "description_id": data.desc,
    "bank_account_id": user_id+"CASH"
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/transactions/add", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
  filterTransactions("",user_id)
   
}

//Reset the HTML form
function resetForm() {
    document.getElementById("date").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("cat").value = "";
    selectedRow = null;
}

//Handle edit operation for each row in HTML table, populate HTML form with row data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("date").value = selectedRow.cells[2].innerHTML;
    document.getElementById("amount").value = selectedRow.cells[5].innerHTML;
    document.getElementById("desc").value = selectedRow.cells[4].innerHTML;
    document.getElementById("cat").value = selectedRow.cells[3].innerHTML;
}

//After edit operation, need to show updated data in an HTML table
function updateRecord(formData) {
    selectedRow.cells[2].innerHTML = formData.date;
    selectedRow.cells[5].innerHTML = formData.amount;
    selectedRow.cells[4].innerHTML = formData.desc;
    selectedRow.cells[3].innerHTML = formData.cat;
}

//Handled delete operation, using deleteRow() function to delete row from HTML table
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("myTable").deleteRow(row.rowIndex);
        resetForm();
    }
}

//validation to the date field
function validate() {
    isValid = true;
    if (document.getElementById("date").value == "") {
        isValid = false;
        document.getElementById("DateValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("DateValidationError").classList.contains("hide"))
            document.getElementById("DateValidationError").classList.add("hide");
    }
    return isValid;
}