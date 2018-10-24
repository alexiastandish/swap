select yi.item_name as your_item, ti.item_name as their_item, o.requesteditemid, o.fromuser_itemid, o.offer_id, o.offer_status, u.username
from offers o
inner join items yi on yi.items_id = o.fromuser_itemid
inner join items ti on ti.items_id = o.requesteditemid
inner join users u on u.user_id = o.touserid
where fromuserid = $1 AND offer_status = 2 OR fromuserid = $1 AND offer_status = 3;