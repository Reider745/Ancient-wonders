let categor = {
    armor: [ItemID.sroll1, ItemID.sroll2,ItemID.sroll3,ItemID.sroll4,ItemID.sroll5,ItemID.sroll6,ItemID.sroll7,ItemID.sroll8,ItemID.sroll9,ItemID.sroll10,ItemID.sroll11,ItemID.sroll12,ItemID.sroll13,ItemID.sroll14,ItemID.sroll15,ItemID.sroll16,ItemID.sroll17,ItemID.sroll18,ItemID.sroll19,ItemID.sroll20,ItemID.sroll21,ItemID.sroll22,ItemID.sroll23,ItemID.sroll24,ItemID.sroll25,ItemID.sroll26,ItemID.sroll27,ItemID.sroll28,ItemID.sroll29,ItemID.sroll30,ItemID.decor1,ItemID.decor2,ItemID.decor3,ItemID.aw_amylet,ItemID.aw_amylet2,ItemID.aw_amylet3,ItemID.aw_amylet4,ItemID.magis_stick,ItemID.magis_sword,ItemID.magis_pocox],
    govno: [ItemID.rune1,ItemID.rune2,ItemID.rune3,ItemID.rune4,ItemID.rune5,ItemID.rune6,ItemID.bookk,ItemID.loreClass1,ItemID.loreClass2,ItemID.loreClass3,ItemID.piece1,ItemID.piece2,ItemID.piece3]
};
for(let i in categor.armor){
    Item.setCategory(categor.armor[i], 3);
}
for(let i in categor.govno){
    Item.setCategory(categor.govno[i], 4);
}
