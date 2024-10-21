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
-- Table structure for table `custo_prestador`
--

DROP TABLE IF EXISTS `custo_prestador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custo_prestador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `valor` double NOT NULL,
  `idPrestador` int NOT NULL,
  `idFuncao` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPrestador` (`idPrestador`),
  KEY `idFuncao` (`idFuncao`),
  CONSTRAINT `custo_prestador_ibfk_1` FOREIGN KEY (`idPrestador`) REFERENCES `prestador` (`id`),
  CONSTRAINT `custo_prestador_ibfk_2` FOREIGN KEY (`idFuncao`) REFERENCES `funcao_prestador` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  PRIMARY KEY (`id`),
  KEY `idTipo` (`idTipo`),
  KEY `idEndereco` (`idEndereco`),
  CONSTRAINT `fornecedor_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tipo_de_fornecedor` (`id`),
  CONSTRAINT `fornecedor_ibfk_2` FOREIGN KEY (`idEndereco`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `mao_de_obra`
--

DROP TABLE IF EXISTS `mao_de_obra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mao_de_obra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idTipo` int NOT NULL,
  `idPrestador` int NOT NULL,
  `idFuncao` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idTipo` (`idTipo`),
  KEY `idPrestador` (`idPrestador`),
  KEY `idFuncao` (`idFuncao`),
  CONSTRAINT `mao_de_obra_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tipo_mao_de_obra` (`id`),
  CONSTRAINT `mao_de_obra_ibfk_2` FOREIGN KEY (`idPrestador`) REFERENCES `prestador` (`id`),
  CONSTRAINT `mao_de_obra_ibfk_3` FOREIGN KEY (`idFuncao`) REFERENCES `funcao_prestador` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `idTipo` int NOT NULL,
  `idOrigem` int NOT NULL,
  `idFornecedor` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idTipo` (`idTipo`),
  KEY `idOrigem` (`idOrigem`),
  KEY `idFornecedor` (`idFornecedor`),
  CONSTRAINT `material_de_obra_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tipo_de_obra` (`id`),
  CONSTRAINT `material_de_obra_ibfk_2` FOREIGN KEY (`idOrigem`) REFERENCES `origem_recurso` (`id`),
  CONSTRAINT `material_de_obra_ibfk_3` FOREIGN KEY (`idFornecedor`) REFERENCES `fornecedor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `obra`
--

DROP TABLE IF EXISTS `obra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `valorFinal` double DEFAULT NULL,
  `responsavelObra` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dataInicio` datetime NOT NULL,
  `dataFim` datetime DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `origem_recurso`
--

DROP TABLE IF EXISTS `origem_recurso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `origem_recurso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipoOrigem` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `valorDiaria` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idFuncao` (`idFuncao`),
  CONSTRAINT `prestador_ibfk_1` FOREIGN KEY (`idFuncao`) REFERENCES `funcao_prestador` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `dataFim` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPrestador` (`idPrestador`),
  KEY `idObra` (`idObra`),
  CONSTRAINT `prestador_obra_ibfk_1` FOREIGN KEY (`idPrestador`) REFERENCES `prestador` (`id`),
  CONSTRAINT `prestador_obra_ibfk_2` FOREIGN KEY (`idObra`) REFERENCES `obra` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `tipo_mao_de_obra`
--

DROP TABLE IF EXISTS `tipo_mao_de_obra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_mao_de_obra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomeTipo` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-21 17:20:27
