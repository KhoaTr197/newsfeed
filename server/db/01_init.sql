SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET COLLATION_CONNECTION = 'utf8mb4_unicode_ci';

CREATE TABLE `articles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` nvarchar(100),
  `content` text,
  `thumbnail` text,
  `publishedDate` datetime,
  `userId` int,
  `cateId` int,
  `status` bool DEFAULT 1
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `cateName` nvarchar(50),
  `status` bool DEFAULT 1
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50),
  `password` varchar(32),
  `email` varchar(100) UNIQUE,
  `role` bit,
  `status` bool DEFAULT 1
);

CREATE TABLE `contact` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text,
  `email` text,
  `message` text
);

ALTER TABLE `articles` ADD FOREIGN KEY (`cateId`) REFERENCES `categories` (`id`);

ALTER TABLE `articles`  ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);