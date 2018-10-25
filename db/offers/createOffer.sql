-- - get other user by username
-- - get list of user’s items
-- - get current user
-- - get list of current user’s items
-- - submit: post that sends offer to offers table with a status of 1


INSERT INTO offers(fromuserid, fromuser_itemid, touserid, requesteditemid, offer_status)
VALUES($1, $2, $3, $4, 1);