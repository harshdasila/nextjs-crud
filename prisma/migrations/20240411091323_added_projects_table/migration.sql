-- CreateTable
CREATE TABLE "um_user_projects" (
    "project_id" SERIAL NOT NULL,
    "project_name" VARCHAR(250) NOT NULL,
    "project_slug" VARCHAR(250) NOT NULL,
    "project_description" TEXT NOT NULL,
    "project_created_at" TIMESTAMP(3) NOT NULL,
    "project_deleted_at" TIMESTAMP(3),
    "project_updated_at" TIMESTAMP(3) NOT NULL,
    "user_project_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "um_user_projects_project_id_key" ON "um_user_projects"("project_id");

-- CreateIndex
CREATE INDEX "um_user_projects_project_id_idx" ON "um_user_projects"("project_id");

-- AddForeignKey
ALTER TABLE "um_user_projects" ADD CONSTRAINT "um_user_projects_user_project_id_fkey" FOREIGN KEY ("user_project_id") REFERENCES "um_users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
