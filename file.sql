CREATE DATABASE  IF NOT EXISTS `prueba` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `prueba`;
-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost                      Database: prueba
-- ------------------------------------------------------
-- Server version	5.5.56-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `credit_histories`
--

DROP TABLE IF EXISTS `credit_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_histories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cedula_rnc` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL,
  `debt_amount` decimal(10,2) NOT NULL,
  `entity` varchar(140) COLLATE utf8mb4_unicode_ci NOT NULL,
  `concept` varchar(180) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_histories`
--

LOCK TABLES `credit_histories` WRITE;
/*!40000 ALTER TABLE `credit_histories` DISABLE KEYS */;
INSERT INTO `credit_histories` VALUES (1,'025-0041681-9','2018-07-10 03:26:37',0.00,'',NULL),(2,'025-0041681-9','2018-07-10 03:29:17',0.00,'',NULL),(3,'001-0078278-8','2018-07-10 03:29:17',2500.53,'','Plan móvil'),(4,'023-0115729-9','2018-07-10 03:29:17',22350.00,'','Préstamo personal'),(5,'402-2418755-5','2018-07-10 03:29:17',0.00,'',NULL),(6,'001-1777392-9','2018-07-10 03:29:17',50.00,'','Helados');
/*!40000 ALTER TABLE `credit_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchanges_rates`
--

DROP TABLE IF EXISTS `exchanges_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exchanges_rates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exchange_value` decimal(10,4) NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchanges_rates`
--

