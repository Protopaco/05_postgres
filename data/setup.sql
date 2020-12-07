CREATE TABLE teachers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    host_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    email TEXT NOT NULL,
    pic_url TEXT,
    access_token TEXT,
    account_id TEXT NOT NULL,
    last_update TEXT NOT NULL
);

