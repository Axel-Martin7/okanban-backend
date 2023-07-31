MLD:

list (
id, (integer)
name, (text)
position, (integer)
);

Card (
id, (integer)
title, (text)
position, (integer)
color, (text)
#List(id),
);

Tag (
id, (integer)
name, (text)
color, (text)
);

Card_has_tag (
#card(id),
#tag(id),
);
