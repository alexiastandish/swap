INSERT INTO items
  (item_name, item_description, item_userid)
VALUES
  ($1, $2, $3 )
SELECT *
FROM items;

