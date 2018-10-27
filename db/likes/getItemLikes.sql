select l.like_id, u.username
from likes l
inner join users u on u.user_id = l.likinguser
inner join items i on l.postid = i.items_id
where items_id = $1