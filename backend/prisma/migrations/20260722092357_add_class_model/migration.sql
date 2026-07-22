/*
  Warnings:

  - Added the required column `endTime` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ClassStatus" ADD VALUE 'COMPLETED';

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_studioId_fkey";

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
