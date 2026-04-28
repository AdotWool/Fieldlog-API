-- CreateTable
CREATE TABLE "_FieldlogToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FieldlogToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FieldlogToTag_B_index" ON "_FieldlogToTag"("B");

-- AddForeignKey
ALTER TABLE "_FieldlogToTag" ADD CONSTRAINT "_FieldlogToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FieldlogToTag" ADD CONSTRAINT "_FieldlogToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
