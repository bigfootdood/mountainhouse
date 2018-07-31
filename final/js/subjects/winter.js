
function Winter() {
  winter_objects = [];
  //create 2 cubes
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x228B22 } );
  var material2 = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
  var cube = new THREE.Mesh( geometry, material );
  cube.name = "cube1";
  cube.selectable = true;
  cube.position.set(-2,0,0);
  winter_objects.push(cube);

  var cube2 = new THREE.Mesh(geometry,material2);
  cube2.position.set(2,0,0);
  cube2.name = "cube2";
  cube2.selectable = true;
  winter_objects.push(cube2);
  // scene.add( cube );
  // scene.add(cube2);



  //plane
  var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.set(1.5708,0,0);
  plane.position.set(0,-.5,0);
  plane.name = "plane";
  plane.selectable = false;
  winter_objects.push(plane);
  // scene.add( plane );

  return winter_objects;
}
