-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 06, 2015 at 03:13 AM
-- Server version: 5.5.40
-- PHP Version: 5.3.10-1ubuntu3.18

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `andal`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `dataandtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `email`, `password`, `dataandtime`) VALUES
(1, 'mani', 'manikdans@gmail.om', 'dadsada', '2015-09-05 21:09:55'),
(2, 'mani', 'manikdans@gmail.om', 'dadsada', '2015-09-05 21:12:44'),
(3, 'mani', 'manikdans@gmail.om', 'dadsada', '2015-09-05 21:13:08'),
(4, 'mani', 'manikdans@gmail.om', 'dadsada', '2015-09-05 21:13:29'),
(5, 'andal', 'andal@gmail.com', 'andal', '2015-09-05 21:19:45'),
(6, 'andal', 'andal@gmail.com', 'andasl', '2015-09-05 21:20:21'),
(7, 'sample', 'sample@fdf.d', 'fddfsdf', '2015-09-05 21:21:14'),
(8, 'sample', 'sample@fdf.d', 'fddfsdf', '2015-09-05 21:21:59'),
(9, 'sample', 'sample@fdf.d', 'fddfsdf', '2015-09-05 21:22:09'),
(10, 'hema', 'hema@gmail.com', 'mani', '2015-09-05 21:41:20'),
(11, 'mani', 'mani', 'mani', '2015-09-05 21:42:38');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
