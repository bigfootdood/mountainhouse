# Mohonk 360 Map

## How to add a model to the map:

**1. Add GLTF Model folder to the `assets/models` folder**

**2. Add the model info to the appropriate JSON file:**

* The JSON files in the `json/` directory are set up like so:

| allSeasons.json | terrains.json | spring/summer/fall/winter.json |
| :------------- | :------------- | :------------- |
| Models that exist in every season | Each Season's terrian file| Json files for models specific to a given season |

* When adding a new model, copy the following code into the end of the json file (keeping it before the last `}`)
  * be sure to add a comma to the end of the previous entry

~~~json
"modelPlacementName":{
  "name":"",
  "description":"",
  "path":"assets/models/",
  "position":{
    "x":"0",
    "y":"0",
    "z":"0"
  },
  "scale":{
    "x":".001",
    "y":".001",
    "z":".001"
  },
  "rotation":{
    "x":"0",
    "y":"0",
    "z":"0"
  },
  "cameraPosition":{
    "x":"0",
    "y":"0",
    "z":"0"
  },
  "season":"0",
  "photo":"assets/img/mohonk.jpg",
  "video":""
}
~~~

* fill in the blanks on the right side of the `:` (in quotes). Leave the Position, Scale and Rotation set to 0 until finding correct values in model placement mode.

  **modelPlacementName:** Replace this with what you want to name the model when placing on the map in model placement mode (see model placement)

  **Name & Description:** These are what is seen on the card below the model and in the modal after being clicked.

  **path:** This is the path to where the model is in the `asset/models/` folder

  **Position:** coordinate position (remember y and z axis are flipped)

  **Rotation:** rotate along given axis (rembember this is in *radians*)

  **Camera position:** Where the camera is after the model is clicked on

  **Season:** Number representing which season the model belongs to (for the description in the modal)

| Season | All Seasons    | Summer | winter | Fall,Summer,Spring |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| Number     | 0      | 1 | 2 | 3 |

  **Photo & Video:** Paths to the background photo in the modal and the video that plays in the modal

**3. Refresh the site and make sure the model is loading properly**

**4. Placing the model:**

## Model Placement

It was taking forever placing the individual models on the map so I made **Model Placement Mode** to make things a little easier. The mode temporarily adds a duplicate of your new model that is fixed to the camera.

**To enable model placement mode: ***

1. Open `js/SceneManager.js`

2. At the top of the file change the line `var modelPlacementMode = false;` to `var modelPlacementMode = true;`

3. Scroll down to the function titled `seasonChanger`

4. In the following section of code:
  ~~~js
  //Model Placement mode
  if (modelPlacementMode) {
    await testGlb(json_file.modelPlacementName);
  }
  ~~~

  Switch `json_file` to the name of the json file you are placing the model from.

  Switch `modelPlacementName` to the modelPlacementName set in the json file above.

5. Save and Refresh the page to see your model
****
