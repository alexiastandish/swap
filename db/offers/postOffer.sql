-- INSERT INTO offers
-- (fromuserid, fromuser_itemid, touserid, requesteditemid, offer_status)
-- VALUES
-- ($1, $2, $3, $4, $5)
-- RETURNING *;

UPDATE offers
SET offer_status=$2
WHERE offer_id = $1

RETURNING*;