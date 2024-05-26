/*
  Warnings:

  - Added the required column `tripDestination` to the `travelBuddyRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `travelBuddyRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "travelBuddyRequests" ADD COLUMN     "tripDestination" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;
