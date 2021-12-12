/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `BookedTour` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `BookedTour_id_key` ON `BookedTour`(`id`);
