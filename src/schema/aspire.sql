DROP DATABASE IF EXISTS `aspire_db`;
CREATE DATABASE IF NOT EXISTS `aspire_db`;
USE `aspire_db`;

--
-- Table structure for table `aspire_user`
--
DROP TABLE IF EXISTS `aspire_users`;
CREATE TABLE `aspire_users` (
  `id`                BIGINT   AUTO_INCREMENT,
  `email`             VARCHAR(30)  NULL,
  `password`          VARCHAR(255) NULL,
  `referral_code`     VARCHAR(30)  NULL,
  `referred_by`       VARCHAR(30)  NULL,
  `credit_score`      TINYINT      NULL,
  `email_verified_at` DATETIME     NULL,
  `phone_verified_at` DATETIME     NULL,
  `last_login_at`     DATETIME     NULL,
  `created_on`        DATETIME DEFAULT NOW(),
  `updated_on`        DATETIME     NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aspire_users_id` (`id`)
  #   CONSTRAINT `aspire_user_referred_by` FOREIGN KEY (`referred_by`) REFERENCES `aspire_users` (`referral_code`)
  #   CONSTRAINT `aspire_user_referred_by` FOREIGN KEY (`referred_by`) REFERENCES `aspire_users` (`referral_code`)
)
  ENGINE = INNODB
  DEFAULT CHARSET = UTF8;

INSERT INTO aspire_users (`email`, `password`, `referral_code`, `referred_by`, `credit_score`)
  VALUE ('hao.ho@wearefram.com', 'pass', '123', '123456', 29);

--
-- Table structure for table `aspire_business_info`
--
DROP TABLE IF EXISTS `aspire_business_info`;
CREATE TABLE `aspire_business_info` (
  `id`                BIGINT AUTO_INCREMENT,
  `identifier_type`   VARCHAR(20)  NULL,
  `identifier_value`  VARCHAR(50)  NULL,
  `name`              VARCHAR(30)  NULL,
  `address`           VARCHAR(255) NULL,
  `city`              VARCHAR(30)  NULL,
  `cap`               VARCHAR(30)  NULL,
  `country`           VARCHAR(30)  NULL,
  `phone`             VARCHAR(30)  NULL,
  `data_established`  VARCHAR(30)  NULL,
  `type_of_entity`    VARCHAR(30)  NULL,
  `email_verified_at` DATETIME     NULL,
  `phone_verified_at` DATETIME     NULL,
  `user_id`           BIGINT       NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aspire_business_info_id` (`id`),
  CONSTRAINT `aspire_business_info_user_id` FOREIGN KEY (`user_id`) REFERENCES `aspire_users` (`id`)
)
  ENGINE = INNODB
  DEFAULT CHARSET = UTF8;

--
-- Table structure for table `aspire_personal_info`
--
DROP TABLE IF EXISTS `aspire_personal_info`;
CREATE TABLE `aspire_personal_info` (
  `id`                BIGINT AUTO_INCREMENT,
  `identifier_type`   VARCHAR(20) NULL,
  `identifier_value`  VARCHAR(50) NULL,
  `first_name`        VARCHAR(50) NULL,
  `last_name`         VARCHAR(50) NULL,
  `address`           VARCHAR(30) NULL,
  `city`              VARCHAR(30) NULL,
  `cap`               VARCHAR(30) NULL,
  `country`           VARCHAR(30) NULL,
  `phone`             VARCHAR(30) NULL,
  `date_of_birth`     DATE        NULL,
  `email_verified_at` DATETIME    NULL,
  `phone_verified_at` DATETIME    NULL,
  `user_id`           BIGINT      NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aspire_personal_info_id` (`id`),
  CONSTRAINT `aspire_personal_info_user_id` FOREIGN KEY (`user_id`) REFERENCES `aspire_users` (`id`)
)
  ENGINE = INNODB
  DEFAULT CHARSET = UTF8;

DROP TABLE IF EXISTS `aspire_statuses`;
## statuses: draft, pending approval, approved, declined, paid, paid-back, un-paid, closed
CREATE TABLE `aspire_statuses` (
  `id`   BIGINT AUTO_INCREMENT,
  `name` VARCHAR(30) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aspire_statuses` (`id`)
)
  ENGINE = INNODB
  DEFAULT CHARSET = UTF8;

DROP TABLE IF EXISTS `aspire_loans`;
CREATE TABLE `aspire_loans` (
  `id`                 BIGINT AUTO_INCREMENT,
  `amount`             DECIMAL(13, 4) NULL,
  `currency`           VARCHAR(30)    NULL,
  `monthly_fee`        VARCHAR(30)    NULL,
  `interest_rate`      VARCHAR(30)    NULL,
  `payment_method`     VARCHAR(30)    NULL,
  `approved_on`        DATETIME       NULL,
  `rejected_on`        DATETIME       NULL,
  `contract_signed_on` DATETIME       NULL,
  `cash_sent_on`       DATETIME       NULL,
  `next_repayment_on`  DATETIME       NULL,
  `duration`           SMALLINT       NULL,
  `created_on`         DATETIME       NULL,
  `user_id`            BIGINT         NOT NULL,
  `status_id`          BIGINT         NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aspire_loans` (`id`),
  CONSTRAINT `aspire_loans_user_id` FOREIGN KEY (`user_id`) REFERENCES `aspire_users` (`id`),
  CONSTRAINT `aspire_loans_status_id` FOREIGN KEY (`status_id`) REFERENCES `aspire_statuses` (`id`)
)
  ENGINE = INNODB
  DEFAULT CHARSET = UTF8;


DROP TABLE IF EXISTS `aspire_payments`;
CREATE TABLE `aspire_payments` (
  `id`               BIGINT AUTO_INCREMENT,
  `amount`           DECIMAL(13, 4) NULL,
  `monthly_fee`      DECIMAL(13, 4) NULL,
  `interest_rate`    DECIMAL(4, 2)  NULL,
  `payment_method`   VARCHAR(30)    NULL,
  `fine`             DECIMAL(13, 4) NULL,
  `fine_description` VARCHAR(30)    NULL,
  `created_on`       DATETIME       NULL,
  `load_id`          BIGINT         NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aspire_payments` (`id`),
  CONSTRAINT `aspire_payments_loan_id` FOREIGN KEY (`load_id`) REFERENCES `aspire_loans` (`id`)
)
  ENGINE = INNODB
  DEFAULT CHARSET = UTF8;

