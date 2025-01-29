-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "ext_name" TEXT,
    "role" TEXT NOT NULL,
    "tel_number" TEXT,
    "standing" TEXT,
    "position" TEXT
);
INSERT INTO "new_User" ("email", "first_name", "id", "last_name", "middle_name", "password", "position", "role", "standing", "tel_number") SELECT "email", "first_name", "id", "last_name", "middle_name", "password", "position", "role", "standing", "tel_number" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
