-- CreateTable
CREATE TABLE "um_users" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(250) NOT NULL,
    "user_email" VARCHAR(250) NOT NULL,
    "user_password" VARCHAR(250) NOT NULL,
    "user_number" VARCHAR(10) NOT NULL,
    "user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_updated_at" TIMESTAMP(3) NOT NULL,
    "user_deleted_at" TIMESTAMP(3),
    "user_role_id" INTEGER DEFAULT 5
);

-- CreateTable
CREATE TABLE "um_roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(255) NOT NULL,
    "role_slug" VARCHAR(155) NOT NULL,
    "role_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_updated_at" TIMESTAMP(3) NOT NULL,
    "role_deleted_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "um_users_user_id_key" ON "um_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "um_users_user_email_key" ON "um_users"("user_email");

-- CreateIndex
CREATE INDEX "um_users_user_id_idx" ON "um_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "um_roles_role_id_key" ON "um_roles"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "um_roles_role_slug_key" ON "um_roles"("role_slug");

-- CreateIndex
CREATE INDEX "um_roles_role_id_role_slug_idx" ON "um_roles"("role_id", "role_slug");

-- AddForeignKey
ALTER TABLE "um_users" ADD CONSTRAINT "um_users_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "um_roles"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;
