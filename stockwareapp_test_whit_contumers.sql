-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-10-2024 a las 07:50:13
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `stockwareapp_test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo_documento` varchar(50) NOT NULL,
  `numero_documento` int(11) NOT NULL,
  `estado_actor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `nombre`, `tipo_documento`, `numero_documento`, `estado_actor`) VALUES
(1, 'Minoristas Articulos de Aseo Personal SAS', 'NIT', 2147483647, 'Activo'),
(2, 'Juan Carlos Ramírez', 'CC', 1023654789, 'Activo'),
(3, 'Distribuidora Cosméticos y Más Ltda', 'NIT', 2147483647, 'Activo'),
(4, 'Paola Andrea Torres', 'CC', 1007456321, 'Inactivo'),
(5, 'Comercializadora Global S.A.S', 'NIT', 2147483647, 'Activo'),
(6, 'Carlos Andrés Pérez', 'CC', 1013569874, 'Activo'),
(7, 'Limpieza Total y Servicios S.A', 'NIT', 2147483647, 'Inactivo'),
(8, 'Maria Fernanda Gómez', 'CC', 1032654789, 'Activo'),
(9, 'Proveedor Nacional de Productos de Aseo LTDA', 'NIT', 2147483647, 'Activo'),
(10, 'Luis Eduardo Martínez', 'CC', 1018456329, 'Activo'),
(11, 'Productos Higiénicos del Norte S.A', 'NIT', 2147483647, 'Activo'),
(12, 'Corporación de Bienestar y Salud', 'RUT', 1239874560, 'Activo'),
(13, 'Andrea Camila Rodríguez', 'CC', 1009876541, 'Inactivo'),
(14, 'Distribuidora de Productos Higiénicos S.A.S', 'NIT', 2147483647, 'Activo'),
(15, 'Luis Fernando Castaño', 'CC', 1025369871, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `presentacion` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `marca`, `categoria`, `presentacion`, `cantidad`, `precio`, `estado`) VALUES
(1, 'Desodorante Roll-On', 'Rexona', 'Desodorante', 'Roll-On 50ml', 27, 34, 'Disponible'),
(2, 'Jabón Líquido Antibacterial', 'Lifebuoy', 'Jabón', 'Botella 250ml', 5, 65, 'Disponible'),
(3, 'Champú Hidratante', 'Pantene', 'Champú', 'Botella 400ml', 33, 95, 'Disponible'),
(4, 'Desodorante Aerosol', 'Nivea', 'Desodorante', 'Aerosol 150ml', 0, 48, 'No disponible'),
(5, 'Jabón de Barra', 'Dove', 'Jabón', 'Barra 100g', 25, 87, 'Disponible'),
(6, 'Champú Anti-Caspa', 'Head & Shoulders', 'Champú', 'Botella 300ml', 31, 76, 'Disponible'),
(7, 'Desodorante Roll-On', 'Old Spice', 'Desodorante', 'Roll-On 50ml', 30, 58, 'Disponible'),
(8, 'Jabón Líquido Nutritivo', 'Neutrogena', 'Jabón', 'Botella 200ml', 0, 28, 'No disponible'),
(9, 'Champú Reparador', 'Garnier', 'Champú', 'Botella 350ml', 1, 45, 'Disponible'),
(10, 'Desodorante Aerosol', 'Sanex', 'Desodorante', 'Aerosol 150ml', 11, 25, 'Disponible'),
(11, 'Jabón de Barra Hidratante', 'Aveeno', 'Jabón', 'Barra 90g', 32, 28, 'Disponible'),
(12, 'Champú Voluminizador', 'Tresemmé', 'Champú', 'Botella 500ml', 0, 91, 'No disponible'),
(13, 'Desodorante Roll-On', 'Adidas', 'Desodorante', 'Roll-On 50ml', 33, 80, 'Disponible'),
(14, 'Jabón Líquido Suave', 'Cetaphil', 'Jabón', 'Botella 250ml', 32, 33, 'Disponible'),
(15, 'Champú Aclarador', 'L\'Oréal', 'Champú', 'Botella 400ml', 15, 47, 'Disponible'),
(16, 'Desodorante Roll-On', 'Rexona', 'Desodorante', 'Roll-On 50ml', 31, 100, 'Disponible'),
(17, 'Jabón Líquido Corporal', 'Dove', 'Jabón', 'Botella 400ml', 9, 92, 'Disponible'),
(18, 'Shampoo Anticaspa', 'Head & Shoulders', 'Shampoo', 'Botella 200ml', 36, 61, 'Disponible'),
(19, 'Desodorante en Barra', 'Old Spice', 'Desodorante', 'Barra 60g', 18, 96, 'Disponible'),
(20, 'Jabón en Barra Hidratante', 'Nivea', 'Jabón', 'Barra 100g', 26, 53, 'Disponible'),
(21, 'Shampoo Reparador', 'Pantene', 'Shampoo', 'Botella 300ml', 32, 98, 'Disponible'),
(22, 'Desodorante Aerosol', 'Axe', 'Desodorante', 'Aerosol 150ml', 23, 77, 'Disponible'),
(23, 'Jabón en Barra Exfoliante', 'Palmolive', 'Jabón', 'Barra 120g', 2, 22, 'Disponible'),
(24, 'Shampoo Voluminizador', 'Garnier Fructis', 'Shampoo', 'Botella 350ml', 19, 55, 'Disponible'),
(25, 'Desodorante en Crema', 'Lady Speed Stick', 'Desodorante', 'Crema 45g', 11, 38, 'Disponible'),
(26, 'Jabón Líquido para Manos', 'Softsoap', 'Jabón', 'Botella 250ml', 34, 39, 'Disponible'),
(27, 'Shampoo Fortalecedor', 'TRESemmé', 'Shampoo', 'Botella 400ml', 40, 100, 'Disponible'),
(28, 'Desodorante en Gel', 'Gillette', 'Desodorante', 'Gel 70ml', 19, 54, 'Disponible'),
(29, 'Jabón en Barra para Piel Sensible', 'Aveeno', 'Jabón', 'Barra 110g', 4, 90, 'Disponible'),
(30, 'Shampoo Hidratante', 'Herbal Essences', 'Shampoo', 'Botella 500ml', 19, 22, 'Disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `username`, `password`, `rol`, `estado`) VALUES
(1, 'ar', '$2y$10$/A8GQ/jg34QjvS3X/haUIu6ah4.cnzhwO/vVWM9FyeBAJg4AsL3s6', 'Admin', 'Disponible'),
(2, 'sandra', '$2y$10$YDBvVYV2aOm9y8mF9gRaku17/7N0nbvDC0mS/PKGtupYscv93qkrm', 'Vendedora', 'Disponible'),
(3, 'julieth', '$2y$10$GJ3ZuNjkpQC5eDlXqast4OcFAvp9/u1hDZKTD5me6q0kh8SIUoaL6', 'Auditora', 'Disponible');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
