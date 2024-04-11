-- AlterTable
ALTER TABLE "um_users" ADD CONSTRAINT "um_users_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "um_settings" (
    "setting_key" VARCHAR(250) NOT NULL,
    "setting_value" INTEGER NOT NULL,
    "setting_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "setting_updated_at" TIMESTAMP(3) NOT NULL,
    "setting_deleted_at" TIMESTAMP(3),

    CONSTRAINT "um_settings_pkey" PRIMARY KEY ("setting_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "um_settings_setting_key_key" ON "um_settings"("setting_key");
