-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('EMAIL', 'API');

-- CreateTable
CREATE TABLE "brokerage" (
    "brokerage_office_key" TEXT NOT NULL,
    "brokerage_email" TEXT,
    "brokerage_phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brokerage_pkey" PRIMARY KEY ("brokerage_office_key")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "brokerage_office_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "Type" "TokenType" NOT NULL,
    "email_token" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "expiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property" (
    "clip" TEXT NOT NULL,
    "v1_property_id" TEXT,
    "unparsed_address" TEXT,
    "street_name" TEXT,
    "street_number" TEXT,
    "county_or_parish" TEXT,
    "postal_code" TEXT,
    "postal_code_plus4" TEXT,
    "state_or_province" TEXT,
    "country" TEXT,
    "owner_1_name" TEXT,
    "owner_2_name" TEXT,
    "owner_property_match_score" INTEGER,
    "owner_property_match_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_pkey" PRIMARY KEY ("clip")
);

-- CreateTable
CREATE TABLE "mortgage" (
    "property_clip" TEXT NOT NULL,
    "first_mortgage_date" INTEGER,
    "last_mortgage_date" INTEGER,
    "first_release_date" INTEGER,
    "last_release_date" INTEGER,
    "standardized_county" TEXT,
    "standardized_state" TEXT,
    "mortgage_composite_transaction_id" TEXT,
    "mortgage_chronology_number" TEXT,
    "multi_or_split_parcel_code" TEXT,
    "primary_category_code" TEXT,
    "primary_category_code_description" TEXT,
    "deed_category_code" TEXT,
    "deed_category_code_description" TEXT NOT NULL,
    "amount" DECIMAL(65,30),
    "date" INTEGER,
    "recording_date" INTEGER,
    "interest_rate_type_code" TEXT,
    "interest_rate" DECIMAL(65,30),
    "loan_type_code" TEXT,
    "loan_type_code_description" TEXT,
    "document_type_code" TEXT,
    "document_type_code_description" TEXT,
    "document_number" TEXT,
    "document_book_number" TEXT,
    "document_page_number" TEXT,
    "term_code" TEXT,
    "term" INTEGER,
    "due_date" INTEGER,
    "mortgage_type_code" TEXT,
    "purpose_code" TEXT,
    "subordinate_type_code" TEXT,
    "subordinate_type_code_description" TEXT,
    "down_payment" DECIMAL(65,30),
    "lien_position" INTEGER,
    "status_indicator" TEXT,
    "release_date" INTEGER,
    "payoff_type" TEXT,
    "payoff_date" INTEGER,
    "conforming_loan_indicator" INTEGER,
    "equity_loan_indicator" INTEGER,
    "nonconforming_loan_indicator" INTEGER,
    "other_subordinate_loan_indicator" INTEGER,
    "concurrent_junior_mortgage_indicator" TEXT,
    "silent_second_mortgage_indicator" TEXT,
    "mortgage_upsell_indicator" TEXT,
    "seller_carry_back_indicator" INTEGER,
    "gse_eligible_mortgage_indicator" INTEGER,
    "planned_unit_development_rider_indicator" INTEGER,
    "multifamily_rider_indicator" INTEGER,
    "condominium_rider_indicator" INTEGER,
    "second_home_rider_indicator" INTEGER,
    "variable_rider_indicator" TEXT,
    "etal_code" TEXT,
    "ownership_rights_code" TEXT,
    "ownership_rights_code_description" TEXT,
    "relationship_type_code" TEXT,
    "relationship_type_code_description" TEXT,
    "principal_title" TEXT,
    "principal_full_name" TEXT,
    "principal_first_name" TEXT,
    "principal_last_name" TEXT,
    "lender_company_code" TEXT,
    "lender_company_name" TEXT,
    "lender_full_name" TEXT,
    "lender_last_name" TEXT,
    "lender_first_name" TEXT,
    "lender_address" TEXT,
    "lender_city" TEXT,
    "lender_state" TEXT,
    "lender_zip_code" TEXT,
    "lender_post_to_code" TEXT,
    "lender_post_to_name" TEXT,
    "title_company_name" TEXT,
    "title_company_code" TEXT,
    "loan_officer_nmls_id" DECIMAL(65,30),
    "loan_officer_nmls_name" TEXT,
    "loan_company_nmls_id1" DECIMAL(65,30),
    "loan_company_nmls_name1" TEXT,
    "loan_company_nmls_id2" DECIMAL(65,30),
    "loan_company_nmls_name2" TEXT,
    "initial_reset_date" TEXT,
    "change_interval" INTEGER,
    "frequency" TEXT,
    "calculation_change" DECIMAL(65,30),
    "maximum_interest_rate" DECIMAL(65,30),
    "index_type" TEXT,
    "change_percent_limit" DECIMAL(65,30),
    "initial_change_max_percent" DECIMAL(65,30),
    "lookback_period" INTEGER,
    "payment_change_date" INTEGER,
    "pay_option_indicator" INTEGER,
    "interest_only_indicator" INTEGER,
    "negative_amortization_indicator" INTEGER,
    "prepayment_rider_indicator" TEXT,
    "category_code" TEXT,
    "subject_transaction_recording_date" INTEGER,
    "subject_transaction_document_number" TEXT,
    "subject_transaction_document_book_number" TEXT,
    "subject_transaction_document_page_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mortgage_pkey" PRIMARY KEY ("property_clip")
);

-- CreateTable
CREATE TABLE "borrower" (
    "property_clip" TEXT NOT NULL,
    "sequence_id" INTEGER,
    "borrower_full_name" TEXT,
    "borrower_first_name" TEXT,
    "borrower_middle_initial" TEXT,
    "borrower_last_name" TEXT,
    "borrower_corporate_indicator" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "borrower_pkey" PRIMARY KEY ("property_clip")
);

-- CreateTable
CREATE TABLE "avm_report" (
    "v1_property_id" TEXT NOT NULL,
    "area_code" INTEGER,
    "date" TEXT,
    "address" TEXT,
    "avm_order_id" TEXT,
    "city" TEXT,
    "composite_property_id" TEXT,
    "corelogic_property_id" TEXT,
    "county" TEXT,
    "model" TEXT,
    "owner_name" TEXT,
    "state" TEXT,
    "confidence_score" DECIMAL(65,30),
    "estimated_value" DECIMAL(65,30),
    "forecast_standard_deviation" DECIMAL(65,30),
    "high_value" DECIMAL(65,30),
    "low_value" DECIMAL(65,30),
    "processed_date" TEXT,
    "zip" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avm_report_pkey" PRIMARY KEY ("v1_property_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brokerage_brokerage_office_key_key" ON "brokerage"("brokerage_office_key");

-- CreateIndex
CREATE UNIQUE INDEX "token_email_token_key" ON "token"("email_token");

-- CreateIndex
CREATE UNIQUE INDEX "property_clip_key" ON "property"("clip");

-- CreateIndex
CREATE UNIQUE INDEX "property_v1_property_id_key" ON "property"("v1_property_id");

-- CreateIndex
CREATE UNIQUE INDEX "avm_report_v1_property_id_key" ON "avm_report"("v1_property_id");

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_brokerage_office_key_fkey" FOREIGN KEY ("brokerage_office_key") REFERENCES "brokerage"("brokerage_office_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgage" ADD CONSTRAINT "mortgage_property_clip_fkey" FOREIGN KEY ("property_clip") REFERENCES "property"("clip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrower" ADD CONSTRAINT "borrower_property_clip_fkey" FOREIGN KEY ("property_clip") REFERENCES "mortgage"("property_clip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avm_report" ADD CONSTRAINT "avm_report_v1_property_id_fkey" FOREIGN KEY ("v1_property_id") REFERENCES "property"("v1_property_id") ON DELETE RESTRICT ON UPDATE CASCADE;
