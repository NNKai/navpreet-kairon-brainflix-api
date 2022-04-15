
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4 } = require("uuid");

require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;

// // Read data file
function readInventory() {
  const inventoryData = fs.readFileSync("./data/allVideos.json");
  const parsedData = JSON.parse(inventoryData);
  return parsedData;
}

// // Write data file
function writeInventory(data) {
  fs.writeFileSync("./data/allVideos.json", JSON.stringify(data));
}



// Get list of all the inventories
router
  .route("/")
  .get((req, res) => {
    const inventoryData = readInventory();
    console.log("inventory posting endpoint");
    res.status(200).send(inventoryData);
  })
  .post((req, res) => {
      let list = readInventory();
      const updatedList = Object.assign({ id: v4() }, req.body);
      if (ValidInventoryItem(updatedList)) {
        list.unshift(updatedList);
        writeInventory(list);
        res.status(200).send(list[0]);
      } else {
        res
          .status(400)
          .send(
            `Please send the fields as per the current requirement-mandatory fields or format is missing/incorrect`
          );
      }
    
  });

// // Get a single inventory detail
router.route("/:id").get((req, res) => {
  let inventoryData = readInventory();
  const { id } = req.params;
  const selectedInventory = inventoryData.find(
    (inventoryDetail) => inventoryDetail.id === id
  );

  res.status(200).send(selectedInventory);
});

function ValidInventoryItem(item) {
  if (
    item.id &&
    item.title
    
  ) {
    return true;
  } else {
    return false;
  }
}

router.route("/:id").delete((req, res) => {
  let inventory = readInventory();
  const { id } = req.params;
  inventoryData = inventory.find(user=> user.id === id);
  if(inventoryData){
    inventory = inventory.filter(userId => userId.id !== id)
    writeInventory(inventory);
    res.status(200).json({message:"video deleted"})
  } else {
    res.status(404).json({message:"channeldoes not exist"})
  }
  
})


module.exports = router;
