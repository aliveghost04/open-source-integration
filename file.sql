create database prueba;
use prueba;

create table exchanges_rates (
	id int unsigned primary key not null auto_increment,
    `code` char(3) not null,
    `name` varchar(140) not null,
    exchange_value decimal(10,4) not null,
    updated_at datetime not null
);

insert into exchanges_rates values(null, 'USD', 'United States Dollar', 50.12, now());
insert into exchanges_rates values(null, 'DOP', 'Dominican Peso', 1, now());

create table users (
	id int unsigned primary key not null auto_increment,
    fullname varchar(140) not null,
    user varchar(100) not null unique,
    `password` varchar(200) not null,
    created_at datetime not null,
    updated_at datetime not null,
    enabled tinyint not null
);

insert into users values (null, 'Nómina', 'nomina', '123456', now(), now());

create table usage_data (
	id int unsigned primary key not null auto_increment,
    user int unsigned not null,
    ip char(16) not null,
    access_date datetime not null,
    constraint fk_usage_data_users_id foreign key (user) references users(id)
);

insert into usage_data values (null, 1, '127.0.0.1', now())