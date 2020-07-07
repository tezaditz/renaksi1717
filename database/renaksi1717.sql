/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100408
 Source Host           : localhost:3306
 Source Schema         : renaksi1717

 Target Server Type    : MySQL
 Target Server Version : 100408
 File Encoding         : 65001

 Date: 07/07/2020 21:10:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cms_apicustom
-- ----------------------------
DROP TABLE IF EXISTS `cms_apicustom`;
CREATE TABLE `cms_apicustom`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `permalink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `tabel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `aksi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `kolom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `orderby` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `sub_query_1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `sql_where` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `parameter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `method_type` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `parameters` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `responses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cms_apikey
-- ----------------------------
DROP TABLE IF EXISTS `cms_apikey`;
CREATE TABLE `cms_apikey`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `screetkey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `hit` int(11) NULL DEFAULT NULL,
  `status` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cms_dashboard
-- ----------------------------
DROP TABLE IF EXISTS `cms_dashboard`;
CREATE TABLE `cms_dashboard`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `id_cms_privileges` int(11) NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cms_email_queues
-- ----------------------------
DROP TABLE IF EXISTS `cms_email_queues`;
CREATE TABLE `cms_email_queues`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `send_at` datetime(0) NULL DEFAULT NULL,
  `email_recipient` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email_from_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email_from_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email_cc_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email_subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `email_attachments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `is_sent` tinyint(1) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cms_email_templates
-- ----------------------------
DROP TABLE IF EXISTS `cms_email_templates`;
CREATE TABLE `cms_email_templates`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `from_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `from_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `cc_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_email_templates
-- ----------------------------
INSERT INTO `cms_email_templates` VALUES (1, 'Email Template Forgot Password Backend', 'forgot_password_backend', NULL, '<p>Hi,</p><p>Someone requested forgot password, here is your new password : </p><p>[password]</p><p><br></p><p>--</p><p>Regards,</p><p>Admin</p>', '[password]', 'System', 'system@crudbooster.com', NULL, '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_email_templates` VALUES (2, 'Email Template Forgot Password Backend', 'forgot_password_backend', NULL, '<p>Hi,</p><p>Someone requested forgot password, here is your new password : </p><p>[password]</p><p><br></p><p>--</p><p>Regards,</p><p>Admin</p>', '[password]', 'System', 'system@crudbooster.com', NULL, '2020-07-06 22:45:52', NULL);

-- ----------------------------
-- Table structure for cms_logs
-- ----------------------------
DROP TABLE IF EXISTS `cms_logs`;
CREATE TABLE `cms_logs`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ipaddress` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `useragent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `details` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `id_cms_users` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_logs
-- ----------------------------
INSERT INTO `cms_logs` VALUES (1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/logout', ' logout', '', NULL, '2020-07-06 22:46:32', NULL);
INSERT INTO `cms_logs` VALUES (2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/login', 'admin@crudbooster.com login with IP Address 127.0.0.1', '', 1, '2020-07-07 01:37:34', NULL);
INSERT INTO `cms_logs` VALUES (3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/menu_management/add-save', 'Add New Data Beranda at Menu Management', '', 1, '2020-07-07 01:38:38', NULL);
INSERT INTO `cms_logs` VALUES (4, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/menu_management/add-save', 'Add New Data Profil at Menu Management', '', 1, '2020-07-07 01:39:28', NULL);
INSERT INTO `cms_logs` VALUES (5, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/menu_management/edit-save/2', 'Update data Profil at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>sorting</td><td></td><td></td></tr></tbody></table>', 1, '2020-07-07 01:46:08', NULL);
INSERT INTO `cms_logs` VALUES (6, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/menu_management/edit-save/1', 'Update data Beranda at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>sorting</td><td></td><td></td></tr></tbody></table>', 1, '2020-07-07 01:46:16', NULL);
INSERT INTO `cms_logs` VALUES (7, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/menu_management/add-save', 'Add New Data Informasi at Menu Management', '', 1, '2020-07-07 01:47:04', NULL);
INSERT INTO `cms_logs` VALUES (8, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/menu_management/edit-save/3', 'Update data Informasi at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>sorting</td><td></td><td></td></tr></tbody></table>', 1, '2020-07-07 01:47:12', NULL);
INSERT INTO `cms_logs` VALUES (9, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/logout', 'admin@crudbooster.com logout', '', 1, '2020-07-07 01:47:43', NULL);
INSERT INTO `cms_logs` VALUES (10, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/login', 'admin@crudbooster.com login with IP Address 127.0.0.1', '', 1, '2020-07-07 02:04:00', NULL);
INSERT INTO `cms_logs` VALUES (11, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/add-save', 'Add New Data Struktur Organisasi at Menu Management', '', 1, '2020-07-07 02:04:44', NULL);
INSERT INTO `cms_logs` VALUES (12, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/4', 'Update data Struktur Organisasi at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>parent_id</td><td>2</td><td></td></tr></tbody></table>', 1, '2020-07-07 02:05:03', NULL);
INSERT INTO `cms_logs` VALUES (13, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/add-save', 'Add New Data Sambutan Direktur at Menu Management', '', 1, '2020-07-07 02:42:19', NULL);
INSERT INTO `cms_logs` VALUES (14, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/5', 'Update data Sambutan Direktur at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>sorting</td><td></td><td></td></tr></tbody></table>', 1, '2020-07-07 02:42:30', NULL);
INSERT INTO `cms_logs` VALUES (15, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/add-save', 'Add New Data Tupoksi at Menu Management', '', 1, '2020-07-07 02:42:50', NULL);
INSERT INTO `cms_logs` VALUES (16, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/6', 'Update data Tupoksi at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>sorting</td><td></td><td></td></tr></tbody></table>', 1, '2020-07-07 02:42:57', NULL);
INSERT INTO `cms_logs` VALUES (17, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/add-save', 'Add New Data Tindaklanjut at Menu Management', '', 1, '2020-07-07 02:52:57', NULL);
INSERT INTO `cms_logs` VALUES (18, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/7', 'Update data Tindaklanjut at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>icon</td><td></td><td></td></tr><tr><td>parent_id</td><td>3</td><td></td></tr></tbody></table>', 1, '2020-07-07 02:53:15', NULL);
INSERT INTO `cms_logs` VALUES (19, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/1', 'Update data Beranda at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody></tbody></table>', 1, '2020-07-07 02:53:23', NULL);
INSERT INTO `cms_logs` VALUES (20, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/2', 'Update data Profil at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>sorting</td><td>2</td><td></td></tr></tbody></table>', 1, '2020-07-07 02:53:30', NULL);
INSERT INTO `cms_logs` VALUES (21, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/4', 'Update data Struktur Organisasi at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>parent_id</td><td>2</td><td></td></tr></tbody></table>', 1, '2020-07-07 02:53:36', NULL);
INSERT INTO `cms_logs` VALUES (22, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/5', 'Update data Sambutan Direktur at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>parent_id</td><td>2</td><td></td></tr><tr><td>sorting</td><td>2</td><td></td></tr></tbody></table>', 1, '2020-07-07 02:53:44', NULL);
INSERT INTO `cms_logs` VALUES (23, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/6', 'Update data Tupoksi at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>parent_id</td><td>2</td><td></td></tr><tr><td>sorting</td><td>3</td><td></td></tr></tbody></table>', 1, '2020-07-07 02:53:52', NULL);
INSERT INTO `cms_logs` VALUES (24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/3', 'Update data Informasi at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>sorting</td><td>3</td><td></td></tr></tbody></table>', 1, '2020-07-07 02:54:01', NULL);
INSERT INTO `cms_logs` VALUES (25, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/add-save', 'Add New Data Kontak at Menu Management', '', 1, '2020-07-07 02:55:35', NULL);
INSERT INTO `cms_logs` VALUES (26, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/8', 'Update data Kontak at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>icon</td><td>fa fa-road</td><td>fa fa-phone-square</td></tr><tr><td>sorting</td><td></td><td></td></tr></tbody></table>', 1, '2020-07-07 02:55:56', NULL);
INSERT INTO `cms_logs` VALUES (27, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/add-save', 'Add New Data Kritik dan Saran at Menu Management', '', 1, '2020-07-07 02:57:06', NULL);
INSERT INTO `cms_logs` VALUES (28, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/9', 'Update data Kritik dan Saran at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>sorting</td><td>6</td><td></td></tr></tbody></table>', 1, '2020-07-07 02:57:28', NULL);
INSERT INTO `cms_logs` VALUES (29, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/users/add-save', 'Add New Data perusahaan at Users Management', '', 1, '2020-07-07 04:34:31', NULL);
INSERT INTO `cms_logs` VALUES (30, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/login', 'perusahaan@email.com login with IP Address 127.0.0.1', '', 2, '2020-07-07 04:34:57', NULL);
INSERT INTO `cms_logs` VALUES (31, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/7', 'Update data Tindaklanjut at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>icon</td><td></td><td>fa fa-file-text-o</td></tr><tr><td>sorting</td><td>4</td><td></td></tr></tbody></table>', 1, '2020-07-07 04:36:21', NULL);
INSERT INTO `cms_logs` VALUES (32, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/add-save', 'Add New Data Pelaporan at Menu Management', '', 1, '2020-07-07 04:37:00', NULL);
INSERT INTO `cms_logs` VALUES (33, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/10', 'Update data Pelaporan at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>sorting</td><td></td><td></td></tr></tbody></table>', 1, '2020-07-07 04:37:09', NULL);
INSERT INTO `cms_logs` VALUES (34, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/10', 'Update data Pelaporan at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>parent_id</td><td>7</td><td></td></tr></tbody></table>', 1, '2020-07-07 04:37:32', NULL);
INSERT INTO `cms_logs` VALUES (35, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/add-save', 'Add New Data Approval at Menu Management', '', 1, '2020-07-07 04:37:53', NULL);
INSERT INTO `cms_logs` VALUES (36, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0', 'http://127.0.0.1:8000/admin/menu_management/edit-save/11', 'Update data Approval at Menu Management', '<table class=\"table table-striped\"><thead><tr><th>Key</th><th>Old Value</th><th>New Value</th></thead><tbody><tr><td>sorting</td><td></td><td></td></tr></tbody></table>', 1, '2020-07-07 04:38:04', NULL);
INSERT INTO `cms_logs` VALUES (37, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/logout', 'perusahaan@email.com logout', '', 2, '2020-07-07 05:28:04', NULL);
INSERT INTO `cms_logs` VALUES (38, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/login', 'perusahaan@email.com login with IP Address 127.0.0.1', '', 2, '2020-07-07 05:32:04', NULL);
INSERT INTO `cms_logs` VALUES (39, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', 'http://127.0.0.1:8000/admin/logout', 'perusahaan@email.com logout', '', 2, '2020-07-07 05:32:09', NULL);

-- ----------------------------
-- Table structure for cms_menus
-- ----------------------------
DROP TABLE IF EXISTS `cms_menus`;
CREATE TABLE `cms_menus`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'url',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `parent_id` int(11) NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_dashboard` tinyint(1) NOT NULL DEFAULT 0,
  `id_cms_privileges` int(11) NULL DEFAULT NULL,
  `sorting` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_menus
-- ----------------------------
INSERT INTO `cms_menus` VALUES (1, 'Beranda', 'URL', '/', 'normal', 'fa fa-home', 0, 1, 0, 1, 1, '2020-07-07 01:38:38', '2020-07-07 02:53:23');
INSERT INTO `cms_menus` VALUES (2, 'Profil', 'URL', '#', 'normal', 'fa fa-user', 0, 1, 0, 1, 2, '2020-07-07 01:39:28', '2020-07-07 02:53:29');
INSERT INTO `cms_menus` VALUES (3, 'Informasi', 'URL', '#', 'normal', 'fa fa-info-circle', 0, 1, 0, 1, 3, '2020-07-07 01:47:04', '2020-07-07 02:54:01');
INSERT INTO `cms_menus` VALUES (4, 'Struktur Organisasi', 'URL', '#', 'normal', 'fa fa-th-list', 2, 1, 0, 1, 1, '2020-07-07 02:04:44', '2020-07-07 02:53:36');
INSERT INTO `cms_menus` VALUES (5, 'Sambutan Direktur', 'URL', '#', 'normal', 'fa fa-th-list', 2, 1, 0, 1, 2, '2020-07-07 02:42:19', '2020-07-07 02:53:44');
INSERT INTO `cms_menus` VALUES (6, 'Tupoksi', 'URL', '#', 'normal', 'fa fa-th-list', 2, 1, 0, 1, 3, '2020-07-07 02:42:50', '2020-07-07 02:53:51');
INSERT INTO `cms_menus` VALUES (7, 'Tindaklanjut', 'URL', '#', 'normal', 'fa fa-file-text-o', 0, 1, 0, 1, 4, '2020-07-07 02:52:57', '2020-07-07 04:36:21');
INSERT INTO `cms_menus` VALUES (8, 'Kontak', 'URL', '#', 'normal', 'fa fa-phone-square', 0, 1, 0, 1, 5, '2020-07-07 02:55:34', '2020-07-07 02:55:56');
INSERT INTO `cms_menus` VALUES (9, 'Kritik dan Saran', 'URL', '#', 'normal', 'fa fa-comments-o', 0, 1, 0, 1, 6, '2020-07-07 02:57:06', '2020-07-07 02:57:28');
INSERT INTO `cms_menus` VALUES (10, 'Pelaporan', 'URL', '#', 'normal', 'fa fa-file-text-o', 7, 1, 0, 1, 1, '2020-07-07 04:37:00', '2020-07-07 04:37:32');
INSERT INTO `cms_menus` VALUES (11, 'Approval', 'URL', '#', 'normal', 'fa fa-file-text-o', 7, 1, 0, 1, 2, '2020-07-07 04:37:53', '2020-07-07 04:38:04');

-- ----------------------------
-- Table structure for cms_menus_privileges
-- ----------------------------
DROP TABLE IF EXISTS `cms_menus_privileges`;
CREATE TABLE `cms_menus_privileges`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_cms_menus` int(11) NULL DEFAULT NULL,
  `id_cms_privileges` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_menus_privileges
-- ----------------------------
INSERT INTO `cms_menus_privileges` VALUES (29, 1, 3);
INSERT INTO `cms_menus_privileges` VALUES (30, 1, 1);
INSERT INTO `cms_menus_privileges` VALUES (31, 1, 2);
INSERT INTO `cms_menus_privileges` VALUES (32, 2, 3);
INSERT INTO `cms_menus_privileges` VALUES (33, 2, 1);
INSERT INTO `cms_menus_privileges` VALUES (34, 2, 2);
INSERT INTO `cms_menus_privileges` VALUES (35, 4, 3);
INSERT INTO `cms_menus_privileges` VALUES (36, 4, 1);
INSERT INTO `cms_menus_privileges` VALUES (37, 4, 2);
INSERT INTO `cms_menus_privileges` VALUES (38, 5, 3);
INSERT INTO `cms_menus_privileges` VALUES (39, 5, 1);
INSERT INTO `cms_menus_privileges` VALUES (40, 5, 2);
INSERT INTO `cms_menus_privileges` VALUES (41, 6, 3);
INSERT INTO `cms_menus_privileges` VALUES (42, 6, 1);
INSERT INTO `cms_menus_privileges` VALUES (43, 6, 2);
INSERT INTO `cms_menus_privileges` VALUES (44, 3, 3);
INSERT INTO `cms_menus_privileges` VALUES (45, 3, 1);
INSERT INTO `cms_menus_privileges` VALUES (46, 3, 2);
INSERT INTO `cms_menus_privileges` VALUES (49, 8, 3);
INSERT INTO `cms_menus_privileges` VALUES (50, 8, 1);
INSERT INTO `cms_menus_privileges` VALUES (51, 8, 2);
INSERT INTO `cms_menus_privileges` VALUES (55, 9, 3);
INSERT INTO `cms_menus_privileges` VALUES (56, 9, 1);
INSERT INTO `cms_menus_privileges` VALUES (57, 9, 2);
INSERT INTO `cms_menus_privileges` VALUES (58, 7, 3);
INSERT INTO `cms_menus_privileges` VALUES (59, 7, 1);
INSERT INTO `cms_menus_privileges` VALUES (65, 10, 3);
INSERT INTO `cms_menus_privileges` VALUES (66, 10, 1);
INSERT INTO `cms_menus_privileges` VALUES (67, NULL, 3);
INSERT INTO `cms_menus_privileges` VALUES (68, NULL, 1);
INSERT INTO `cms_menus_privileges` VALUES (69, NULL, 2);
INSERT INTO `cms_menus_privileges` VALUES (70, 11, 3);
INSERT INTO `cms_menus_privileges` VALUES (71, 11, 1);

-- ----------------------------
-- Table structure for cms_moduls
-- ----------------------------
DROP TABLE IF EXISTS `cms_moduls`;
CREATE TABLE `cms_moduls`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `table_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `controller` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `is_protected` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_moduls
-- ----------------------------
INSERT INTO `cms_moduls` VALUES (1, 'Notifications', 'fa fa-cog', 'notifications', 'cms_notifications', 'NotificationsController', 1, 1, '2020-07-06 22:43:50', NULL, NULL);
INSERT INTO `cms_moduls` VALUES (2, 'Privileges', 'fa fa-cog', 'privileges', 'cms_privileges', 'PrivilegesController', 1, 1, '2020-07-06 22:43:50', NULL, NULL);
INSERT INTO `cms_moduls` VALUES (3, 'Privileges Roles', 'fa fa-cog', 'privileges_roles', 'cms_privileges_roles', 'PrivilegesRolesController', 1, 1, '2020-07-06 22:43:50', NULL, NULL);
INSERT INTO `cms_moduls` VALUES (4, 'Users Management', 'fa fa-users', 'users', 'cms_users', 'AdminCmsUsersController', 0, 1, '2020-07-06 22:43:50', NULL, NULL);
INSERT INTO `cms_moduls` VALUES (5, 'Settings', 'fa fa-cog', 'settings', 'cms_settings', 'SettingsController', 1, 1, '2020-07-06 22:43:50', NULL, NULL);
INSERT INTO `cms_moduls` VALUES (6, 'Module Generator', 'fa fa-database', 'module_generator', 'cms_moduls', 'ModulsController', 1, 1, '2020-07-06 22:43:50', NULL, NULL);
INSERT INTO `cms_moduls` VALUES (7, 'Menu Management', 'fa fa-bars', 'menu_management', 'cms_menus', 'MenusController', 1, 1, '2020-07-06 22:43:50', NULL, NULL);
INSERT INTO `cms_moduls` VALUES (8, 'Email Templates', 'fa fa-envelope-o', 'email_templates', 'cms_email_templates', 'EmailTemplatesController', 1, 1, '2020-07-06 22:43:50', NULL, NULL);
INSERT INTO `cms_moduls` VALUES (9, 'Statistic Builder', 'fa fa-dashboard', 'statistic_builder', 'cms_statistics', 'StatisticBuilderController', 1, 1, '2020-07-06 22:43:50', NULL, NULL);
INSERT INTO `cms_moduls` VALUES (10, 'API Generator', 'fa fa-cloud-download', 'api_generator', '', 'ApiCustomController', 1, 1, '2020-07-06 22:43:50', NULL, NULL);
INSERT INTO `cms_moduls` VALUES (11, 'Log User Access', 'fa fa-flag-o', 'logs', 'cms_logs', 'LogsController', 1, 1, '2020-07-06 22:43:50', NULL, NULL);

-- ----------------------------
-- Table structure for cms_notifications
-- ----------------------------
DROP TABLE IF EXISTS `cms_notifications`;
CREATE TABLE `cms_notifications`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_cms_users` int(11) NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `is_read` tinyint(1) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cms_privileges
-- ----------------------------
DROP TABLE IF EXISTS `cms_privileges`;
CREATE TABLE `cms_privileges`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `is_superadmin` tinyint(1) NULL DEFAULT NULL,
  `theme_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_privileges
-- ----------------------------
INSERT INTO `cms_privileges` VALUES (1, 'Super Administrator', 1, 'skin-red', '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_privileges` VALUES (2, 'user', 0, 'skin-green-light', NULL, NULL);
INSERT INTO `cms_privileges` VALUES (3, 'perusahaan', 0, 'skin-red-light', NULL, NULL);

-- ----------------------------
-- Table structure for cms_privileges_roles
-- ----------------------------
DROP TABLE IF EXISTS `cms_privileges_roles`;
CREATE TABLE `cms_privileges_roles`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_visible` tinyint(1) NULL DEFAULT NULL,
  `is_create` tinyint(1) NULL DEFAULT NULL,
  `is_read` tinyint(1) NULL DEFAULT NULL,
  `is_edit` tinyint(1) NULL DEFAULT NULL,
  `is_delete` tinyint(1) NULL DEFAULT NULL,
  `id_cms_privileges` int(11) NULL DEFAULT NULL,
  `id_cms_moduls` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_privileges_roles
-- ----------------------------
INSERT INTO `cms_privileges_roles` VALUES (1, 1, 0, 0, 0, 0, 1, 1, '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_privileges_roles` VALUES (2, 1, 1, 1, 1, 1, 1, 2, '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_privileges_roles` VALUES (3, 0, 1, 1, 1, 1, 1, 3, '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_privileges_roles` VALUES (4, 1, 1, 1, 1, 1, 1, 4, '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_privileges_roles` VALUES (5, 1, 1, 1, 1, 1, 1, 5, '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_privileges_roles` VALUES (6, 1, 1, 1, 1, 1, 1, 6, '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_privileges_roles` VALUES (7, 1, 1, 1, 1, 1, 1, 7, '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_privileges_roles` VALUES (8, 1, 1, 1, 1, 1, 1, 8, '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_privileges_roles` VALUES (9, 1, 1, 1, 1, 1, 1, 9, '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_privileges_roles` VALUES (10, 1, 1, 1, 1, 1, 1, 10, '2020-07-06 22:43:50', NULL);
INSERT INTO `cms_privileges_roles` VALUES (11, 1, 0, 1, 0, 1, 1, 11, '2020-07-06 22:43:50', NULL);

-- ----------------------------
-- Table structure for cms_settings
-- ----------------------------
DROP TABLE IF EXISTS `cms_settings`;
CREATE TABLE `cms_settings`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `content_input_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `dataenum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `helper` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `group_setting` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_settings
-- ----------------------------
INSERT INTO `cms_settings` VALUES (1, 'login_background_color', NULL, 'text', NULL, 'Input hexacode', '2020-07-06 22:43:50', NULL, 'Login Register Style', 'Login Background Color');
INSERT INTO `cms_settings` VALUES (2, 'login_font_color', NULL, 'text', NULL, 'Input hexacode', '2020-07-06 22:43:50', NULL, 'Login Register Style', 'Login Font Color');
INSERT INTO `cms_settings` VALUES (3, 'login_background_image', NULL, 'upload_image', NULL, NULL, '2020-07-06 22:43:50', NULL, 'Login Register Style', 'Login Background Image');
INSERT INTO `cms_settings` VALUES (4, 'email_sender', 'support@crudbooster.com', 'text', NULL, NULL, '2020-07-06 22:43:50', NULL, 'Email Setting', 'Email Sender');
INSERT INTO `cms_settings` VALUES (5, 'smtp_driver', 'mail', 'select', 'smtp,mail,sendmail', NULL, '2020-07-06 22:43:50', NULL, 'Email Setting', 'Mail Driver');
INSERT INTO `cms_settings` VALUES (6, 'smtp_host', '', 'text', NULL, NULL, '2020-07-06 22:43:50', NULL, 'Email Setting', 'SMTP Host');
INSERT INTO `cms_settings` VALUES (7, 'smtp_port', '25', 'text', NULL, 'default 25', '2020-07-06 22:43:50', NULL, 'Email Setting', 'SMTP Port');
INSERT INTO `cms_settings` VALUES (8, 'smtp_username', '', 'text', NULL, NULL, '2020-07-06 22:43:50', NULL, 'Email Setting', 'SMTP Username');
INSERT INTO `cms_settings` VALUES (9, 'smtp_password', '', 'text', NULL, NULL, '2020-07-06 22:43:50', NULL, 'Email Setting', 'SMTP Password');
INSERT INTO `cms_settings` VALUES (10, 'appname', 'RENAKSI1717', 'text', NULL, NULL, '2020-07-06 22:43:50', NULL, 'Application Setting', 'Application Name');
INSERT INTO `cms_settings` VALUES (11, 'default_paper_size', 'Legal', 'text', NULL, 'Paper size, ex : A4, Legal, etc', '2020-07-06 22:43:50', NULL, 'Application Setting', 'Default Paper Print Size');
INSERT INTO `cms_settings` VALUES (12, 'logo', 'uploads/2020-07/a6a22f685480ff0a2c49c866d01439c6.png', 'upload_image', NULL, NULL, '2020-07-06 22:43:50', NULL, 'Application Setting', 'Logo');
INSERT INTO `cms_settings` VALUES (13, 'favicon', 'uploads/2020-07/631c7c377d8e764bfe046d3ad58ea1a2.png', 'upload_image', NULL, NULL, '2020-07-06 22:43:50', NULL, 'Application Setting', 'Favicon');
INSERT INTO `cms_settings` VALUES (14, 'api_debug_mode', 'true', 'select', 'true,false', NULL, '2020-07-06 22:43:50', NULL, 'Application Setting', 'API Debug Mode');
INSERT INTO `cms_settings` VALUES (15, 'google_api_key', NULL, 'text', NULL, NULL, '2020-07-06 22:43:50', NULL, 'Application Setting', 'Google API Key');
INSERT INTO `cms_settings` VALUES (16, 'google_fcm_key', NULL, 'text', NULL, NULL, '2020-07-06 22:43:50', NULL, 'Application Setting', 'Google FCM Key');

-- ----------------------------
-- Table structure for cms_statistic_components
-- ----------------------------
DROP TABLE IF EXISTS `cms_statistic_components`;
CREATE TABLE `cms_statistic_components`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_cms_statistics` int(11) NULL DEFAULT NULL,
  `componentID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `component_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `area_name` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `sorting` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cms_statistics
-- ----------------------------
DROP TABLE IF EXISTS `cms_statistics`;
CREATE TABLE `cms_statistics`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cms_users
-- ----------------------------
DROP TABLE IF EXISTS `cms_users`;
CREATE TABLE `cms_users`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `id_cms_privileges` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_users
-- ----------------------------
INSERT INTO `cms_users` VALUES (1, 'Super Admin', NULL, 'admin@crudbooster.com', '$2y$10$jwwi161tsP/YdrsAOWAFa.Lu4QvCtRf1wmylhjVZWqZfmRlypidga', 1, '2020-07-06 22:43:50', NULL, 'Active');
INSERT INTO `cms_users` VALUES (2, 'perusahaan', 'uploads/1/2020-07/logo_admin.png', 'perusahaan@email.com', '$2y$10$uJIaq7Rs2.AABrR0IQ.2xuUx16Xt8af4mbSZmoAbbyk9VXYBaPeH6', 3, '2020-07-07 04:34:31', NULL, NULL);

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '2016_08_07_145904_add_table_cms_apicustom', 1);
INSERT INTO `migrations` VALUES (2, '2016_08_07_150834_add_table_cms_dashboard', 1);
INSERT INTO `migrations` VALUES (3, '2016_08_07_151210_add_table_cms_logs', 1);
INSERT INTO `migrations` VALUES (4, '2016_08_07_151211_add_details_cms_logs', 1);
INSERT INTO `migrations` VALUES (5, '2016_08_07_152014_add_table_cms_privileges', 1);
INSERT INTO `migrations` VALUES (6, '2016_08_07_152214_add_table_cms_privileges_roles', 1);
INSERT INTO `migrations` VALUES (7, '2016_08_07_152320_add_table_cms_settings', 1);
INSERT INTO `migrations` VALUES (8, '2016_08_07_152421_add_table_cms_users', 1);
INSERT INTO `migrations` VALUES (9, '2016_08_07_154624_add_table_cms_menus_privileges', 1);
INSERT INTO `migrations` VALUES (10, '2016_08_07_154624_add_table_cms_moduls', 1);
INSERT INTO `migrations` VALUES (11, '2016_08_17_225409_add_status_cms_users', 1);
INSERT INTO `migrations` VALUES (12, '2016_08_20_125418_add_table_cms_notifications', 1);
INSERT INTO `migrations` VALUES (13, '2016_09_04_033706_add_table_cms_email_queues', 1);
INSERT INTO `migrations` VALUES (14, '2016_09_16_035347_add_group_setting', 1);
INSERT INTO `migrations` VALUES (15, '2016_09_16_045425_add_label_setting', 1);
INSERT INTO `migrations` VALUES (16, '2016_09_17_104728_create_nullable_cms_apicustom', 1);
INSERT INTO `migrations` VALUES (17, '2016_10_01_141740_add_method_type_apicustom', 1);
INSERT INTO `migrations` VALUES (18, '2016_10_01_141846_add_parameters_apicustom', 1);
INSERT INTO `migrations` VALUES (19, '2016_10_01_141934_add_responses_apicustom', 1);
INSERT INTO `migrations` VALUES (20, '2016_10_01_144826_add_table_apikey', 1);
INSERT INTO `migrations` VALUES (21, '2016_11_14_141657_create_cms_menus', 1);
INSERT INTO `migrations` VALUES (22, '2016_11_15_132350_create_cms_email_templates', 1);
INSERT INTO `migrations` VALUES (23, '2016_11_15_190410_create_cms_statistics', 1);
INSERT INTO `migrations` VALUES (24, '2016_11_17_102740_create_cms_statistic_components', 1);
INSERT INTO `migrations` VALUES (25, '2017_06_06_164501_add_deleted_at_cms_moduls', 1);

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `category_id` int(11) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `seo_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `excerpt` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `meta_keywords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `status` enum('PUBLISHED','DRAFT','PENDING') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `posts_slug_unique`(`slug`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES (1, 0, NULL, 'Lorem Ipsum Post', NULL, 'This is the excerpt for the Lorem Ipsum Post', '<p>This is the body of the lorem ipsum post</p>', 'posts/post1.jpg', 'lorem-ipsum-post', 'This is the meta description', 'keyword1, keyword2, keyword3', 'PUBLISHED', 0, '2020-06-18 23:27:15', '2020-06-18 23:27:15');
INSERT INTO `posts` VALUES (2, 0, NULL, 'My Sample Post', NULL, 'This is the excerpt for the sample Post', '<p>This is the body for the sample post, which includes the body.</p>\n                <h2>We can use all kinds of format!</h2>\n                <p>And include a bunch of other stuff.</p>', 'posts/post2.jpg', 'my-sample-post', 'Meta Description for sample post', 'keyword1, keyword2, keyword3', 'PUBLISHED', 0, '2020-06-18 23:27:15', '2020-06-18 23:27:15');
INSERT INTO `posts` VALUES (3, 0, NULL, 'Latest Post', NULL, 'This is the excerpt for the latest post', '<p>This is the body for the latest post</p>', 'posts/post3.jpg', 'latest-post', 'This is the meta description', 'keyword1, keyword2, keyword3', 'PUBLISHED', 0, '2020-06-18 23:27:15', '2020-06-18 23:27:15');
INSERT INTO `posts` VALUES (4, 0, NULL, 'Yarr Post', NULL, 'Reef sails nipperkin bring a spring upon her cable coffer jury mast spike marooned Pieces of Eight poop deck pillage. Clipper driver coxswain galleon hempen halter come about pressgang gangplank boatswain swing the lead. Nipperkin yard skysail swab lanyard Blimey bilge water ho quarter Buccaneer.', '<p>Swab deadlights Buccaneer fire ship square-rigged dance the hempen jig weigh anchor cackle fruit grog furl. Crack Jennys tea cup chase guns pressgang hearties spirits hogshead Gold Road six pounders fathom measured fer yer chains. Main sheet provost come about trysail barkadeer crimp scuttle mizzenmast brig plunder.</p>\n<p>Mizzen league keelhaul galleon tender cog chase Barbary Coast doubloon crack Jennys tea cup. Blow the man down lugsail fire ship pinnace cackle fruit line warp Admiral of the Black strike colors doubloon. Tackle Jack Ketch come about crimp rum draft scuppers run a shot across the bow haul wind maroon.</p>\n<p>Interloper heave down list driver pressgang holystone scuppers tackle scallywag bilged on her anchor. Jack Tar interloper draught grapple mizzenmast hulk knave cable transom hogshead. Gaff pillage to go on account grog aft chase guns piracy yardarm knave clap of thunder.</p>', 'posts/post4.jpg', 'yarr-post', 'this be a meta descript', 'keyword1, keyword2, keyword3', 'PUBLISHED', 0, '2020-06-18 23:27:15', '2020-06-18 23:27:15');

SET FOREIGN_KEY_CHECKS = 1;
