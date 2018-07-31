function Summer() {
  summer_objects = [];
  //create 2 cubes
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  var cube = new THREE.Mesh( geometry, material );
  cube.name = "cube1";
  cube.selectable = true;
  cube.position.set(-2,0,0);
  summer_objects.push(cube);

  var cube2 = new THREE.Mesh(geometry,material2);
  cube2.position.set(2,0,0);
  cube2.name = "cube2";
  cube2.selectable = true;
  summer_objects.push(cube2);
  // scene.add( cube );
  // scene.add(cube2);



  //plane
  var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.set(1.5708,0,0);
  plane.position.set(0,-.5,0);
  plane.name = "plane";
  plane.selectable = false;
  summer_objects.push(plane);
  // scene.add( plane );


  // Gas Station
  var loader = new THREE.GLTFLoader();
  loader.load(
    // resource URL
    'assets/models/GasStation/GasStation.gltf',
    // called when the resource is loaded
    function ( gltf ) {
      // gltf.scene.traverse(
      //   function(node){
      //     console.log(node);
      //   }
      // )
      gltf.scene.scale.set(1,1,1);
      gltf.scene.position.set(0,-0.5,0);
      scene.add( gltf.scene );
      summer_objects.push(gltf.scene);
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
  console.log(summer_objects);
  return summer_objects;
}
