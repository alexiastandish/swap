SELECT o.*
FROM offers o 
JOIN items i ON (i.items_id = o.requesteditemid)
WHERE fromuserid = $1 AND offer_status = 2 OR fromuserid = $1 AND offer_status = 3;