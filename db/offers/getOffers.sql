-- SELECT i.item_name, i.item_description, im.imageurl
-- FROM items i
-- JOIN offers o ON (o.fromuser_itemid = i.items_id) AND (o.requesteditemid = i.items_id)
-- JOIN images im ON (im.imageurl_itemid = i.items_id )
-- WHERE touserid = $1;

-- SELECT o.*
-- FROM offers o 
-- JOIN items i ON (i.items_id = o.fromuser_itemid)
-- WHERE touserid = $1 AND offer_status = 1 ;

select yi.item_name as your_item, ti.item_name as their_item, o.requesteditemid, o.fromuser_itemid, o.offer_id, o.offer_status, u.username
from offers o
inner join items yi on yi.items_id = o.requesteditemid 
inner join items ti on ti.items_id = o.fromuser_itemid
inner join users u on u.user_id = o.fromuserid
where touserid = $1 AND offer_status = 1;