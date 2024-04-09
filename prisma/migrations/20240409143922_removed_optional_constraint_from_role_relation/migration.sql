/*
  Warnings:

  - Made the column `user_role_id` on table `um_users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "um_users" DROP CONSTRAINT "um_users_user_role_id_fkey";

-- AlterTable
ALTER TABLE "um_users" ALTER COLUMN "user_role_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "um_users" ADD CONSTRAINT "um_users_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "um_roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
