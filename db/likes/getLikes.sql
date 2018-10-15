SELECT i.*
FROM items i
  JOIN likes l
  ON (l.postid = i.items_id)
WHERE likinguser = $1;