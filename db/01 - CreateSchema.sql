-- MySQL Script generated by MySQL Workbench
-- Fri Aug 21 15:37:54 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ipdv_app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ipdv_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ipdv_app` DEFAULT CHARACTER SET utf8 ;
USE `ipdv_app` ;

-- -----------------------------------------------------
-- Table `ipdv_app`.`cargos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ipdv_app`.`cargos` (
  `id` CHAR(36) NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ipdv_app`.`centro_de_custos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ipdv_app`.`centro_de_custos` (
  `id` CHAR(36) NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ipdv_app`.`departamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ipdv_app`.`departamentos` (
  `id` CHAR(36) NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `centro_de_custo_id` CHAR(36) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_centro_de_custo_idx` (`centro_de_custo_id` ASC) VISIBLE,
  CONSTRAINT `fk_centro_de_custo`
    FOREIGN KEY (`centro_de_custo_id`)
    REFERENCES `ipdv_app`.`centro_de_custos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ipdv_app`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ipdv_app`.`usuarios` (
  `id` CHAR(36) NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `senha` CHAR(255) NOT NULL,
  `id_cargo` CHAR(36) NOT NULL,
  `id_departamento` CHAR(36) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `email` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cargo_idx` (`id_cargo` ASC) VISIBLE,
  INDEX `fk_departamento_idx` (`id_departamento` ASC) VISIBLE,
  CONSTRAINT `fk_cargo`
    FOREIGN KEY (`id_cargo`)
    REFERENCES `ipdv_app`.`cargos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_departamento`
    FOREIGN KEY (`id_departamento`)
    REFERENCES `ipdv_app`.`departamentos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
