/*
  Warnings:

  - You are about to drop the column `userid` on the `Hotel` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "userid",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "userId" TEXT NOT NULL;
