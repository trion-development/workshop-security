CREATE TABLE IF NOT EXISTS TBL_TRAININGS
(
    COL_ID          CHAR(36) NOT NULL PRIMARY KEY,
    COL_VERSION     INTEGER NOT NULL DEFAULT 0,
    COL_CREATED_ON  DATETIME,
    COL_MODIFIED_ON DATETIME,
    COL_TOPIC       VARCHAR(255) NOT NULL,
    COL_LOCATION    VARCHAR(255) NOT NULL,
    COL_DESCRIPTION VARCHAR(255),
    COL_INSTRUCTOR_NAME VARCHAR(255) NOT NULL
)
/*! ENGINE=INNODB */
/*! CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */
;
