-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: execut
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomeCliente` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `razaoSocial` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cpfCnpj` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idEndereco` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idEndereco` (`idEndereco`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`idEndereco`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'João Silva','JS Serviços','12345678901234','11987654321',2),(2,'Teste novo update','teste novo','23132089000145','62991568478',13);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `complemento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cidade` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (1,'Rua dos Usuarios','Conjunto Usuario Apt A-101','Aparecida de Goiânia','GO'),(2,'Rua dos Clientes','Conjunto Cliente Apt B-101','Aparecida de Goiânia','GO'),(3,'Rua dos Fornecedores','Conjunto Fornecedor Apt C-101','Goiânia','GO'),(4,'Rua das Obras','Conjunto Construção Apt D-101','APARECIDA DE GOIANIA','GO'),(5,'Avenida E, nº 1.470','sdfdfdfdafdsf','Aparecida de Goiânia','GO'),(6,'Rua dos Usuarios','Conjunto Usuario Apt A-101','Aparecida de Goiânia','GO'),(7,'Rua santa iris','Quadra 41 lote 10','Aparecida de Goiânia','GO'),(8,'Avenida E','Quadra 41 lote 10','Aparecida de Goiânia','GO'),(9,'Avenida E','Quadra 41 lote 10','Aparecida de Goiânia','GO'),(10,'Avenida E','Quadra 41 lote 10','Aparecida de Goiânia','GO'),(11,'Avenida E','Quadra 41 lote 10','Aparecida de Goiânia','GO'),(12,'Avenida E','Quadra 41 lote 10','Aparecida de Goiânia','GO'),(13,'Avenida E, nº 1.470','Quadra 41 lote 10','Aparecida de Goiânia','GO'),(14,'Rua santa iris','Quadra 41 lote 10','Aparecida de Goiânia','GO'),(15,'Rua santa iris','Quadra 41 lote 10','APARECIDA DE GOIÂNIA','GO'),(16,'Avenida E','Quadra 41 lote 10','APARECIDA DE GOIANIA','GO');
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fornecedor`
--

DROP TABLE IF EXISTS `fornecedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fornecedor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `razaoSocial` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idTipo` int NOT NULL,
  `idEndereco` int DEFAULT NULL,
  `cnpj` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idTipo` (`idTipo`),
  KEY `idEndereco` (`idEndereco`),
  CONSTRAINT `fornecedor_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tipo_de_fornecedor` (`id`),
  CONSTRAINT `fornecedor_ibfk_2` FOREIGN KEY (`idEndereco`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedor`
--

LOCK TABLES `fornecedor` WRITE;
/*!40000 ALTER TABLE `fornecedor` DISABLE KEYS */;
INSERT INTO `fornecedor` VALUES (1,'ConstruTudo Ltda','1133344556',1,3,NULL);
/*!40000 ALTER TABLE `fornecedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcao_prestador`
--

DROP TABLE IF EXISTS `funcao_prestador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcao_prestador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomeFuncao` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricaoFuncao` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcao_prestador`
--

LOCK TABLES `funcao_prestador` WRITE;
/*!40000 ALTER TABLE `funcao_prestador` DISABLE KEYS */;
INSERT INTO `funcao_prestador` VALUES (1,'Encanador','Profissional responsável por instalações hidráulicas'),(2,'Pedreiro','Responsavel pela Alvenaria'),(4,'Pintor','Responsavel pela Pintura'),(6,'Mestre de obras','Encarregado imediato pelo desenvolvimento da obra');
/*!40000 ALTER TABLE `funcao_prestador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_de_obra`
--

DROP TABLE IF EXISTS `material_de_obra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_de_obra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomeMaterial` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricaoMaterial` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valor` double NOT NULL,
  `idFornecedor` int NOT NULL,
  `idObra` int NOT NULL,
  `dataCompra` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idFornecedor` (`idFornecedor`),
  KEY `material_de_obra_ibfk_4_idx` (`idObra`),
  CONSTRAINT `material_de_obra_ibfk_3` FOREIGN KEY (`idFornecedor`) REFERENCES `fornecedor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_de_obra`
--

LOCK TABLES `material_de_obra` WRITE;
/*!40000 ALTER TABLE `material_de_obra` DISABLE KEYS */;
INSERT INTO `material_de_obra` VALUES (1,'Cimento','Saco de cimento 50kg',22.5,1,1,NULL);
/*!40000 ALTER TABLE `material_de_obra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obra`
--

DROP TABLE IF EXISTS `obra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `valorFinal` double DEFAULT NULL,
  `responsavelObra` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dataInicio` date NOT NULL,
  `dataFim` date DEFAULT NULL,
  `idCliente` int NOT NULL,
  `idPagamento` int NOT NULL,
  `idEndereco` int NOT NULL,
  `nomeObra` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idTipoObra` int NOT NULL,
  `valorOrcamento` double NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `previsaoEntrega` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idCliente` (`idCliente`),
  KEY `idPagamento` (`idPagamento`),
  KEY `idEndereco` (`idEndereco`),
  CONSTRAINT `obra_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`id`),
  CONSTRAINT `obra_ibfk_2` FOREIGN KEY (`idPagamento`) REFERENCES `pagamento` (`id`),
  CONSTRAINT `obra_ibfk_4` FOREIGN KEY (`idEndereco`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obra`
--

LOCK TABLES `obra` WRITE;
/*!40000 ALTER TABLE `obra` DISABLE KEYS */;
INSERT INTO `obra` VALUES (1,50000,'João Silva','2024-10-10',NULL,1,1,4,'Obra 01',1,6500,NULL,'2024-11-08'),(2,NULL,'Saul','2024-10-24',NULL,1,1,16,'Obra 01',1,5000,NULL,'2024-11-30');
/*!40000 ALTER TABLE `obra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamento`
--

DROP TABLE IF EXISTS `pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipoPagamento` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moeda` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamento`
--

LOCK TABLES `pagamento` WRITE;
/*!40000 ALTER TABLE `pagamento` DISABLE KEYS */;
INSERT INTO `pagamento` VALUES (1,'À vista','PIX');
/*!40000 ALTER TABLE `pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestador`
--

DROP TABLE IF EXISTS `prestador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomePrestador` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipoPrestador` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cpfCnpj` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idFuncao` int NOT NULL,
  `valorDiaria` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idFuncao` (`idFuncao`),
  CONSTRAINT `prestador_ibfk_1` FOREIGN KEY (`idFuncao`) REFERENCES `funcao_prestador` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestador`
--

LOCK TABLES `prestador` WRITE;
/*!40000 ALTER TABLE `prestador` DISABLE KEYS */;
INSERT INTO `prestador` VALUES (1,'Maria Pereira','Autônomo','98765432100','234567890120',1,100),(2,'Samoel','Autônomo','023656646664','629664666464',1,80);
/*!40000 ALTER TABLE `prestador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestador_obra`
--

DROP TABLE IF EXISTS `prestador_obra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestador_obra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idPrestador` int NOT NULL,
  `idObra` int NOT NULL,
  `dataInicio` date NOT NULL,
  `dataFim` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idPrestador` (`idPrestador`),
  KEY `idObra` (`idObra`),
  CONSTRAINT `prestador_obra_ibfk_1` FOREIGN KEY (`idPrestador`) REFERENCES `prestador` (`id`),
  CONSTRAINT `prestador_obra_ibfk_2` FOREIGN KEY (`idObra`) REFERENCES `obra` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestador_obra`
--

LOCK TABLES `prestador_obra` WRITE;
/*!40000 ALTER TABLE `prestador_obra` DISABLE KEYS */;
INSERT INTO `prestador_obra` VALUES (1,1,1,'2024-04-01','2024-07-01'),(2,2,1,'2024-11-05',NULL),(3,2,2,'2024-11-09','2024-11-15');
/*!40000 ALTER TABLE `prestador_obra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_de_fornecedor`
--

DROP TABLE IF EXISTS `tipo_de_fornecedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_de_fornecedor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomeTipo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_de_fornecedor`
--

LOCK TABLES `tipo_de_fornecedor` WRITE;
/*!40000 ALTER TABLE `tipo_de_fornecedor` DISABLE KEYS */;
INSERT INTO `tipo_de_fornecedor` VALUES (1,'Material de construção','Fornecedor para construção civil');
/*!40000 ALTER TABLE `tipo_de_fornecedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_de_obra`
--

DROP TABLE IF EXISTS `tipo_de_obra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_de_obra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomeTipo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricaoTipo` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_de_obra`
--

LOCK TABLES `tipo_de_obra` WRITE;
/*!40000 ALTER TABLE `tipo_de_obra` DISABLE KEYS */;
INSERT INTO `tipo_de_obra` VALUES (1,'Residencial','Obra destinada à construção de residências');
/*!40000 ALTER TABLE `tipo_de_obra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomeUsuario` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `razaoSocial` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cpfCnpj` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idEndereco` int DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_email_unique` (`email`),
  KEY `idEndereco` (`idEndereco`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idEndereco`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (2,'SAMOEL COSTA','slccosta','23132089000145','62555555555',12,'samuellopescosta@gmail.com',NULL,'$2y$10$TAQTo.yY/daysp7LyfyituMm4aqJxe9o47jZlGGdcMcZVc7Ho2WYq',NULL,'2024-09-24 17:56:37','2024-09-27 13:53:49'),(3,'Teste','teste novo','123456789101112','62991568478',5,'teste@system.com',NULL,'$2y$10$Eq7e9kr/4/TlrHjZeoMuS.kzQfz0fRD09s4JRR1OdIlpmn3liyTL.',NULL,'2024-09-27 11:38:29','2024-09-27 11:38:29'),(4,'Antônio Almeida','Execut Construções e Reformas','123456789101112','6233363636',6,'adminstrador@system.com',NULL,'$2y$10$Qj8UMTn02XDsNuiu4/YkC.eaH7pc8EIT5.FKMbraCMHTXVVl78Qeq',NULL,'2024-09-27 11:46:04','2024-10-10 17:49:07'),(5,'Teste novo','teste teste','123456789101112','62991568478',15,'newTeste@system.com',NULL,'$2y$10$txBybdedRvsM9sEJ7lL81uVEVnRBqYViMB9iHuTkJy3kNwrtmKZau',NULL,'2024-10-01 14:12:53','2024-10-01 14:12:53');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-08 16:30:54
