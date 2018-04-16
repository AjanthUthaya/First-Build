CREATE DATABASE  IF NOT EXISTS `first-build` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `first-build`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: first-build
-- ------------------------------------------------------
-- Server version	5.5.42

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
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vgs` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `separator` varchar(45) NOT NULL,
  `year_id` int(11) NOT NULL,
  `creation_id` int(11) DEFAULT NULL,
  `creation_ip` varchar(45) DEFAULT NULL,
  `creation_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Program_idx` (`program_id`),
  KEY `YearId_idx` (`year_id`),
  CONSTRAINT `ProgramId` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `YearId` FOREIGN KEY (`year_id`) REFERENCES `years` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (0,0,0,'',0,NULL,NULL,NULL),(4,1,10,'A',1,1,'::1','12-04-2018 16:26'),(5,1,4,'B',2,1,'::1','12-04-2018 16:29'),(6,1,4,'B',1,1,'::1','12-04-2018 16:48'),(7,1,12,'B',1,1,'::1','12-04-2018 17:38'),(8,3,11,'A',1,1,'::1','12-04-2018 17:39'),(9,1,4,'A',1,1,'::1','12-04-2018 17:45');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_order`
--

DROP TABLE IF EXISTS `lesson_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lesson_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` varchar(45) DEFAULT NULL,
  `lesson_id` varchar(45) DEFAULT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_order`
--

LOCK TABLES `lesson_order` WRITE;
/*!40000 ALTER TABLE `lesson_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `lesson_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL DEFAULT 'Lesson',
  `start_date` varchar(50) NOT NULL,
  `end_date` varchar(50) NOT NULL,
  `teacher_id` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `sub` varchar(50) NOT NULL,
  `room` varchar(100) NOT NULL,
  `color` varchar(30) NOT NULL,
  `vgs` varchar(10) NOT NULL,
  `ava` int(11) NOT NULL DEFAULT '0',
  `ava_max` int(11) NOT NULL DEFAULT '30',
  `details` mediumtext NOT NULL,
  `creation_by` varchar(255) NOT NULL,
  `creation_date` varchar(30) NOT NULL,
  `creation_time` varchar(20) NOT NULL,
  `creation_ip` varchar(255) NOT NULL,
  `edit_by` varchar(255) NOT NULL,
  `edit_date` varchar(30) NOT NULL,
  `edit_time` varchar(20) NOT NULL,
  `edit_ip` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (63,'Lesson','21-03-2018 08:05','21-03-2018 09:45','1','Old lesson date test','Select sub','U100','#36414d','All',0,30,'','Admin','03-04-2018','08:06:43','::1','Admin','03-04-2018','08:06:43','::1'),(74,'Lesson','02-04-2018 08:00','02-04-2018 09:45','1','Testing old date (2)','Select sub','200','#36414d','All',0,30,'','Admin','03-04-2018','17:54:57','::1','Admin','03-04-2018','17:54:57','::1'),(75,'Lesson','03-04-2018 08:00','03-04-2018 09:45','1','Testing long names for events','Select sub','U100A','#36414d','All',0,30,'','Admin','03-04-2018','17:55:31','::1','Admin','03-04-2018','17:55:31','::1'),(76,'Lesson','05-04-2018 08:00','05-04-2018 10:45','1','Naturfag','Select sub','T100','#36414d','All',0,30,'','Admin','05-04-2018','07:01:53','::1','Admin','05-04-2018','07:03:01','::1');
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `first-build`.`lessons_CHANGE_ID` BEFORE INSERT ON `lessons` FOR EACH ROW
BEGIN
	
	SET @AutoIncrement = (SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='lessons');

	SET NEW.id = @AutoIncrement;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `majors`
--

DROP TABLE IF EXISTS `majors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `majors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `major` varchar(50) NOT NULL DEFAULT 'Major',
  `code` varchar(25) NOT NULL,
  `vgs` varchar(5) NOT NULL DEFAULT 'All',
  `color` varchar(30) NOT NULL DEFAULT '#35414d',
  `hours` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `majors`
--

LOCK TABLES `majors` WRITE;
/*!40000 ALTER TABLE `majors` DISABLE KEYS */;
INSERT INTO `majors` VALUES (1,'Naturfag','Nat','All','#35414d',NULL),(2,'Engelsk','Eng','All','#35414d',NULL),(3,'Geografi','Geo','All','#35414d',NULL),(4,'Kroppsoving','Kro','All','rgba(255,0,0,0.3)',NULL),(5,'Norsk','Nor','All','#35414d',NULL),(6,'Samfunnsfag','Saf','All','#35414d',NULL),(7,'Historie','His','All','#35414d',NULL),(8,'Matematikk','Mat','All','#278531',148),(9,'Yrkesfaglig Fordypning','YF','All','#c93138',198),(10,'Test','tet','2','#35414d',231);
/*!40000 ALTER TABLE `majors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `programs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `program` varchar(255) NOT NULL,
  `code` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES (0,'',''),(1,'Studiespesialisering','ST'),(2,'Studiespesialisering med formgivning','ST-F'),(3,'Idrettsfag','ID'),(4,'Medier og kommunikasjon','MK'),(5,'Musikk, dans, drama','MD'),(6,'Service og samferdsel','SS'),(7,'Naturbruk','NA'),(8,'Design og handverk','DH'),(9,'Teknikk og industriell produksjon','TP'),(10,'Bygg og anleggsteknikk','BA'),(11,'Elektronikk','EL'),(12,'Helse og sosial','HS'),(13,'Restaurant og matfag','RM'),(14,'Tekniske og allmenne fag','TAF');
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(45) NOT NULL,
  `label` varchar(45) DEFAULT NULL,
  `open` varchar(15) NOT NULL DEFAULT 'false',
  `parent_key` varchar(45) DEFAULT NULL,
  `type` varchar(45) NOT NULL DEFAULT 'Item',
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_UNIQUE` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (12,'U-Floor','U Floor','false',NULL,'Folder',0),(13,'1-Floor','1 Floor','false',NULL,'Folder',0),(14,'2-Floor','2 Floor','false',NULL,'Folder',0),(15,'3-Floor','3 Floor','false',NULL,'Folder',0),(16,'Other','Other','false',NULL,'Folder',0),(17,'U-Group','Group rooms','false','U-Floor','Folder',1),(18,'1-Group','Group rooms','false','1-Floor','Folder',1),(19,'2-Group','Group rooms','false','2-Floor','Folder',1),(20,'3-Group','Group rooms','false','3-Floor','Folder',1),(34,'100','100','false','1-Floor','Item',1),(35,'200','200','false','2-Floor','Item',1),(36,'300','300','false','3-Floor','Item',1),(37,'U100A','U100A','false','U-Group','Item',2),(38,'100A','100A','false','1-Group','Item',2),(39,'200A','200A','false','2-Group','Item',2),(40,'300A','300A','false','3-Group','Item',2),(41,'Gym','Gym','false','Other','Item',1),(43,'U100B','U100B','false','U-Group','Item',2),(76,'U200','U200','false','U-Floor','Item',1),(77,'U100','U100','false','U-Floor','Item',1),(83,'110','110','false','1-Floor','Item',1),(89,'110A','110A','false','1-Group','Item',2);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `first-build`.`Set_Label&Level` BEFORE INSERT ON `rooms` FOR EACH ROW
BEGIN
         
	IF (NEW.label IS NULL) THEN
		SET NEW.label = NEW.`key`;
	END IF;
    
    IF (NEW.`level` IS NULL) THEN
		SET @ParentLevel = (SELECT `level` FROM rooms WHERE `key` = NEW.parent_key);
		SET NEW.`level` = @ParentLevel + 1;
	END IF;
         
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_online`
--

DROP TABLE IF EXISTS `user_online`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_online` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_ip` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `page` varchar(255) NOT NULL,
  `date` varchar(20) NOT NULL,
  `time` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_online`
