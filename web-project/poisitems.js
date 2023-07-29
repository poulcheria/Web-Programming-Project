let items=[7, 13, 19, 26, 27, 28, 29, 39, 40, 61, 71, 79, 95, 102, 134, 141, 148, 154, 156, 194, 222, 229, 251, 255, 288, 298, 311, 316, 342, 350, 352, 353, 388, 392, 394, 470, 488, 713, 1017, 1205];
let shops=["node_354449389", "node_360217468", "node_360226900", "node_364381224", "node_364463568", "node_598279836", "node_633369803", "node_980515550", "node_1643373636", "node_1643373639", "node_1643713403", "node_1643713405", "node_1643713406", "node_1643818244", "node_1643818267", "node_1643818277", "node_1643818281", "node_1643825320", "node_1643889596", "node_1657132006", "node_1657132008", "node_1657962066", "node_1695934267", "node_1763830009", "node_1763830474", "node_1770994538", "node_1771512424","node_1815896581", "node_1971240515", "node_1971240518", "node_1971247760", "node_1971249846", "node_1997401665", "node_1997401682", "node_3144355008", "node_3354481184", "node_4101518891", "node_4356067891", "node_4356183595", "node_4357098895", "node_4357217589", "node_4357425491", "node_4357589496", "node_4358244594", "node_4372108797", "node_4484528391", "node_4752810729", "node_4931300543", "node_4953268497", "node_4969309651", "node_5005384516", "node_5005409493", "node_5005409494", "node_5005409495", "node_5005476710", "node_5005476711", "node_5132918123", "node_5164678230", "node_5164741179", "node_5350727524", "node_5396345464", "node_5620198221", "node_5620208927", "node_5783486253", "node_5909978406", "node_7673935764", "node_7673976786", "node_7673986831", "node_7674120315", "node_7677225097", "node_7914886761", "node_8214753473", "node_8214854586", "node_8214887295", "node_8214887306", "node_8214910532", "node_8215010716", "node_8215157448", "node_8753329904", "node_8753329905", "node_8777081651", "node_8777171555", "node_8805335004", "node_8805467220", "node_8806495733", "node_9651304117", "node_9785182275", "node_9785182280", "node_9785335420"];

let newarray=[];
shops.forEach(shop=>{
    [ items[Math.floor(Math.random()*items.length)] ,items[Math.floor(Math.random()*items.length)],items[Math.floor(Math.random()*items.length)],items[Math.floor(Math.random()*items.length)]].forEach(item=>{
        newarray.push({
            item_id:item,
            pois_id:shop
        })
    })    
})

console.dir(newarray, {'maxArrayLength': null});
console.log(shops.length);