----- MIGRATIONS -----
CREATE TABLE migrations(
  "migratedAt" TIMESTAMPTZ NOT NULL,
  "version" INT NOT NULL
);

----- PANCAKES -----
CREATE TABLE sites(
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(63) NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL
);


----- VERSION -----
INSERT INTO migrations ("migratedAt", "version") VALUES (NOW(), 1);