DROP TABLE IF EXISTS `aspire_credit_scores_history`;
CREATE TABLE `aspire_credit_scores_history` (
  `id`          BIGINT  AUTO_INCREMENT,
  `name`        VARCHAR(30) NULL,
  `source`      VARCHAR(30) NULL,
  `description` VARCHAR(30) NULL,
  `score`       TINYINT DEFAULT 1,
  `created_on`  DATETIME    NULL,
  `updated_on`  DATETIME    NULL,
  `user_id`     BIGINT      NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aspire_credit_scores_history` (`id`),
  CONSTRAINT `aspire_credit_scores_history_user_id` FOREIGN KEY (`user_id`) REFERENCES `aspire_users` (`id`)
)
  ENGINE = INNODB
  DEFAULT CHARSET = UTF8;


DROP TABLE IF EXISTS `aspire_lazada_sellers`;
CREATE TABLE `aspire_lazada_sellers` (
  `id`                BIGINT AUTO_INCREMENT,
  `name`              VARCHAR(30)   NULL,
  `size`              TINYINT(4)    NULL,
  `location`          VARCHAR(30)   NULL,
  `timeInBusiness`    TINYINT       NULL,
  `shipOnTime`        DECIMAL(9, 2) NULL,
  `rating`            DECIMAL(4, 2) NULL,
  `numberOfProducts`  INT           NULL,
  `pendingOrders`     DECIMAL(4, 2) NULL,
  `url`               VARCHAR(100)  NULL,
  `positive`          TINYINT       NULL,
  `negative`          TINYINT       NULL,
  `neutral`           TINYINT       NULL,
  `refund_rate`       DECIMAL(4, 2) NULL,
  `cancellation_rate` DECIMAL(4, 2) NULL,
  `created_on`        DATETIME      NULL,
  `updated_on`        DATETIME      NULL,
  `user_id`           BIGINT        NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aspire_lazada_sellers` (`id`),
  CONSTRAINT `aspire_lazada_sellers_user_id` FOREIGN KEY (`user_id`) REFERENCES `aspire_users` (`id`)
)
  ENGINE = INNODB
  DEFAULT CHARSET = UTF8;


DROP TABLE IF EXISTS `aspire_lazada_transactions`;
CREATE TABLE `aspire_lazada_transactions` (
  `id`         BIGINT AUTO_INCREMENT,
  `name`       VARCHAR(100)   NULL,
  `price`      DECIMAL(13, 4) NULL,
  `currency`   VARCHAR(3)     NULL,
  `category`   VARCHAR(50)    NULL,
  `rating`     DECIMAL(4, 2)  NULL,
  `url`        TEXT           NULL,
  `created_on` DATETIME       NULL,
  `updated_on` DATETIME       NULL,
  `seller_id`  BIGINT         NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aspire_lazada_transactions` (`id`),
  CONSTRAINT `aspire_lazada_transactions_seller_id` FOREIGN KEY (`seller_id`) REFERENCES `aspire_lazada_sellers` (`id`)
)
  ENGINE = INNODB
  DEFAULT CHARSET = UTF8;


DROP TABLE IF EXISTS `aspire_shopee_sellers`;
CREATE TABLE `aspire_shopee_sellers` (
  `id`               BIGINT AUTO_INCREMENT,
  `name`             VARCHAR(30)   NULL,
  `timeInBusiness`   TINYINT       NULL,
  `rating`           DECIMAL(4, 2) NULL,
  `responseRate`     DECIMAL(4, 2) NULL,
  `pendingOrders`    DECIMAL(4, 2) NULL,
  `numberOfProducts` INT           NULL,
  `followers`        INT           NULL,
  `url`              VARCHAR(100)  NULL,
  `created_on`       DATETIME      NULL,
  `updated_on`       DATETIME      NULL,
  `user_id`          BIGINT        NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aspire_shopee_sellers` (`id`),
  CONSTRAINT `aspire_shopee_sellers_seller_id` FOREIGN KEY (`user_id`) REFERENCES `aspire_users` (`id`)
)
  ENGINE = INNODB
  DEFAULT CHARSET = UTF8;


DROP TABLE IF EXISTS `aspire_shopee_transactions`;
CREATE TABLE `aspire_shopee_transactions` (
  `id`         BIGINT AUTO_INCREMENT,
  `name`       VARCHAR(100)   NULL,
  `price`      DECIMAL(13, 4) NULL,
  `currency`   VARCHAR(3)     NULL,
  `category`   VARCHAR(50)    NULL,
  `rating`     DECIMAL(4, 2)  NULL,
  `url`        TEXT           NULL,
  `created_on` DATETIME       NULL,
  `updated_on` DATETIME       NULL,
  `seller_id`  BIGINT         NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aspire_shopee_transactions` (`id`),
  CONSTRAINT `aspire_shopee_transactions_seller_id` FOREIGN KEY (`seller_id`) REFERENCES `aspire_shopee_sellers` (`id`)
)
  ENGINE = INNODB
  DEFAULT CHARSET = UTF8;
