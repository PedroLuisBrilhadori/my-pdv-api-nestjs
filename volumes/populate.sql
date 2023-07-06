\c pdv
\dt

-- users

INSERT INTO "DD_USERS" ("name", "role", "email", "password") 
VALUES ('Pedro Luís Brilhadori', 'admin' , 'pedroluisbrilhadori@gmail.com', '$2b$10$.ckTU3e0PnFpKHNY3x2Ip.OKsCpzpj3WkWU3oa8WTmNcevavBrnEG');

INSERT INTO "DD_USERS" ("name", "role", "email", "password") 
VALUES ('Usuário Teste', 'user' , 'user@gmail.com', '$2b$10$.ckTU3e0PnFpKHNY3x2Ip.OKsCpzpj3WkWU3oa8WTmNcevavBrnEG');
 

-- products

INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Banana Prata', 3.9, false, true, 5);


INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Alface', 3.9, true, true, 20);


INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Banana Nanica', 5.9, false, true, 5);
 

INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Banana Maçã', 7.9, false, true, 5);
 

INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Maçã', 8.9, false, true, 4);

INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Chuchu', 3.9, false, true, 5);

INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Cebola', 4.9, false, true, 5);

INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Mel pequeno', 10, true, true, 5);
 
INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Mel médio', 20, true, false, 0);
 
INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Mel grande', 30, true, false, 0);

INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Pipoca', 10, true, true, 5);
 
INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Laranja', 2.99, false, true, 8);
 
INSERT INTO "PDV_PRODUCTS" ("name", "price", "unit", "active", "inventory")
VALUES ('Pera', 12.99, false, true, 2);