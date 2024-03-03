-- CreateTable
CREATE TABLE "address" (
    "attom_id" INTEGER NOT NULL,
    "country" TEXT,
    "country_subd" TEXT,
    "line1" TEXT,
    "line2" TEXT,
    "locality" TEXT,
    "match_code" TEXT,
    "one_line" TEXT,
    "postal1" TEXT,
    "postal2" TEXT,
    "postal3" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "county" TEXT,
    "street_name" TEXT,
    "street_name_prefix_dir" TEXT,
    "street_name_suffix" TEXT,
    "street_name_suffix_dir" TEXT,
    "street_number" TEXT,
    "unit_number" TEXT,
    "notes" TEXT,

    CONSTRAINT "address_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "amount" (
    "attom_id" INTEGER NOT NULL,
    "scr" INTEGER,
    "value" INTEGER,
    "high" INTEGER,
    "low" INTEGER,
    "value_range" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "amount_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "avm" (
    "attom_id" INTEGER NOT NULL,
    "event_date" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avm_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "brokerage" (
    "brokerage_office_key" TEXT NOT NULL,
    "brokerage_email" TEXT,
    "brokerage_phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "brokerage_client_key" TEXT NOT NULL,
    "brokerage_name" TEXT NOT NULL,
    "brokerage_secret_key" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "brokerage_pkey" PRIMARY KEY ("brokerage_office_key")
);

-- CreateTable
CREATE TABLE "building" (
    "attom_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "building_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "calculations" (
    "attom_id" INTEGER NOT NULL,
    "per_size_unit" DECIMAL(65,30),
    "ratio_tax_amount" DECIMAL(65,30),
    "range_pct_of_value" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calculations_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "geo_id_v4" (
    "attom_id" INTEGER NOT NULL,
    "CO" TEXT,
    "CS" TEXT,
    "DB" TEXT,
    "N2" TEXT,
    "N4" TEXT,
    "PL" TEXT,
    "SB" TEXT,
    "ZI" TEXT,

    CONSTRAINT "geo_id_v4_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "home_equity" (
    "attom_id" INTEGER NOT NULL,
    "ltv" INTEGER,
    "estimated_available_equity" INTEGER,
    "estimated_lendable_equity" INTEGER,
    "first_amortized_loan_amount" INTEGER,
    "second_amortized_loan_amount" INTEGER,
    "third_amortized_loan_amount" INTEGER,
    "total_estimated_loan_balance" INTEGER,
    "record_last_updated" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "home_equity_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "location" (
    "attom_id" INTEGER NOT NULL,
    "accuracy" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "geo_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "distance" INTEGER,

    CONSTRAINT "location_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "lot" (
    "attom_id" INTEGER NOT NULL,
    "lotSize1" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lot_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "property" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "apn" TEXT NOT NULL,
    "attom_id" INTEGER NOT NULL,
    "fips" TEXT NOT NULL,

    CONSTRAINT "property_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "attom_id" INTEGER NOT NULL,
    "baths_total" DECIMAL(65,30),
    "beds" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "size" (
    "attom_id" INTEGER NOT NULL,
    "universal_size" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "size_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "summary" (
    "attom_id" INTEGER NOT NULL,
    "prop_class" TEXT,
    "prop_sub_type" TEXT,
    "prop_type" TEXT,
    "property_type" TEXT,
    "year_built" INTEGER,
    "prop_land_use" TEXT,
    "prop_indicator" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "summary_pkey" PRIMARY KEY ("attom_id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" TEXT NOT NULL,
    "brokerage_office_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "calls_used" INTEGER,
    "hashed_token" TEXT NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vintage" (
    "attom_id" INTEGER NOT NULL,
    "last_modified" TEXT,
    "pub_date" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vintage_pkey" PRIMARY KEY ("attom_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_attom_id_key" ON "address"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "amount_attom_id_key" ON "amount"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "avm_attom_id_key" ON "avm"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "brokerage_brokerage_office_key_key" ON "brokerage"("brokerage_office_key");

-- CreateIndex
CREATE UNIQUE INDEX "brokerage_brokerage_email_key" ON "brokerage"("brokerage_email");

-- CreateIndex
CREATE UNIQUE INDEX "brokerage_brokerage_client_key_key" ON "brokerage"("brokerage_client_key");

-- CreateIndex
CREATE UNIQUE INDEX "building_attom_id_key" ON "building"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "calculations_attom_id_key" ON "calculations"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "geo_id_v4_attom_id_key" ON "geo_id_v4"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "home_equity_attom_id_key" ON "home_equity"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "location_attom_id_key" ON "location"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "lot_attom_id_key" ON "lot"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_attom_id_key" ON "property"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_attom_id_key" ON "rooms"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "size_attom_id_key" ON "size"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "summary_attom_id_key" ON "summary"("attom_id");

-- CreateIndex
CREATE UNIQUE INDEX "token_id_key" ON "token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vintage_attom_id_key" ON "vintage"("attom_id");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "property"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amount" ADD CONSTRAINT "amount_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "avm"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avm" ADD CONSTRAINT "avm_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "property"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "building" ADD CONSTRAINT "building_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "property"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculations" ADD CONSTRAINT "calculations_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "avm"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geo_id_v4" ADD CONSTRAINT "geo_id_v4_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "location"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_equity" ADD CONSTRAINT "home_equity_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "property"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "property"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot" ADD CONSTRAINT "lot_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "property"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "building"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "size" ADD CONSTRAINT "size_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "building"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summary" ADD CONSTRAINT "summary_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "property"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_brokerage_office_key_fkey" FOREIGN KEY ("brokerage_office_key") REFERENCES "brokerage"("brokerage_office_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vintage" ADD CONSTRAINT "vintage_attom_id_fkey" FOREIGN KEY ("attom_id") REFERENCES "property"("attom_id") ON DELETE CASCADE ON UPDATE CASCADE;
