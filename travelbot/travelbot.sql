-- COMP9900 20T1
-- Schema for the Travel site
--
---- Written by:
--    Name:  << Haojun SUN >>
--    Student ID:  << Z5174534 >>
--    Date:  09/03/2020

drop database if exists `travelbot`;
create database `travelbot` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

use travelbot;
-- Tables

create table Users (
    user_id             int UNSIGNED AUTO_INCREMENT,
    family_name         varchar(50),
    given_name          varchar(50),
    displayed_name      varchar(50),
    email_address       varchar(100),
    password            varchar(50),
    account_balance     int(8),
    primary key (user_id)
)
COMMENT='users information';

create table Photos (
    photo_id            int UNSIGNED AUTO_INCREMENT,
    date_uploaded       timestamp,
    title               varchar(50),
    description         text default NULL,
    file_size           integer,
    onws_location_id    integer UNSIGNED,
    primary key (photo_id)
)
COMMENT='photo of the location';

create table Locations (
    location_id         INT UNSIGNED AUTO_INCREMENT,
    location_name       varchar(50),
    portrait            int UNSIGNED,
    primary key (location_id),
    foreign key (portrait)  references Photos(photo_id)
)
COMMENT='location information';

-- add foreign key from photos to locations
alter table Photos add constraint FK_constraint
    foreign key (onws_location_id) references Locations(location_id);

create table Products (
    product_id         INT UNSIGNED AUTO_INCREMENT,
    product_name       varchar(50),
    capacity           integer,
    stock              integer,
    price              integer,
    location_id        integer UNSIGNED,
    primary key (product_id),
    foreign key (location_id)  references Locations(location_id)
)
COMMENT='production information';

create table Payments (
    payment_id          INT UNSIGNED AUTO_INCREMENT,
    method_name         varchar(50),
    amount              integer,
    payment_date        timestamp,
    primary key (payment_id)
)
COMMENT='payment methods';

create table Orders (
    order_id            INT UNSIGNED AUTO_INCREMENT,
    quantity            varchar(50),
    order_date          timestamp not NULL default current_timestamp,
    use_date            date,
    product_id          integer UNSIGNED,
    payment_id          integer UNSIGNED,
    primary key (order_id),
    foreign key (product_id)  references Products(product_id),
    foreign key (payment_id)  references Payments(payment_id)
)
COMMENT='users order information';

create table Upload_Photos (
    up_photo_id         INT UNSIGNED AUTO_INCREMENT,
    relate_location_id  integer UNSIGNED,
    upload_date         timestamp,
    user_id             integer UNSIGNED,
    primary key (up_photo_id),
    foreign key (relate_location_id)  references Locations(location_id),
    foreign key (user_id)  references Users(user_id)
)
COMMENT='users upload photos recognition';

-- relation table

create table Users_Order_History (
    user_id             integer UNSIGNED,
    order_id            integer UNSIGNED,
    primary key (user_id, order_id),
    foreign key (user_id) references Users(user_id),
    foreign key (order_id) references Orders(order_id)
)
COMMENT='show users many/zero orders';

create table Users_rate_Chatting (
    user_id             integer UNSIGNED,
    date_rated          timestamp,
    rating              enum('one','two','three','four','five'),
    primary key (user_id),
    foreign key (user_id) references Users(user_id)
)
COMMENT='users rate after chatting';



-- INSERT DATA TEST

-- Users table
-- user_id, family_name, given_name, displayed_name, email_address, password, account_balance     int(8),
INSERT INTO Users (user_id, family_name, given_name, displayed_name, email_address, password, account_balance)
        VALUES (1, 'Tom', 'Green', 'Cat_Tom', 'tomcat@gmail.com', '123456', 1000);
INSERT INTO Users (user_id, family_name, given_name, displayed_name, email_address, password, account_balance)
        VALUES (2, 'Jim', 'Green', 'dog_Jim', 'dogjim@gmail.com', '123456', 900);
INSERT INTO Users (user_id, family_name, given_name, displayed_name, email_address, password, account_balance)
        VALUES (3, 'Lily', 'Green', 'Pig_Lily', 'piglily@gmail.com', '123456', 800);
INSERT INTO Users (user_id, family_name, given_name, displayed_name, email_address, password, account_balance)
        VALUES (4, 'Jeremy', 'Green', 'Cat_Jeremy', 'jeremycat@gmail.com', '123456', 1000);
INSERT INTO Users (user_id, family_name, given_name, displayed_name, email_address, password, account_balance)
        VALUES (5, 'Bruce', 'Green', 'Cat_Bruce', 'brucecat@gmail.com', '123456', 500);
INSERT INTO Users (user_id, family_name, given_name, displayed_name, email_address, password, account_balance)
        VALUES (6, 'Bob', 'Green', 'Cat_Bob', 'bobcat@gmail.com', '123456', 10000);
INSERT INTO Users (user_id, family_name, given_name, displayed_name, email_address, password, account_balance)
        VALUES (7, 'Arilra', 'Green', 'Cat_Arilra', 'arilracat@gmail.com', '123456', 1450);
INSERT INTO Users (user_id, family_name, given_name, displayed_name, email_address, password, account_balance)
        VALUES (8, 'Gina', 'Green', 'Cat_Gina', 'ginacat@gmail.com', '123456', 1330);
INSERT INTO Users (family_name, given_name, displayed_name, email_address, password, account_balance)
        VALUES ('Luna', 'Green', 'Cat_Luna', 'lunacat@gmail.com', '123456', 10500);
INSERT INTO Users (family_name, given_name, displayed_name, email_address, password, account_balance)
        VALUES ('Jimmy', 'Green', 'Cat_Jimmy', 'jimmycat@gmail.com', '123456', 670);