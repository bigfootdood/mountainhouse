function Test_environment(scene,object){
  var testObjects = []
  var loader = new THREE.GLTFLoader();


  loader.load(
    // resource URL
    'assets/models/Pavilion/Pavilion_WinterIceRink.glb',
    // called when the resource is loaded
    function ( gltf ) {
      gltf.scene.traverse(function(node){
        node.position.set(0,-2,0);
        node.scale.set(.1,.1,.1)
        // console.log(node.material);
        testObjects.push(node);
      });

      for (var i = 0; i < testObjects.length; i++) {
        object = testObjects[i];
        object.castShadow = true;
        object.receiveShadow = true;
        // object.selectable = true;
        scene.add(object);
      }
      trigger_animations(scene);
    });



}
