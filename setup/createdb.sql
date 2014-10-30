-- MySQL dump 10.13  Distrib 5.6.20, for osx10.9 (x86_64)
--
-- Host: localhost    Database: hpcloudrecruiting
-- ------------------------------------------------------
-- Server version	5.6.20

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
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate` (
  `CandidateId` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(500) DEFAULT NULL,
  `LastName` varchar(500) DEFAULT NULL,
  `Notes` varchar(5000) DEFAULT NULL,
  `EmailAddress` varchar(5000) DEFAULT NULL,
  `Position_PositionId` int(11) NOT NULL,
  `CurrentStage` int(11) DEFAULT NULL,
  `LastModified` datetime DEFAULT CURRENT_TIMESTAMP,
  `TagLine` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`CandidateId`),
  UNIQUE KEY `CandidateId_UNIQUE` (`CandidateId`),
  KEY `fk_Candidate_Position1_idx` (`Position_PositionId`),
  CONSTRAINT `fk_Candidate_Position1` FOREIGN KEY (`Position_PositionId`) REFERENCES `position` (`PositionId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (2,'0fb6d630bdaab39046220e2c3f081850','396676538b44cdd273f3c9e28afee1d7','5adb166912602d7eefdd8323d0531965','7a59e559ead4d385ed4598308e8e40712c5bb743766f485417b78d6e99c698a7',2,1,'2014-10-29 16:55:42','5adb166912602d7eefdd8323d0531965'),(3,'c1b90745c5a5dc9d717287a45ba97ee7','c1b90745c5a5dc9d717287a45ba97ee7','41fa139727776999f6193211e48ca5d3','707e47db3639a3c79e94ba7ce54d960b5cfa19d211d26d3a39bb43ab6393c0ea',3,1,'2014-10-29 16:58:10','41fa139727776999f6193211e48ca5d3');
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person` (
  `FirstName` varchar(5000) DEFAULT NULL,
  `LastName` varchar(5000) DEFAULT NULL,
  `EmailAddress` varchar(5000) DEFAULT NULL,
  `Role_RoleId` int(11) NOT NULL,
  `PersonId` int(11) NOT NULL AUTO_INCREMENT,
  `Candidate_CandidateId` int(11) NOT NULL,
  PRIMARY KEY (`PersonId`),
  UNIQUE KEY `PersonId_UNIQUE` (`PersonId`),
  KEY `fk_Person_Role_idx` (`Role_RoleId`),
  KEY `fk_Person_Candidate1_idx` (`Candidate_CandidateId`),
  CONSTRAINT `fk_Person_Candidate1` FOREIGN KEY (`Candidate_CandidateId`) REFERENCES `candidate` (`CandidateId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Person_Role` FOREIGN KEY (`Role_RoleId`) REFERENCES `role` (`RoleId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position` (
  `PositionId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(5000) DEFAULT NULL,
  `Description` varchar(5000) DEFAULT NULL,
  `DatePosted` datetime DEFAULT CURRENT_TIMESTAMP,
  `JobLink` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PositionId`),
  UNIQUE KEY `Id_UNIQUE` (`PositionId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (2,'Senior SDE','Senior SDE','2014-10-29 16:46:31','Senior SDE'),(3,'Distinguished Technologist','Distinguished Technologist','2014-10-29 16:57:38','Distinguished Technologist Link');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `RoleId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(5000) DEFAULT NULL,
  `Description` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`RoleId`),
  UNIQUE KEY `Id_UNIQUE` (`RoleId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `state` (
  `StageId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(5000) DEFAULT NULL,
  `Description` varchar(5000) DEFAULT NULL,
  `Order` int(11) NOT NULL,
  PRIMARY KEY (`StageId`),
  UNIQUE KEY `StageId_UNIQUE` (`StageId`),
  UNIQUE KEY `Order_UNIQUE` (`Order`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Lead','Candidaate entered into the system',1),(2,'Phone Screen','Candidaate entered into the system',2),(3,'Interview','Candidaate entered into the system',3),(4,'Offer','Candidaate entered into the system',4),(5,'Accepted','Candidaate entered into the system',5),(6,'Withdrawn','Candidaate entered into the system',6),(7,'Rejected','Candidaate entered into the system',7);
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hpcloudrecruiting'
--
/*!50003 DROP PROCEDURE IF EXISTS `uspChangeState` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspChangeState`(IN pCandidateId INT, IN pStateId INT)
BEGIN


 UPDATE Candidate

 SET    CurrentStage = pStateId

 WHERE  CandidateId  = pCandidateId;

SELECT CandidateId, FirstName, LastName, TagLine, Notes, JobLink, EmailAddress, LastModified,  P.Name
  FROM  Candidate C
  INNER JOIN Position P ON P.PositionID = C.Position_PositionId
  INNER JOIN State S ON C.CurrentState
  WHERE C.CandidateId = pCandidateId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspGetCandidates` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspGetCandidates`()
BEGIN

 SELECT CandidateId, FirstName, LastName, TagLine, Notes, JobLink, EmailAddress, LastModified,  P.Name,
	S.name as 'State_Name', S.Order as 'State_Order'
   FROM   Candidate C, state S, Position P
Where C.CurrentStage = S.StageId and C.Position_PositionId = P.PositionId ;
 END ;;

DELIMITER ;
/*THIS IS SAM'S FIRST SPROC- DELETE IF BUSTED*/;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspGetStates` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspGetStates`()
BEGIN

 SELECT StageId, Name
   FROM   State;
 END ;;

DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspGetPositions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspGetPositions`()
BEGIN

       SELECT `position`.`PositionId`,

    `position`.`Name`,

    `position`.`Description`,

    `position`.`DatePosted`,

    `position`.`JobLink`

FROM `hpcloudrecruiting`.`position`;



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspInsertCandidate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspInsertCandidate`(
        IN  pFirstName                    VARCHAR(2500)   ,
        IN  pLastName                     VARCHAR(2500)   ,
        IN  pEmailAddress                 VARCHAR(2500)   ,
        IN  pNotes                        VARCHAR(2000)  ,
        IN  pPositionId                   INT,
        IN  pTagLine                      VARCHAR(2500)

     )
BEGIN

    INSERT INTO Candidate
         (
           FirstName                    ,
           LastName                     ,
           EmailAddress                 ,
           Notes                        ,
           Position_PositionId          ,
           TagLine                      ,
           CurrentStage
         )
    VALUES
         (
           pFirstName                    ,
           pLastName                     ,
           pEmailAddress                 ,
           pNotes                        ,
           pPositionId                   ,
           pTagLine                      ,
           1
         ) ;

         END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspInsertPosition` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspInsertPosition`(
        IN  pName                    VARCHAR(2500)  ,
        IN  pDescription             VARCHAR(2500)  ,
        IN  pJobLink                 VARCHAR(100)

     )
BEGIN

    INSERT INTO Position
         (
           Name            ,
           Description     ,
           JobLink
         )
    VALUES
         (
           pName                    ,
           pDescription              ,
           pJobLink
         )  ;

Select * from Position where PositionId = Last_Insert_Id();

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-10-29 17:01:27
