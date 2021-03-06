/*
 * business_reviews table data, configuration, and other code.
 */
CREATE TABLE business_reviews
(
id varchar(30) NOT NULL,
user varchar(30) NOT NULL,
rating double(2,1) NOT NULL,
review varchar(500) NOT NULL,
dateTime varchar(20) NOT NULL
);

DESC business_reviews;

INSERT INTO business_reviews (id, user, rating, review, dateTime) VALUES ("test id", "test user", 3.5, "test review", "7/8/20");
SELECT * FROM business_reviews;
SELECT COUNT(*) FROM business_reviews;

DELETE FROM business_reviews WHERE (review = "sample review");

UPDATE business_reviews SET rating = "5.0" WHERE review = "Baby's offers outdoor dining and safe distance dining.";

DROP TABLE business_reviews;