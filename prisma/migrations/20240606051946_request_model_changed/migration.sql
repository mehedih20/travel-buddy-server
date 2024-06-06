/*
  Warnings:

  - You are about to drop the column `tripDestination` on the `travelBuddyRequests` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `travelBuddyRequests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "travelBuddyRequests" DROP COLUMN "tripDestination",
DROP COLUMN "userEmail";
