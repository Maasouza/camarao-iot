-- MySQL Script generated by MySQL Workbench
-- Sun Jun 17 21:51:41 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Role` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `dashboardRefresh` INT NOT NULL DEFAULT 300,
  `username` VARCHAR(45) NOT NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_User_Role_idx` (`Role_id` ASC),
  CONSTRAINT `fk_User_Role`
    FOREIGN KEY (`Role_id`)
    REFERENCES `mydb`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`FeedingSchedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`FeedingSchedule` (
  `id` INT NOT NULL,
  `mix` VARCHAR(100) NOT NULL,
  `frequency` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Yield`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Yield` (
  `id` INT NOT NULL,
  `requestedAmount` FLOAT NOT NULL,
  `estimatedAmount` FLOAT NOT NULL DEFAULT 0,
  `startDate` DATE NULL,
  `endDate` DATE NULL,
  `shrimpClass` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Buoy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Buoy` (
  `id` INT NOT NULL,
  `macAddress` VARCHAR(12) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `macAddress_UNIQUE` (`macAddress` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`WaterTank`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`WaterTank` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `waterLevel` FLOAT NULL,
  `temperature` FLOAT NULL,
  `salinity` FLOAT NULL,
  `turbidity` FLOAT NULL,
  `qtyShrimps` FLOAT NULL,
  `feedingSchedule_id` INT NULL,
  `Yield_id` INT NULL,
  `Buoy_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_WaterTank_feedingSchedule1_idx` (`feedingSchedule_id` ASC),
  INDEX `fk_WaterTank_Yield1_idx` (`Yield_id` ASC),
  INDEX `fk_WaterTank_Buoy1_idx` (`Buoy_id` ASC),
  CONSTRAINT `fk_WaterTank_feedingSchedule1`
    FOREIGN KEY (`feedingSchedule_id`)
    REFERENCES `mydb`.`FeedingSchedule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_WaterTank_Yield1`
    FOREIGN KEY (`Yield_id`)
    REFERENCES `mydb`.`Yield` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_WaterTank_Buoy1`
    FOREIGN KEY (`Buoy_id`)
    REFERENCES `mydb`.`Buoy` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `mydb` ;

-- -----------------------------------------------------
-- Placeholder table for view `mydb`.`ActivedTank`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ActivedTank` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `mydb`.`DeactivatedTank`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`DeactivatedTank` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `mydb`.`DeactivatedYield`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`DeactivatedYield` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `mydb`.`ActivedYield`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ActivedYield` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `mydb`.`FreeBuoys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`FreeBuoys` (`id` INT);

-- -----------------------------------------------------
-- View `mydb`.`ActivedTank`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ActivedTank`;
USE `mydb`;
CREATE  OR REPLACE VIEW `ActivedTank` AS (	select id from WaterTank where Yield_id is not null order by id);

-- -----------------------------------------------------
-- View `mydb`.`DeactivatedTank`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`DeactivatedTank`;
USE `mydb`;
CREATE  OR REPLACE VIEW `DeactivatedTank` AS (	select id from WaterTank where Yield_id is null order by id);

-- -----------------------------------------------------
-- View `mydb`.`DeactivatedYield`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`DeactivatedYield`;
USE `mydb`;
CREATE  OR REPLACE VIEW `DeactivatedYield` AS ( select id from Yield where startDate is null or endDate is not null);

-- -----------------------------------------------------
-- View `mydb`.`ActivedYield`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ActivedYield`;
USE `mydb`;
CREATE  OR REPLACE VIEW `ActivedYield` AS ( select id from Yield where startDate is not null and endDate is null);

-- -----------------------------------------------------
-- View `mydb`.`FreeBuoys`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`FreeBuoys`;
USE `mydb`;
CREATE  OR REPLACE VIEW `FreeBuoys` AS ( 
	select id from Buoy where id not in ( 
		select Buoy_id from WaterTank 
        )
	);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
