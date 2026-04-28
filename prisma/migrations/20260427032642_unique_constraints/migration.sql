/*
  Warnings:

  - A unique constraint covering the columns `[name,user_id]` on the table `collections` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "collections_name_user_id_key" ON "collections"("name", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");
