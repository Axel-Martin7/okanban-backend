# Modèle Logique des Données

list(id, name, position)                        types: integer, text, integer
card(id, title, color, position, #list(id))     types: integer, text, text, integer)
tag(id, name, color)                            types: integer, text, text)

card_has_tag(#card(id), #tag(id))

## Un exemple de table de liaison

|card|tag|
|---|---|
|1|1|
|1|2|
|1|3|
|2|1|
|3|1|