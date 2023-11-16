-- Insert a test user with a join date
INSERT INTO users (username, password, first_name, last_name, phone, join_at)
VALUES ('testuser1', 'simplepassword', 'Test', 'User1', '1234567890', CURRENT_TIMESTAMP);

INSERT INTO users (username, password, first_name, last_name, phone, join_at)
VALUES ('testuser2', 'simplepassword', 'Test', 'User2', '0987654321', CURRENT_TIMESTAMP);

-- Insert a test message with a sent date
INSERT INTO messages (from_username, to_username, body, sent_at)
VALUES ('testuser1', 'testuser2', 'Hello from Test User 1!', CURRENT_TIMESTAMP);
