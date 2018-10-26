-- JOIN offers o
-- ON (i.items_id = o.requesteditemid)


SELECT i.items_id, i.item_name, i.item_description, i.post_time, i.item_status, u.user_id, u.username, u.user_photo, im.image_id, im.imageurl
FROM items i
JOIN users u ON u.user_id = i.item_userid
JOIN images im on im.imageurl_itemid = i.items_id
where user_id = $1 AND item_status = 1;