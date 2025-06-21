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
    "program" TEXT,
    "position" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("email", "ext_name", "first_name", "id", "is_deleted", "last_name", "middle_name", "password", "position", "program", "role", "standing", "tel_number") SELECT "email", "ext_name", "first_name", "id", coalesce("is_deleted", false) AS "is_deleted", "last_name", "middle_name", "password", "position", "program", "role", "standing", "tel_number" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
