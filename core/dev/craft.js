Callback.addCallback("LevelLoaded", function() {
Recipes.addShaped({id: BlockID.rityalPedestal, count: 1, data: 0},
	  ["aga", "aba", "aba"], 
['a', 98, 0, 'b', 265, 0, 'g', 264, 0]);
Recipes.addShaped({id: ItemID.loreClass1, count: 1, data: 0},
   	["*a*", "*bs", "*g*"], 
["a", ItemID.piece1, 0, "b", ItemID.piece2, 0, "g", ItemID.piece3, 0, "s", 368, 0]);
  	Recipes.addShaped({id: ItemID.loreClass2, count: 1, data: 0},
   	["*a*", "*bs", "*g*"], 
["a", ItemID.piece1, 0, "b", ItemID.piece2, 0, "g", ItemID.piece3, 0, "s", 267, 0]);
  	Recipes.addShaped({id: ItemID.loreClass3, count: 1, data: 0},
   	["*a*", "*bs", "*g*"], 
["a", ItemID.piece1, 0, "b", ItemID.piece2, 0, "g", ItemID.piece3, 0, "s", 370, 0]);
Recipes.addShaped({id: ItemID.magis_stick, count: 1, data: 0},
	  ["##a", "#b#", "b##"], 
['a', ItemID.rune1, 0, 'b', 280, 0]);
Recipes.addShaped({id: ItemID.bookk, count: 1, data: 0},
	  ["#a#", "aba", "#a#"], 
['a', 367, 0, 'b', 340, 0]);
Ritual.lvl1({
    id: ItemID.rune6,
    data: 0
},{
    item1: ItemID.rune4, 
    item2: ItemID.rune2
},{
    aspects: 200, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.rune5,
    data: 0
},{
    item1: ItemID.rune4, 
    item2: ItemID.rune1
},{
    aspects: 200, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll10,
    data: 0
},{
    item1: ItemID.rune5, 
    item2: ItemID.sroll4
},{
    aspects: 500, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll11,
    data: 0
},{
    item1: ItemID.rune5, 
    item2: ItemID.sroll10
},{
    aspects: 500, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll8,
    data: 0
},{
    item1: ItemID.rune5, 
    item2: ItemID.sroll11
},{
    aspects: 500, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll14,
    data: 0
},{
    item1: ItemID.rune2, 
    item2: ItemID.sroll9
},{
    aspects: 500, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll12,
    data: 0
},{
    item1: ItemID.rune4, 
    item2: ItemID.sroll6
},{
    aspects: 500, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll13,
    data: 0
},{
    item1: ItemID.rune4, 
    item2: ItemID.sroll12
},{
    aspects: 500, 
    magis: 20
});
});
