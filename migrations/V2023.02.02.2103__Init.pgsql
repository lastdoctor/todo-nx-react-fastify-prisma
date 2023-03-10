CREATE TABLE IF NOT EXISTS "Users"
(
    id       SERIAL       NOT NULL,
    name     VARCHAR(255) NOT NULL,
    password VARCHAR      NOT NULL,
    email    VARCHAR(255) NOT NULL,
    CONSTRAINT "PK_USERS" PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS "IDX_USERS__NAME" ON "Users" (name);
CREATE INDEX IF NOT EXISTS "IDX_USERS__EMAIL" ON "Users" (email);


CREATE TYPE "TaskStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'DONE');

CREATE TABLE IF NOT EXISTS "Tasks"
(
    id          SERIAL                      NOT NULL,
    title       JSONB                       NOT NULL,
    description JSONB                       NOT NULL,
    status      "TaskStatus" DEFAULT 'OPEN' NOT NULL,
    userId      INTEGER                     NOT NULL,
    CONSTRAINT "PK_TASKS" PRIMARY KEY (id),
    CONSTRAINT "FK_TASKS__USER_ID" FOREIGN KEY (userId) REFERENCES "Users" ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "IDX_TASKS__TITLE" ON "Tasks" USING GIN (title jsonb_path_ops);

CREATE INDEX IF NOT EXISTS "IDX_TASKS__DESCRIPTION" ON "Tasks" USING GIN (description jsonb_path_ops);
