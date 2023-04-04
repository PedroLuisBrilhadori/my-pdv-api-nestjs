USE pdv
GO

-- users

INSERT INTO DD_USERS (name, email, password) 
VALUES ('Pedro Luís Brilhadori', 'pedroluisbrilhadori@gmail.com', '$2b$10$.ckTU3e0PnFpKHNY3x2Ip.OKsCpzpj3WkWU3oa8WTmNcevavBrnEG')
GO 


-- products

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Banana Prata', 3.9, 0)
GO 

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Banana Nanica', 5.9, 0)
GO 

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Banana Maçã', 7.9, 0)
GO 

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Maçã', 8.9, 0)
GO 

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Chuchu', 3.9, 0)
GO 

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Cebola', 4.9, 0)
GO

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Mel pequeno', 10, 1)
GO 

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Mel médio', 20, 1)
GO 

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Mel grande', 30, 1)
GO 

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Pipoca', 10, 1)
GO 

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Laranja', 2.99, 0)
GO 

INSERT INTO PDV_PRODUCTS (name, price, unit)
VALUES ('Pera', 12.99, 0)
GO 
