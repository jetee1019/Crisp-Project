const database = require("./database");
const express = require("express");

router = express.Router();

router.get("/users/all", (request, response) => {
  database.connection.query(`select * from users`, (error, result) => {
    if (error) {
      console.log(error);
      response.status(500).send("Some error occurred at the Backend.");
    } else {
      response.status(200).send(result);
    }
  });
});

router.get("/bank_accounts/all", (request, response) => {
  database.connection.query(`select * from bank_accounts`, (error, result) => {
    if (error) {
      console.log(error);
      response.status(500).send("Some error occurred at the Backend.");
    } else {
      response.status(200).send(result);
    }
  });
});

router.get("/transactions/all", (request, response) => {
  database.connection.query(`select * from transactions`, (error, result) => {
    if (error) {
      console.log(error);
      response.status(500).send("Some error occurred at the Backend.");
    } else {
      response.status(200).send(result);
    }
  });
});

router.get("/category/all", (request, response) => {
  database.connection.query(`select * from category`, (error, result) => {
    if (error) {
      console.log(error);
      response.status(500).send("Some error occurred at the Backend.");
    } else {
      response.status(200).send(result);
    }
  });
});


router.get("/transactions/sum/by-category", (request, response) => {
  database.connection.query(
    `select SUM (amount) as sum from transactions t right join category c on t.description_id = c.description_id left join bank_accounts as b on t.bank_account_id = b.bank_account_id where category = '${request.query.category}' AND user_id = '${request.query.user_id}'`,
    (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send("Some error occurred at the Backend.");
      } else {
        response.status(200).send(result);
      }
    }
  );
});

router.get("/transactions/overview", (request, response) => {
  database.connection.query(
    `select c.category as label, SUM (amount) as amount from transactions t 
    right join category c on t.description_id = c.description_id 
    left join bank_accounts as b on t.bank_account_id = b.bank_account_id 
    where user_id = '${request.query.user_id}'
    group by category
    order by category`,
    (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send("Some error occurred at the Backend.");
      } else {
        response.status(200).send(result);
      }
    }
  );
});


router.get("/transactions/list/by-category", (request, response) => {
  database.connection.query(`SELECT t.*, c.category
  FROM transactions as t
  RIGHT JOIN category as c
    ON t.description_id = c.description_id
  LEFT JOIN bank_accounts as b
    ON t.bank_account_id = b.bank_account_id
  WHERE category LIKE '%${request.query.category}%' and user_id = ${request.query.user_id}`, (error, result) => {
    if (error) {
      console.log(error);
      response.status(500).send("Some error occurred at the Backend.");
    } else {
      response.status(200).send(result);
    }
  });
});


// /* READ a list of Transactions by Category */
// select t.*, c.category, b.user_id
// from transactions as t
// right join category as c
// on t.description_id = c.description_id
// left join bank_accounts as b
// on t.bank_account_id = b.bank_account_id
// where category = 'Transport' and user_id = 'K1733982Q';




router.get("/transactions/by-category", (request, response) => {
  database.connection.query(
    `select t.*, c.category, b.user_id from transactions t right join category c on t.description_id = c.description_id left join bank_accounts as b on t.bank_account_id = b.bank_account_id where category = '${request.query.category}' AND user_id = '${request.query.user_id}'`,
    (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send("Some error occurred at the Backend.");
      } else {
        response.status(200).send(result);
      }
    }
  );
});




// router.get("/transactions/by-category", (request, response) => {
//   database.connection.query(
//     `select t.*, c.category, b.user_id FROM transactions t RIGHT JOIN category c ON t.description_id 
//     = c.description_id LEFT JOIN bank_accounts b ON t.bank_account_id = b.bank_account_id WHERE category = ${request.query.category}`,
//     (error, result) => {
//       if (error) {
//         console.log(error);
//         response.status(500).send("Some error occurred at the Backend.");
//       } else {
//         response.status(200).send(result);
//       }
//     }
//   );
// });


    router.post("/transactions/add", (request, response) => {
      database.connection.query(
        `insert into transactions (amount, transaction_date, description_id, bank_account_id) values (
          '${request.body.amount}', '${request.body.transaction_date}', '${request.body.description_id}', '${request.body.bank_account_id}'
          )`,
        (error, result) => {
          if (error) {
            console.log(error);
            response.status(500).send("Some error occurred at the Backend.");
          } else {
            response.status(200).send("New transaction created successfully!");
          }
        }
      );
    });

// router.post("/products/add", (request, response) => {
//   database.connection.query(
//     `insert into products (name, market_price) values ('${request.body.name}', '${request.body.price}')`,
//     (error, result) => {
//       if (error) {
//         console.log(error);
//         response.status(500).send("Some error occurred at the Backend.");
//       } else {
//         response.status(200).send("New product created successfully!");
//       }
//     }
//   );
// });


router.put("/transactions/update/by-id", (request, response) => {
  database.connection.query(
    `update transactions set amount = '${request.body.amount}' where transaction_id = '${request.body.transaction_id}'`,
    (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send("Some error occurred at the Backend.");
      } else {
        response.status(200).send("Updated successfully!");
      }
    }
  );
});

// router.put("/products/update/by-id", (request, response) => {
//   database.connection.query(
//     `update products set name = '${request.body.new_name}', market_price = '${request.body.new_price}' where id = ${request.body.id}`,
//     (error, result) => {
//       if (error) {
//         console.log(error);
//         response.status(500).send("Some error occurred at the Backend.");
//       } else {
//         response.status(200).send("Updated successfully!");
//       }git
//     }
//   );
// });




router.delete("/transactions/delete/by-id", (request, response) => {
  database.connection.query(
    `delete from transactions where transaction_id = ${request.query.transaction_id}`,
    (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send("Some error occurred at the Backend.");
      } else {
        response.status(200).send("Deleted successfully!");
      }
    }
  );
});

module.exports = {
  // get_all_products,
  // get_product_by_id,
  // create_new_product,
  // delete_product_by_id,
  // update_price_by_id,
  router,
};
