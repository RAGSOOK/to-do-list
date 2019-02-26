CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "description" varchar(80) not null,
    "status" varchar(1) DEFAULT 'N'
);

INSERT INTO tasks (description)
VALUES ('Walk the Dog.'),
	  ('Do the Laundry.'),
	  ('File the Taxes.');