LOCK TABLES `exchanges_rates` WRITE;
/*!40000 ALTER TABLE `exchanges_rates` DISABLE KEYS */;
INSERT INTO `exchanges_rates` VALUES (1,'DOP','Peso Dominicano',1.2560,'2018-07-05 02:46:00'),(2,'DOP','Peso Dominicano',1.0000,'2018-07-05 02:46:11'),(3,'USD','United States Dollar',50.1200,'2018-07-05 02:46:36');
/*!40000 ALTER TABLE `exchanges_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_health`
--

DROP TABLE IF EXISTS `financial_health`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `financial_health` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cedula_rnc` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_healthy` tinyint(4) NOT NULL,
  `updated_at` datetime NOT NULL,
  `debt_amount` decimal(10,2) NOT NULL,
  `entity` varchar(140) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(180) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_health`
--

LOCK TABLES `financial_health` WRITE;
/*!40000 ALTER TABLE `financial_health` DISABLE KEYS */;
INSERT INTO `financial_health` VALUES (1,'025-0041681-9',1,'2018-07-10 23:38:40',0.00,'DGII',NULL),(2,'001-0078278-8',1,'2018-07-10 23:38:40',2500.53,'Jumbo','Plan móvil'),(3,'023-0115729-9',0,'2018-07-10 23:38:40',22350.00,'La Sirena','Préstamo personal'),(4,'402-2418755-5',1,'2018-07-10 23:38:40',0.00,'A&B Electromuebles',NULL),(5,'001-1777392-9',0,'2018-07-10 23:38:40',50.00,'Dirección Generak','Helados');
/*!40000 ALTER TABLE `financial_health` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inflations_rates`
--

DROP TABLE IF EXISTS `inflations_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inflations_rates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `value` decimal(10,4) NOT NULL,
  `month` int(10) unsigned NOT NULL,
  `year` int(10) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inflations_rates`
--

LOCK TABLES `inflations_rates` WRITE;
/*!40000 ALTER TABLE `inflations_rates` DISABLE KEYS */;
INSERT INTO `inflations_rates` VALUES (1,5.7000,7,2018,'2018-07-10 03:01:15'),(2,8.7800,6,2018,'2018-07-10 03:01:25');
/*!40000 ALTER TABLE `inflations_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usage_data`
--

DROP TABLE IF EXISTS `usage_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usage_data` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(10) unsigned NOT NULL,
  `ip` char(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requested_service` varchar(140) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usage_data_users_id` (`user`),
  CONSTRAINT `fk_usage_data_users_id` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usage_data`
--

LOCK TABLES `usage_data` WRITE;
/*!40000 ALTER TABLE `usage_data` DISABLE KEYS */;
INSERT INTO `usage_data` VALUES (1,1,'127.0.0.1','','2018-07-05 03:08:02'),(2,1,'127.0.0.1','','2018-07-05 23:18:12'),(3,1,'8.8.8.8','','2018-07-05 23:18:23'),(4,1,'8.8.8.8','','2018-07-05 23:18:43'),(5,1,'127.0.0.1','','2018-07-05 23:22:23'),(11,1,'127.0.0.1','','2018-07-10 00:49:06'),(14,1,'127.0.0.1','','2018-07-10 00:59:05'),(15,1,'127.0.0.1','','2018-07-10 01:01:47'),(23,1,'127.0.0.1','','2018-07-10 01:11:08'),(24,1,'127.0.0.1','','2018-07-10 01:11:10'),(29,1,'127.0.0.1','','2018-07-10 02:12:53'),(30,1,'127.0.0.1','','2018-07-10 02:13:30'),(31,1,'127.0.0.1','','2018-07-10 02:13:51'),(32,1,'127.0.0.1','','2018-07-10 02:14:16'),(33,1,'127.0.0.1','','2018-07-10 02:14:20'),(34,1,'127.0.0.1','','2018-07-10 02:14:28'),(35,1,'127.0.0.1','','2018-07-10 02:14:47'),(36,1,'127.0.0.1','','2018-07-10 02:17:02'),(37,1,'127.0.0.1','','2018-07-10 02:18:04'),(38,1,'127.0.0.1','','2018-07-10 02:21:40'),(39,1,'127.0.0.1','','2018-07-10 02:22:14'),(40,1,'127.0.0.1','','2018-07-10 02:22:32'),(41,1,'127.0.0.1','','2018-07-10 02:23:19'),(42,1,'127.0.0.1','','2018-07-10 02:23:20'),(43,1,'127.0.0.1','','2018-07-10 02:23:27'),(44,1,'127.0.0.1','','2018-07-10 02:24:08'),(45,1,'127.0.0.1','','2018-07-10 02:24:57'),(46,1,'127.0.0.1','','2018-07-10 02:24:57'),(47,1,'127.0.0.1','','2018-07-10 02:25:00'),(48,1,'127.0.0.1','','2018-07-10 02:25:27'),(49,1,'127.0.0.1','','2018-07-10 02:30:13'),(50,1,'127.0.0.1','','2018-07-10 02:30:20'),(51,1,'127.0.0.1','','2018-07-10 02:34:48'),(52,1,'127.0.0.1','','2018-07-10 02:34:54'),(53,1,'127.0.0.1','','2018-07-10 02:35:02'),(54,1,'127.0.0.1','','2018-07-10 02:35:46'),(55,1,'127.0.0.1','','2018-07-10 02:35:53'),(56,1,'127.0.0.1','','2018-07-10 02:36:06'),(57,1,'127.0.0.1','','2018-07-10 03:08:52'),(59,1,'127.0.0.1','','2018-07-10 03:09:37'),(62,1,'127.0.0.1','inflation-rate','2018-07-10 03:19:51'),(63,1,'127.0.0.1','inflation-rate','2018-07-10 03:19:59'),(67,1,'127.0.0.1','credit-history','2018-07-10 22:44:07'),(68,1,'127.0.0.1','usage-data','2018-07-10 22:45:01'),(69,1,'127.0.0.1','usage-data','2018-07-10 22:45:18'),(70,1,'127.0.0.1','usage-data','2018-07-10 22:45:26'),(71,1,'127.0.0.1','usage-data','2018-07-10 22:46:01'),(72,1,'127.0.0.1','usage-data','2018-07-10 22:47:10'),(73,1,'127.0.0.1','usage-data','2018-07-10 22:47:12'),(74,1,'127.0.0.1','usage-data','2018-07-10 22:47:14'),(75,1,'127.0.0.1','usage-data','2018-07-10 22:47:16'),(76,1,'127.0.0.1','usage-data','2018-07-10 22:48:41'),(77,1,'127.0.0.1','credit-history','2018-07-10 22:49:27'),(78,1,'127.0.0.1','credit-history','2018-07-10 22:50:51'),(80,1,'127.0.0.1','credit-history','2018-07-10 23:01:08'),(81,1,'127.0.0.1','credit-history','2018-07-10 23:01:51'),(82,1,'127.0.0.1','usage-data','2018-07-10 23:02:00'),(83,1,'127.0.0.1','usage-data','2018-07-10 23:10:14'),(84,1,'127.0.0.1','financial-health','2018-07-10 23:30:30'),(85,1,'127.0.0.1','financial-health','2018-07-10 23:31:33'),(89,1,'127.0.0.1','financial-health','2018-07-10 23:38:32'),(90,1,'127.0.0.1','financial-health','2018-07-10 23:38:42'),(92,1,'127.0.0.1','financial-health','2018-07-11 06:56:40'),(102,1,'127.0.0.1','usage-data','2018-07-11 06:56:55'),(112,1,'127.0.0.1','usage-data','2018-07-11 07:05:15'),(122,1,'127.0.0.1','usage-data','2018-07-11 07:05:35'),(132,1,'127.0.0.1','usage-data','2018-07-11 07:05:45'),(142,1,'127.0.0.1','usage-data','2018-07-11 07:05:55'),(152,1,'127.0.0.1','usage-data','2018-07-11 07:06:01'),(162,1,'127.0.0.1','usage-data','2018-07-11 07:06:43');
/*!40000 ALTER TABLE `usage_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fullname` varchar(140) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nómina','nomina','123456','2018-07-05 02:57:58','2018-07-05 02:57:58'),(2,'Contabilidad','contabilidad','123456','2018-07-11 07:00:14','2018-07-11 07:00:14'),(12,'Inventario','inventario','123456','2018-07-11 07:00:32','2018-07-11 07:00:32'),(22,'Facturación','facturacion','123456','2018-07-11 07:00:44','2018-07-11 07:00:44'),(32,'Activos Fijos','activos_fijos','123456','2018-07-11 07:01:06','2018-07-11 07:01:06'),(42,'Cuentas por Pagar','cuentas_pagar','123456','2018-07-11 07:01:26','2018-07-11 07:01:26'),(52,'Compras','compras','123456','2018-07-11 07:01:41','2018-07-11 07:01:41'),(62,'Sistema de Cheques','sistema_cheques','123456','2018-07-11 07:02:05','2018-07-11 07:02:05');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-11  3:33:46
