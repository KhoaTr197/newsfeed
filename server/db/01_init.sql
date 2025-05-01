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
  `cate_name` nvarchar(50),
  `status` bool DEFAULT 1
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(100),
  `content` text,
  `article_id` int,
  `created_at` datetime
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

CREATE TABLE `newsletterSubscribers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(100) UNIQUE
);

CREATE TABLE `websiteInfo` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `address` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `facebook_url` VARCHAR(255),
  `youtube_url` VARCHAR(255),
  `copyright` VARCHAR(255),
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `articles` ADD FOREIGN KEY (`cate_id`) REFERENCES `categories` (`id`);

ALTER TABLE `articles`  ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`);