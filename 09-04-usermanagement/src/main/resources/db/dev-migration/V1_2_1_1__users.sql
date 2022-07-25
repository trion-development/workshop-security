INSERT INTO TBL_AUTH_USERS
(username, password, enabled, locked)
VALUES
    ('admin', '{noop}admin', 1, 0);

INSERT INTO TBL_AUTH_AUTHORITIES
(authority, userentity_id)
VALUES
    ('ROLE_ADMIN', 1);
