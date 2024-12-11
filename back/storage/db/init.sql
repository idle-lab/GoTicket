CREATE DATABASE IF NOT EXISTS `goticket`;

USE `goticket`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` CHAR(20) NOT NULL,
  `sex` ENUM('Male','Female') NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `phone` CHAR(15) NOT NULL,
  `create_date` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `id_number` CHAR(18) NOT NULL,
  `role` ENUM('admin', 'user') DEFAULT 'admin',
  PRIMARY KEY (`id`),
  KEY `name_index` (`name`),
  KEY `phone_index` (`phone`),
  KEY `id_number_idex` (`id_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `trains` (
  `id` SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(32) UNIQUE NOT NULL,
  `train_type` ENUM('G','D','K') NOT NULL,
  `max_capacity` SMALLINT UNSIGNED NOT NULL,
  `seats` JSON NOT NULL,
  `avg_speed` DOUBLE NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `routes` (
  `id` SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(31) UNIQUE NOT NULL,
  `price_pk` DECIMAL(9, 2)  NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `stations` (
  `id` SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(31) NOT NULL,
  `postion` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `station_index` (`name`),
  KEY `postion_index` (`postion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `route_station` (
  `route_id` SMALLINT UNSIGNED NOT NULL,
  `station_id` SMALLINT UNSIGNED NOT NULL,
  `distance_from_start` DOUBLE NOT NULL,
  PRIMARY KEY (`route_id`,`station_id`),
  FOREIGN KEY (`route_id`) REFERENCES routes(`id`),
  FOREIGN KEY (`station_id`) REFERENCES stations(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `train_numbers` (
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `code` VARCHAR(4) NOT NULL,
  `status` ENUM('Online','Offline') DEFAULT 'Offline' NOT NULL,
  `available_seats` SMALLINT UNSIGNED NOT NULL,
  `start_time` DATETIME NOT NULL,
  `dwell_time_per_stop` VARCHAR(255) NOT NULL,  
  `train_id` SMALLINT UNSIGNED NOT NULL,
  `route_id` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`train_id`) REFERENCES trains(`id`),
  FOREIGN KEY (`route_id`) REFERENCES routes(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `start_station` VARCHAR(31) NOT NULL,
  `end_station` VARCHAR(31) NOT NULL,
  `departure_time` DATETIME NOT NULL,
  `arrival_time` DATETIME NOT NULL,
  `carriage` TINYINT UNSIGNED NOT NULL,
  `row` TINYINT UNSIGNED NOT NULL,
  `seat` TINYINT UNSIGNED NOT NULL,
  `status` ENUM('Used','Unused','Refunded') NOT NULL,
  `user_id` INT UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `pay_method` ENUM('WeChatPay','Alipay') NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `status` ENUM('Paid','Unpaid') NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `ticket_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`),
  FOREIGN KEY (`ticket_id`) REFERENCES tickets(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
