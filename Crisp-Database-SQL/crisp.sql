/* CREATE NEW DATABASE */
create database b11_group3;

/* DISPLAY DATABASE */
select * from users;
select * from bank_accounts;
select * from transactions;
select * from category;

describe users;
describe bank_accounts;
describe transactions;
describe category;

/* CREATE a Transaction */
INSERT INTO
    transactions (amount, transaction_date, description_id, bank_account_id)
values
    (250, '2021-07-05', 'Income', 'Cash');


/* READ a list of Transactions by Category */
select t.*, c.category, b.user_id
from transactions as t
right join category as c
on t.description_id = c.description_id
left join bank_accounts as b
on t.bank_account_id = b.bank_account_id
where category = 'Transport' and user_id = 'K1733982Q';


/* UPDATE a Transaction */
UPDATE transactions
set amount = "150"
where transaction_id = 16 and bank_account_id = 'K1733982QCASH';


/* DELETE a Transaction */
DELETE FROM transactions
where transaction_id = 16;
