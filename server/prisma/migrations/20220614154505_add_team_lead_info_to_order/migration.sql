-- AlterTable
ALTER TABLE `Order` ADD COLUMN `teamLeadEmail` VARCHAR(191) NULL,
    ADD COLUMN `teamLeadName` VARCHAR(191) NULL,
    ADD COLUMN `teamLeadPhoneNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `dob` DATE NULL;
