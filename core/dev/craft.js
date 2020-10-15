Callback.addCallback("LevelLoaded", function() {
Recipes.addShaped({id: BlockID.rityalPedestal, count: 1, data: 0},
	["aga", "aba", "aba"], 
['a', 98, 0, 'b', 265, 0, 'g', 264, 0]);
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
});
