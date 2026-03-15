const fs = require("fs")

function updateInventory(order){

    const inventoryData = JSON.parse(fs.readFileSync("inventory.json"))

    for(let item in order){

        if(inventoryData[item] !== undefined){

            inventoryData[item] -= order[item]

            if(inventoryData[item] <= 5){
                console.log("Low stock warning for:", item)
            }

        }

    }

    fs.writeFileSync("inventory.json", JSON.stringify(inventoryData, null, 2))
}

module.exports = updateInventory