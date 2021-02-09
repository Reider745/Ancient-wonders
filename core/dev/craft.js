Callback.addCallback("LevelLoaded", function() {
//скины
Wands.addIconAll("diamond", 0);
Wands.addIconAll("protection_wand", 0);
Wands.addIconAll("meteor_rain_wand", 0);
Wands.addIconAll("treatment_wand", 0);
Wands.addIcon(ItemID.magis_stick, "magis_stick", 1);
Wands.addIcon(ItemID.magis_sword, "magis_sword", 1);
Wands.addIcon(ItemID.magis_pocox, "magis_pocox", 1);
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
    magis: 10
});
Ritual.lvl1({
    id: ItemID.sroll18,
    data: 0
},{
    item1: ItemID.rune3, 
    item2: ItemID.sroll4
},{
    aspects: 100, 
    magis: 15
});
Ritual.lvl1({
    id: ItemID.sroll19,
    data: 0
},{
    item1: ItemID.rune3, 
    item2: ItemID.sroll6
},{
    aspects: 200, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll21,
    data: 0
},{
    item1: ItemID.rune3, 
    item2: ItemID.sroll10
},{
    aspects: 300, 
    magis: 15
});
Ritual.lvl1({
    id: ItemID.sroll22,
    data: 0
},{
    item1: ItemID.rune3, 
    item2: ItemID.sroll8
},{
    aspects: 300, 
    magis: 15
});
Ritual.lvl1({
    id: ItemID.sroll23,
    data: 0
},{
    item1: ItemID.sroll4, 
    item2: ItemID.sroll8
},{
    aspects: 300, 
    magis: 15
});
Ritual.lvl1({
    id: ItemID.sroll24,
    data: 0
},{
    item1: ItemID.rune4, 
    item2: ItemID.rune4
},{
    aspects: 1000, 
    magis: 10
});
Ritual.lvl1({
    id: ItemID.sroll26,
    data: 0
},{
    item1: 46, 
    item2: ItemID.rune3
},{
    aspects: 500, 
    magis: 10
});
Recipes.addShaped({id: ItemID.sroll27, count: 1, data: 0},
	  ["###", "#ab", "bbb"], 
['a', 264, 0, 'b', 348, 0]);
Recipes.addShaped({id: ItemID.sroll28, count: 1, data: 0},
	  ["bbb", "bab", "bbb"], 
['a', 264, 0, 'b', 348, 0]);

Recipes.addShaped({id: ItemID.aw_amylet, count: 1, data: 0},
	  ["aga", "aia", "bbb"], 
['a', 334, 0, 'b', 266, 0, 'g', 264, 0, 'i', ItemID.piece1, 0]);
Recipes.addShaped({id: ItemID.aw_amylet3, count: 1, data: 0},
	  ["aga", "aia", "bbb"], 
['a', 334, 0, 'b', 266, 0, 'g', 264, 0, 'i', ItemID.piece2, 0]);
Recipes.addShaped({id: ItemID.aw_amylet2, count: 1, data: 0},
	  ["aga", "aia", "bbb"], 
['a', 334, 0, 'b', 266, 0, 'g', 264, 0, 'i', ItemID.piece3, 0]);
Recipes.addShaped({id: ItemID.aw_amylet4, count: 1, data: 0},
	  ["aga", "aia", "bbb"], 
['a', 334, 0, 'b', 266, 0, 'g', 264, 0, 'i', ItemID.sroll24, 0]);
Recipes.addShaped({id: ItemID.magis_sword, count: 1, data: 0},
	  ["#b#", "gag", "#b#"], 
['a', 267, 0, 'b', ItemID.rune1, 0, 'g', ItemID.rune2, 0]);
Recipes.addShaped({id: ItemID.magis_pocox, count: 1, data: 0},
	  ["##g", "#b#", "b##"], 
['b', 280, 0, 'g', ItemID.rune5, 0]);
if(config.beta_mode){
Recipes.addShaped({id: ItemID.beltAw, count: 1, data: 0},
	  ["bbb", "gbg", "bbb"], 
['b', 266, 0, 'g', ItemID.aw_amylet2, 0]);
}
});
ModAPI.registerAPI("AncientWondersAPI", {
    ItemGenerate: ItemGenerate,
    MagicCore: MagicCore,
    Wands: Wands,
    Ritual: Ritual,
    delItem: delItem2,
    ParticlesAPI: ParticlesAPI,
    Render: RenderAPI,
    Mp: Mp,
    EffectAPI: EffectAPI
});
