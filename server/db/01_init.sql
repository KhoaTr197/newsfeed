SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET COLLATION_CONNECTION = 'utf8mb4_unicode_ci';

CREATE TABLE `articles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` nvarchar(100),
  `content` text,
  `thumbnail` text,
  `original_image` text,
  `published_date` datetime,
  `views` int UNSIGNED NOT NULL DEFAULT 0,
  `user_id` int,
  `cate_id` int,
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
  `role` bool,
  `status` bool DEFAULT 1
);

CREATE TABLE `contact` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text,
  `email` text,
  `phone` text,
  `title` text,
  `content` text
);

ALTER TABLE `articles` ADD FOREIGN KEY (`cate_id`) REFERENCES `categories` (`id`);

ALTER TABLE `articles`  ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);