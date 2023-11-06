/*
  Warnings:

  - A unique constraint covering the columns `[playfab_id]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_playfab_id_key" ON "Employee"("playfab_id");
