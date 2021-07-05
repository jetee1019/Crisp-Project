create table transactions (
	transaction_id INT AUTO_INCREMENT,
    amount DECIMAL(10,2),
    transaction_date DATE,
    description_id VARCHAR(50),
    bank_account_id VARCHAR(50)
);
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-3.70, '2021-04-14', 'GIFTS', '03093658CQ');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-2.10, '2021-05-19', 'MRT', '86826321VV');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-9.00, '2021-04-05', 'ELECTRONICS', '86826321VV');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-5.45, '2021-03-27', 'NTUC', '31324841WN');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-2.20, '2021-06-19', 'MRT', '03093658CQ');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-0.75, '2021-06-03', 'BUS', '03093658CQ');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-19.30, '2021-05-11', 'REDMART', '86826321VV');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-4.45, '2021-04-08', 'NTUC', '86826321VV');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-6.50, '2021-03-31', 'GV', '86826321VV');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-6.55, '2021-06-28', 'GIFTS', '03093658CQ');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-13.75, '2021-03-16', 'GRAB', '86826321VV');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-4.50, '2021-05-15', 'ELECTRONICS', '31324841WN');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-6.55, '2021-05-11', 'FOOD', '31324841WN');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-9.20, '2021-06-27', 'GIFTS', '31324841WN');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (-8.65, '2021-04-21', 'NTUC', '03093658CQ');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (88, '2021-04-21', 'INCOME', '03093658CQ');
insert into transactions (amount, transaction_date, description_id, bank_account_id) values (50, '2021-06-01', 'INCOME', '31324841WN');

alter table transactions AUTO_INCREMENT=1;

DELETE FROM transactions;