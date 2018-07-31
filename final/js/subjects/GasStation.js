function GasStation(){
  var station_objects = []
  // Load Snow Island
  var loader = new THREE.GLTFLoader();
  loader.load(
    // resource URL
    'assets/models/GasStation/GasStation.gltf',
    // called when the resource is loaded
    function ( gltf ) {

      gltf.scene.scale.set(0.1,0.1,0.1);
      gltf.scene.position.set(0,-2,0);
      gltf.scene.name = "island";
      station_objects.push( gltf.scene );
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
