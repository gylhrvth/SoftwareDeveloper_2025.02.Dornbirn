
INSERT INTO todos (todo_title, todo_completed, todo_priority)
VALUES ('Joggen gehen', 1, 'medium');

INSERT INTO todos (todo_title, todo_completed, todo_created, todo_priority)
VALUES ('Go shopping', 0, '2025-05-14 08:30:00', 'medium');

INSERT INTO todos (todo_title, todo_completed, todo_created, todo_priority, todo_description)
VALUES ('Gym Workout', 1, '2025-05-14 12:30:00', 'high', 'Stretching and foam rolling');

INSERT INTO todos (todo_title, todo_completed, todo_created, todo_priority, todo_description)
VALUES ('Buy a new Ferrari', 0, '2025-05-14 09:30:00', 'low', 'Contact dealer and buy');

INSERT INTO todos (todo_title, todo_completed, todo_created, todo_priority)
VALUES ('Buy a horse', 0, '2025-05-14 10:30:00', 'low');

UPDATE todos
SET todo_priority = 'low'
WHERE todo_id = 2;

UPDATE todos
SET todo_description = 'Buy a milk and bread'
WHERE todo_id = 2;

SELECT todo_id, todo_title, todo_completed, todo_priority, todo_created
FROM todos;

/*-------------------------------------*/

DELETE FROM todos WHERE todo_id = 1;

DELETE FROM todos;

/*-------------------------------------*/

ALTER TABLE todos AUTO_INCREMENT = 1;

SELECT *
FROM todos;