--

LOCK TABLES `user_online` WRITE;
/*!40000 ALTER TABLE `user_online` DISABLE KEYS */;
INSERT INTO `user_online` VALUES (1,11,'Admin','Admin','::1','Login successful','http://localhost:8888/php/Single/Login_User.php','16-04-2018','16:44:56'),(2,11,'Admin','Admin','::1','AutoLogin successful','http://localhost:8888/php/Single/Login_Auto.php?_=1523889910132','16-04-2018','16:45:10'),(3,11,'Admin','Admin','::1','AutoLogin successful','http://localhost:8888/php/Single/Login_Auto.php?_=1523889925350','16-04-2018','16:45:25'),(4,11,'Admin','Admin','::1','Logged out','http://localhost:8888/php/Partials/Logout.php','16-04-2018','16:47:03'),(5,11,'Admin','Admin','::1','Login successful','http://localhost:8888/php/Single/Login_User.php','16-04-2018','17:03:54'),(6,11,'Admin','Admin','::1','Logged out','http://localhost:8888/php/Partials/Logout.php','16-04-2018','17:04:00'),(7,11,'Admin','Admin','::1','Login successful','http://localhost:8888/php/Single/Login_User.php','16-04-2018','17:06:24'),(8,11,'Admin','Admin','::1','Logged out','http://localhost:8888/php/Partials/Logout.php','16-04-2018','17:06:27'),(9,11,'Admin','Admin','::1','Login successful','http://localhost:8888/php/Single/Login_User.php','16-04-2018','17:07:30'),(10,11,'Admin','Admin','::1','Logged out','http://localhost:8888/php/Partials/Logout.php','16-04-2018','17:07:32'),(11,11,'Admin','Admin','::1','Login successful','http://localhost:8888/php/Single/Login_User.php','16-04-2018','17:08:47'),(12,11,'Admin','Admin','::1','Logged out','http://localhost:8888/php/Partials/Logout.php','16-04-2018','17:08:50'),(13,11,'Admin','Admin','::1','Login successful','http://localhost:8888/php/Single/Login_User.php','16-04-2018','17:11:18'),(14,11,'Admin','Admin','::1','Logged out','http://localhost:8888/php/Partials/Logout.php','16-04-2018','17:11:20'),(15,0,'Unknown','Admin','::1','Login failed - Wrong password','http://localhost:8888/php/Single/Login_User.php','16-04-2018','17:12:20');
/*!40000 ALTER TABLE `user_online` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` varchar(20) NOT NULL DEFAULT 'true',
  `user_type` varchar(20) NOT NULL DEFAULT 'Student',
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(40) NOT NULL,
  `middlename` varchar(40) DEFAULT NULL,
  `lastname` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `birth_date` varchar(20) NOT NULL,
  `img_src` varchar(255) NOT NULL DEFAULT 'img/Profile_Placeholder.png',
  `img_increment` int(10) DEFAULT '1',
  `creation_date` varchar(30) NOT NULL,
  `creation_time` varchar(20) NOT NULL,
  `creation_ip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'true','Admin','Admin','$2y$10$GX.ffh.1anJe8lMCMl1Woe2/z8xS9mhUi0QkU2IHovfjFOflcMGd6','Admin','NULL','Main','Admin@Email.com','00000000','09-09-2016','img/Profile/Admin_1.png',1,'14-04-2018','19:05:25','::1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `years`
--

DROP TABLE IF EXISTS `years`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `years` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `start_date` varchar(45) NOT NULL,
  `end_date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `years`
--

LOCK TABLES `years` WRITE;
/*!40000 ALTER TABLE `years` DISABLE KEYS */;
INSERT INTO `years` VALUES (0,'','',''),(1,'2017/2018','21-08-2017','21-06-2018'),(2,'2018/2019','21-08-2018','21-06-2019'),(3,'2016/2017','21-08-2016','21-06-2017');
/*!40000 ALTER TABLE `years` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'first-build'
--

--
-- Dumping routines for database 'first-build'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-16 17:27:24
