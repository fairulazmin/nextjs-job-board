-- CreateTable
CREATE TABLE "jobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "locationType" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "salary" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "applicationEmail" TEXT,
    "applicationUrl" TEXT,
    "companyLogoUrl" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "jobs_slug_key" ON "jobs"("slug");
