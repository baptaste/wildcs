BEGIN;

DROP TABLE IF EXISTS "member";

CREATE TABLE "member" (
	"id" int GENERATED ALWAYS AS IDENTITY,
	"name" text NOT NULL UNIQUE,
	"createdAt" Timestamptz NOT NULL default now(),
  "updatedAt" Timestamptz NOT NULL default now()
);

COMMIT;