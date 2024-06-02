CREATE DATABASE `inventory`;

CREATE TABLE IF NOT EXISTS `inventory`.`products` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(45) NOT NULL,
    `name` VARCHAR(100) NULL,
    `price` BIGINT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `code_UNIQUE` (`code` ASC) )
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `inventory`.`users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `email` VARCHAR(60) NOT NULL,
    `password` VARCHAR(100) NULL,
    `full_name` VARCHAR(100) NULL,
    `activate` TINYINT(1) NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4;
