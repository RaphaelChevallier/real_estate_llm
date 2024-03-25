-- AlterTable
ALTER TABLE "user_settings" ADD COLUMN     "strategy_parameters" JSONB DEFAULT '{"listprice-avm": 30, "subjecttoequity": 10, "seller-finance-equity": 90, "last-purchase-date-subject-to": 3, "last-purchase-date-seller-finance": 10}';
