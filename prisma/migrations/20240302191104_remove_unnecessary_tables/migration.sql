/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `amount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `avm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brokerage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `building` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `calculations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `geo_id_v4` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `home_equity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `property` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `summary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vintage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "amount" DROP CONSTRAINT "amount_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "avm" DROP CONSTRAINT "avm_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "building" DROP CONSTRAINT "building_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "calculations" DROP CONSTRAINT "calculations_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "geo_id_v4" DROP CONSTRAINT "geo_id_v4_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "home_equity" DROP CONSTRAINT "home_equity_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "lot" DROP CONSTRAINT "lot_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "size" DROP CONSTRAINT "size_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "summary" DROP CONSTRAINT "summary_attom_id_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_brokerage_office_key_fkey";

-- DropForeignKey
ALTER TABLE "vintage" DROP CONSTRAINT "vintage_attom_id_fkey";

-- DropTable
DROP TABLE "address";

-- DropTable
DROP TABLE "amount";

-- DropTable
DROP TABLE "avm";

-- DropTable
DROP TABLE "brokerage";

-- DropTable
DROP TABLE "building";

-- DropTable
DROP TABLE "calculations";

-- DropTable
DROP TABLE "geo_id_v4";

-- DropTable
DROP TABLE "home_equity";

-- DropTable
DROP TABLE "location";

-- DropTable
DROP TABLE "lot";

-- DropTable
DROP TABLE "property";

-- DropTable
DROP TABLE "rooms";

-- DropTable
DROP TABLE "size";

-- DropTable
DROP TABLE "summary";

-- DropTable
DROP TABLE "token";

-- DropTable
DROP TABLE "vintage";
