async function GasStation(){
  var station_objects = []

  // Gas Station
  var loader = new THREE.GLTFLoader();

  loader.load(
    // resource URL
    '../../assets/models/GasStation/GasStation.gltf',
    // called when the resource is loaded
    function ( gltf ) {
      gltf.scene.traverse(function(node){
        console.log(node.material);
        node.position.set(0,-0.5,0);
        node.castShadow = true;
        node.selectable = true;
        // console.log(node)
        station_objects.push(node);
        scene.add(node);

      });
      // console.log(summer_objects);
      // console.log(summer_objects);
      // gltf.scene.scale.set(1,1,1);

      // scene.add( gltf.scene );
      // summer_objects.push(gltf.scene);
    },
    // called while loading is progressing
    function ( xhr ) {

      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {
      console.log( 'An error happened' );

    }

  );

  return station_objects;
}
