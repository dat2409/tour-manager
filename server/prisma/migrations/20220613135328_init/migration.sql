/*
  Warnings:

  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `is_reviewed` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `policy` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Destination` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `desc` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Image` MODIFY `url` VARCHAR(191) NULL,
    MODIFY `destinationID` INTEGER NULL;

-- AlterTable
ALTER TABLE `Invoice` MODIFY `orderId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `address`,
    DROP COLUMN `email`,
    DROP COLUMN `fullName`,
    DROP COLUMN `is_reviewed`,
    DROP COLUMN `phoneNumber`,
    DROP COLUMN `status`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `hasDeparted` INTEGER NULL,
    ADD COLUMN `isDeposited` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isReviewed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `note` LONGTEXT NULL,
    MODIFY `quantity` INTEGER NULL,
    MODIFY `totalPrice` DOUBLE NULL,
    MODIFY `tourId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Review` MODIFY `email` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `star` INTEGER NULL,
    MODIFY `comment` LONGTEXT NULL,
    MODIFY `tourId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Service` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `image` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL,
    MODIFY `fullName` VARCHAR(191) NULL,
    MODIFY `phoneNumber` VARCHAR(191) NULL,
    MODIFY `gender` VARCHAR(191) NULL,
    MODIFY `role` ENUM('STAFF', 'MANAGER', 'DRIVER', 'TOUR_GUIDE') NOT NULL DEFAULT 'STAFF',
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `identityNumber` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `policy`;

-- CreateTable
CREATE TABLE `Guess` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `identityNumber` VARCHAR(191) NULL,
    `insuranceCardNumber` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `orderId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Policy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Guess` ADD CONSTRAINT `Guess_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
