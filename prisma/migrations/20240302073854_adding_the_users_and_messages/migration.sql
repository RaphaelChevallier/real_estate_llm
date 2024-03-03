-- CreateTable
CREATE TABLE "user_message" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_query" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_message" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "answer" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_message_id" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_message_user_id_key" ON "user_message"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ai_message_user_id_key" ON "ai_message"("user_id");
