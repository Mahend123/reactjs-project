-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2019 at 07:59 AM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pstock_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `billing_tbl`
--

CREATE TABLE IF NOT EXISTS `billing_tbl` (
`id` int(11) NOT NULL,
  `invoiceno` varchar(255) NOT NULL,
  `customername` varchar(255) NOT NULL,
  `contactno` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `gst_number` varchar(255) NOT NULL,
  `trans` varchar(255) NOT NULL,
  `product` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL,
  `dis` varchar(255) NOT NULL,
  `disval` varchar(255) NOT NULL,
  `fright` varchar(255) NOT NULL,
  `gstinsert` varchar(255) NOT NULL,
  `gstvalue` varchar(255) NOT NULL,
  `igstins` varchar(255) NOT NULL,
  `igstinsval` varchar(255) NOT NULL,
  `grandtotal` varchar(255) NOT NULL,
  `create_date` datetime NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `billing_tbl`
--

INSERT INTO `billing_tbl` (`id`, `invoiceno`, `customername`, `contactno`, `address`, `gst_number`, `trans`, `product`, `quantity`, `size`, `price`, `total`, `dis`, `disval`, `fright`, `gstinsert`, `gstvalue`, `igstins`, `igstinsval`, `grandtotal`, `create_date`) VALUES
(2, '124', 'Ravi', '5623541254', 'Bhopal', '254', 't21', 'Realme x - 452010 - 452020 - 12X25 - 2 - HNS12', '2', '12X25', '100', '60000', '5', '3000', '2', '5', '2850.1', '5', '2850.1', '62702.2', '2019-07-17 15:05:12');

-- --------------------------------------------------------

--
-- Table structure for table `category_tbl`
--

CREATE TABLE IF NOT EXISTS `category_tbl` (
`id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modify_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `category_tbl`
--

INSERT INTO `category_tbl` (`id`, `user_id`, `category`, `create_date`, `modify_date`) VALUES
(1, 1, '12X25', '2019-07-17 12:39:24', '2019-07-17 12:39:24');

-- --------------------------------------------------------

--
-- Table structure for table `image_tbl`
--

CREATE TABLE IF NOT EXISTS `image_tbl` (
`id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `deal1` varchar(255) NOT NULL,
  `deal2` varchar(255) NOT NULL,
  `deal3` varchar(255) NOT NULL,
  `deal4` varchar(255) NOT NULL,
  `deal5` varchar(255) NOT NULL,
  `deal6` varchar(255) NOT NULL,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `image_tbl`
--

INSERT INTO `image_tbl` (`id`, `user_id`, `deal1`, `deal2`, `deal3`, `deal4`, `deal5`, `deal6`, `create_date`, `modify_date`) VALUES
(1, 1, '125387-logo05.png', '199318-digital_india.png', '479433-mpsedc1.png', '500561-new.png', '103040-thempnews.jpg', '310931-opulence-logo-again2.png', '2019-07-19 09:18:38', '2019-07-19 14:07:19');

-- --------------------------------------------------------

--
-- Table structure for table `import_tbl`
--

CREATE TABLE IF NOT EXISTS `import_tbl` (
`id` int(11) NOT NULL,
  `excelfile` varchar(255) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `import_tbl`
--

INSERT INTO `import_tbl` (`id`, `excelfile`) VALUES
(1, '433733-product.xls');

-- --------------------------------------------------------

--
-- Table structure for table `pdf_tbl`
--

CREATE TABLE IF NOT EXISTS `pdf_tbl` (
`id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `gstno` varchar(255) NOT NULL,
  `bankdetail` varchar(255) NOT NULL,
  `acno` varchar(255) NOT NULL,
  `ifsc` varchar(100) NOT NULL,
  `branch` varchar(100) NOT NULL,
  `distributor` varchar(255) NOT NULL,
  `terms` varchar(255) NOT NULL,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `pdf_tbl`
--

INSERT INTO `pdf_tbl` (`id`, `user_id`, `address`, `telephone`, `gstno`, `bankdetail`, `acno`, `ifsc`, `branch`, `distributor`, `terms`, `create_date`, `modify_date`) VALUES
(1, 0, '', '', '', '', '', '', '', '', '', '2019-07-17 12:47:06', '2019-07-20 15:35:02'),
(2, 1, '1st Floor , New IT Park Building, Electronic Complex, Pardesipura', '9827078270', 'GSt23', 'bank of india', '90151051000044445', 'BKID05421', 'vijay nagar', 'mahendra', 'this is ', '2019-07-24 08:33:41', '2019-07-24 08:33:41');

-- --------------------------------------------------------

--
-- Table structure for table `product_tbl`
--

CREATE TABLE IF NOT EXISTS `product_tbl` (
`id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `hsn` varchar(255) NOT NULL,
  `pcode1` varchar(255) NOT NULL,
  `pcode2` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modify` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `product_tbl`
--

INSERT INTO `product_tbl` (`id`, `user_id`, `product_name`, `hsn`, `pcode1`, `pcode2`, `category`, `price`, `quantity`, `description`, `created`, `modify`) VALUES
(1, 1, 'Realme x', 'HNS12', '452010', '452020', '12X25', 15000, 2, 'This is My mobile', '2019-07-17 07:11:07', '2019-07-17 07:11:07'),
(2, 1, 'mobile', 'HNS1245', '452010', '452010', '11X11', 1500, 2, 'This is test description', '2019-07-26 09:33:58', '2019-07-26 09:33:58'),
(3, 1, 'mobile', 'HNS1245', '452010', '452010', '11X11', 1500, 2, 'This is test description', '2019-07-26 09:37:45', '2019-07-26 09:37:45'),
(4, 1, 'mobile', 'HNS1245', '452010', '452010', '11X11', 1500, 2, 'This is test description', '2019-07-26 10:42:07', '2019-07-26 10:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `shopName` varchar(255) NOT NULL,
  `image1` varchar(255) NOT NULL,
  `image2` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `loginkey` varchar(255) DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_date` datetime NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `mobile`, `shopName`, `image1`, `image2`, `country`, `state`, `city`, `address`, `status`, `loginkey`, `create_date`, `modify_date`) VALUES
(1, 'rajat', 'rajat@gmail.com', '123', '9827078270', 'Guru Kirpa', '764823-download.jpg', '793054-opulence-logo-again2.png', 'India', 'Andaman and Nicobar Islands', 'Bombuflat', '1st Floor , New IT Park Building, Electronic Complex, Pardesipura', 'active', '74062403696917972048', '2019-07-29 13:56:11', '2019-07-25 16:32:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `billing_tbl`
--
ALTER TABLE `billing_tbl`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category_tbl`
--
ALTER TABLE `category_tbl`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image_tbl`
--
ALTER TABLE `image_tbl`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `import_tbl`
--
ALTER TABLE `import_tbl`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pdf_tbl`
--
ALTER TABLE `pdf_tbl`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_tbl`
--
ALTER TABLE `product_tbl`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `billing_tbl`
--
ALTER TABLE `billing_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `category_tbl`
--
ALTER TABLE `category_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `image_tbl`
--
ALTER TABLE `image_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `import_tbl`
--
ALTER TABLE `import_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `pdf_tbl`
--
ALTER TABLE `pdf_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `product_tbl`
--
ALTER TABLE `product_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
