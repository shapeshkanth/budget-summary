-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2024 at 05:53 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `budget`
--

-- --------------------------------------------------------

--
-- Table structure for table `expences`
--

CREATE TABLE `expences` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `food` int(11) DEFAULT NULL,
  `travel` int(11) DEFAULT NULL,
  `shoping` int(11) DEFAULT NULL,
  `medicine` int(11) DEFAULT NULL,
  `others` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expences`
--

INSERT INTO `expences` (`id`, `date`, `food`, `travel`, `shoping`, `medicine`, `others`) VALUES
(26, '2024-08-12', 300, 40, 200, 200, 100.00),
(27, '2024-08-13', 400, 70, 200, 230, 150.00),
(28, '2024-08-13', 400, 70, 200, 230, 150.00),
(29, '2024-10-02', 450, 90, 250, 210, 180.00),
(30, '2024-11-21', 320, 110, 180, 190, 200.00),
(31, '2024-01-10', 380, 100, 210, 250, 170.00),
(32, '2024-02-29', 410, 80, 240, 220, 160.00),
(33, '2024-04-19', 370, 95, 230, 240, 190.00),
(34, '2024-06-08', 420, 85, 270, 210, 180.00),
(35, '2024-07-28', 390, 75, 220, 260, 140.00),
(36, '2024-09-16', 360, 100, 200, 240, 200.00),
(37, '2024-11-05', 430, 70, 280, 250, 190.00),
(38, '2024-12-25', 350, 110, 210, 230, 170.00),
(39, '2025-02-13', 410, 95, 260, 220, 150.00),
(40, '2025-04-04', 380, 85, 230, 210, 160.00),
(41, '2025-05-24', 440, 90, 250, 240, 180.00),
(42, '2025-07-13', 370, 100, 220, 230, 170.00),
(43, '2024-08-13', 300, 200, 0, 0, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `expences_temp`
--

CREATE TABLE `expences_temp` (
  `id` int(11) NOT NULL,
  `expences_name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expences_temp`
--

INSERT INTO `expences_temp` (`id`, `expences_name`, `amount`) VALUES
(60, 'Tea', 150.00),
(61, 'Bike', 200.00),
(62, 'Ice cream ', 150.00);

-- --------------------------------------------------------

--
-- Table structure for table `income`
--

CREATE TABLE `income` (
  `id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `income`
--

INSERT INTO `income` (`id`, `amount`) VALUES
(3, 268.00),
(4, 10000.00),
(5, 12000.00),
(6, 9000.00),
(7, 13000.00),
(8, 13500.00),
(9, 16000.00),
(10, 10000.00),
(11, 20000.00),
(12, 4000.00);

-- --------------------------------------------------------

--
-- Table structure for table `income_temp`
--

CREATE TABLE `income_temp` (
  `id` int(11) NOT NULL,
  `income_name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `income_temp`
--

INSERT INTO `income_temp` (`id`, `income_name`, `amount`) VALUES
(36, 'Bursary', 4000.00);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `userid` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `username`, `userid`, `email`, `password`, `birthdate`) VALUES
(15, 'Shapeshkanth', '2019/asp/87', 'shapeshkanth@gmail.com', '12345@', '2000-05-15');

-- --------------------------------------------------------

--
-- Table structure for table `suggestions`
--

CREATE TABLE `suggestions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suggestions`
--

INSERT INTO `suggestions` (`id`, `name`, `amount`, `category`) VALUES
(2, 'Tea', 20.00, 'Food'),
(3, 'Bike', 200.00, 'travel'),
(4, 'Pen', 30.00, 'shopping'),
(5, 'Tablet', 100.00, 'medicine'),
(7, 'Book', 100.00, 'shopping'),
(8, 'Rice', 100.00, 'Food'),
(11, 'Bus', 50.00, 'travel'),
(19, 'Bun', 100.00, 'Food'),
(20, 'Ice cream ', 150.00, 'Food');

-- --------------------------------------------------------

--
-- Table structure for table `summary`
--

CREATE TABLE `summary` (
  `date` date DEFAULT NULL,
  `food` int(11) DEFAULT NULL,
  `travel` int(11) DEFAULT NULL,
  `shoping` int(11) DEFAULT NULL,
  `medicine` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `summary`
--

INSERT INTO `summary` (`date`, `food`, `travel`, `shoping`, `medicine`) VALUES
('2024-05-06', 12, 23, 16, 21),
('2024-05-06', 12, 23, 16, 124),
('2024-05-06', 12, 23, 160, 12),
('2024-05-06', 12, 200, 10, 12),
('2024-05-06', 240, 14, 10, 12),
('2024-05-06', 8, 14, 10, 12);

-- --------------------------------------------------------

--
-- Table structure for table `summary1`
--

CREATE TABLE `summary1` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `food` int(11) DEFAULT NULL,
  `travel` int(11) DEFAULT NULL,
  `shoping` int(11) DEFAULT NULL,
  `medicine` int(11) DEFAULT NULL,
  `others` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `summary1`
--

INSERT INTO `summary1` (`id`, `date`, `food`, `travel`, `shoping`, `medicine`, `others`) VALUES
(7, '2024-05-06', 12, 23, 16, 21, 214.00),
(8, '2024-05-06', 12, 23, 16, 124, 234.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `expences`
--
ALTER TABLE `expences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expences_temp`
--
ALTER TABLE `expences_temp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `income_temp`
--
ALTER TABLE `income_temp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `summary1`
--
ALTER TABLE `summary1`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `expences`
--
ALTER TABLE `expences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `expences_temp`
--
ALTER TABLE `expences_temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `income`
--
ALTER TABLE `income`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `income_temp`
--
ALTER TABLE `income_temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `summary1`
--
ALTER TABLE `summary1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `update_income` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-20 00:02:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO income (amount) VALUES (0)$$

CREATE DEFINER=`root`@`localhost` EVENT `update_expense` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-20 00:02:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO Expences (date, food, travel, medicine, shoping, others) VALUES (CURRENT_DATE, 0, 0, 0, 0, 0)$$

CREATE DEFINER=`root`@`localhost` EVENT `delete_income` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-20 23:55:00' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM income_temp$$

CREATE DEFINER=`root`@`localhost` EVENT `delete_expense` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-20 23:55:00' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM expences_temp$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
