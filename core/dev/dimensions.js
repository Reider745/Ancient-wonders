var DeadForest = new Dimensions.CustomDimension("DeadForest", 589); 
DeadForest.setSkyColor(0, 128, 188);
DeadForest.setFogColor(0, 128, 188); 
 
DeadForest.setGenerator(Dimensions.newGenerator({
    layers: [
        {
            minY: 0, maxY: 68, 
            yConversion: [[0, 1], [1, -1]], 
            material: {base: 1, surface: {id:5, data: 0, width:4}, cover: 2}, 
            noise: {
                octaves: {count: 4, scale: 20}
            }
        }
    ]
}));
Callback.addCallback("NativeCommand", function(str){
  cmd = str.split(" ");
  if(cmd[0] == "/t"){
  if(cmd[1] == "d"){ 
   Dimensions.transfer(Player.get(), DeadForest.id);
   
} 
Game.prevent();
} 
});
