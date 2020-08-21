CREATE DATABASE  IF NOT EXISTS `ipdv_app` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ipdv_app`;
-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: ipdv_app
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
INSERT INTO `cargos` VALUES ('76975805-0813-4d68-ad93-815613ebfa51','Analista','2020-08-20 03:10:21','2020-08-20 03:10:21'),('fd29559f-6064-4e91-a36d-0e58dc0ee0fb','CEO','2020-08-20 03:18:49','2020-08-20 03:23:05');
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `centro_de_custos`
--

LOCK TABLES `centro_de_custos` WRITE;
/*!40000 ALTER TABLE `centro_de_custos` DISABLE KEYS */;
INSERT INTO `centro_de_custos` VALUES ('8a359a62-ca16-4640-ad75-40a85da6d9ce','Controladoria','2020-08-20 02:45:37','2020-08-20 03:00:11'),('abc1234','Basico',NULL,NULL);
/*!40000 ALTER TABLE `centro_de_custos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES ('2f27fbb0-1f0f-4220-9369-42b6373a520b','Compras','8a359a62-ca16-4640-ad75-40a85da6d9ce','2020-08-20 20:40:05','2020-08-20 20:40:05'),('fc4b68f7-c9f8-456c-83c7-81bc5a19917c','Vendas','8a359a62-ca16-4640-ad75-40a85da6d9ce','2020-08-20 19:43:43','2020-08-20 20:31:06');
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('d61ca8ea-7d17-48bb-96f9-36bdc3e657d1','André Masson','$2a$10$7xm.Clz85iiTy8naR1Iv6ezHPyh9zex5KWSr.1UwxReol9sBoxBZq','fd29559f-6064-4e91-a36d-0e58dc0ee0fb','2f27fbb0-1f0f-4220-9369-42b6373a520b','2020-08-20 22:06:31','2020-08-21 02:31:00','luke@skywalker.com');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-21 15:46:07