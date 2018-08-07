
function Summer(scene,object){
  var summer_objects = []
  // Gas Station
  var loader = new THREE.GLTFLoader();

  loader.load(
    // resource URL
    'assets/models/GasStation/GasStation.gltf',
    // called when the resource is loaded
    function ( gltf ) {
      gltf.scene.traverse(function(node){
        node.position.set(0,-.61,0);
        summer_objects.push(node);
      });

      for (var i = 0; i < summer_objects.length; i++) {
        object = summer_objects[i];
        object.castShadow = true;
        object.receiveShadow = true;
        // object.selectable = true;
        scene.add(object);
      }
      trigger_animations(scene);
    });

    loader.load(
      // resource URL
      'assets/models/Pavilion/Purple_Units.glb',
      // called when the resource is loaded
      function ( gltf ) {
        // gltf.scene.scale.set(.0001,.0001,.0001);
        gltf.scene.traverse(function(node){
          node.scale.set(.001,.001,.001);
          node.position.set(1.5,0,3);
          node.rotation.set(0,0,0);
          summer_objects.push(node);
          node.selectable = true;
        });

        for (var i = 0; i < summer_objects.length; i++) {
          object = summer_objects[i];
          object.castShadow = true;
          object.receiveShadow = true;
          // object.selectable = true;
          scene.add(object);
        }
        trigger_animations(scene);
      });


    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material );
    // cube.name = "cube1";
    // cube.castShadow = true;
    // cube.receiveShadow = true;
    // cube.selectable = true;
    // cube.animating = false;
    // cube.position.set(-2,3,0);
    // cube.index = [0];
    // summer_objects.push(cube);
    //
    // var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
    // var material = new THREE.MeshLambertMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    // var plane = new THREE.Mesh( geometry, material );
    // plane.rotation.set(1.5708,0,0);
    // plane.position.set(-2,2,0);
    // plane.castShadow = true;
    // plane.receiveShadow = true;
    // plane.name = "plane";
    // plane.selectable = false;
    // plane.animating = false;
    // summer_objects.push(plane);
    // console.log(plane.material);
    //
    // objects = summer_objects;

}

// function Summer() {
//   summer_objects = [];
//   //create 2 cubes
//   var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//   var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//   var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
//   var cube = new THREE.Mesh( geometry, material );
//   cube.name = "cube1";
//   cube.selectable = true;
//   cube.animating = false;
//   cube.position.set(-2,0,0);
//   summer_objects.push(cube);
//
//   var cube2 = new THREE.Mesh(geometry,material2);
//   cube2.position.set(2,0,0);
//   cube2.name = "cube2";
//   cube2.selectable = true;
//   cube2.animating = false;
//   summer_objects.push(cube2);
//   // scene.add( cube );
//   // scene.add(cube2);
//
//
//
//   //plane
//   var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
//   var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
//   var plane = new THREE.Mesh( geometry, material );
//   plane.rotation.set(1.5708,0,0);
//   plane.position.set(0,-.5,0);
//   plane.name = "plane";
//   plane.selectable = false;
//   plane.animating = false;
//   summer_objects.push(plane);
//   // scene.add( plane );
//
//
//   // Gas Station
//   // var loader = new THREE.GLTFLoader();
//   //
//   // loader.load(
//   //   // resource URL
//   //   'assets/models/GasStation/GasStation.gltf',
//   //   // called when the resource is loaded
//   //   function ( gltf ) {
//   //     gltf.scene.traverse(function(node){
//   //       // console.log(node.material);
//   //
//   //       node.position.set(0,-1,0);
//   //       node.castShadow = true;
//   //       node.selectable = true;
//   //       // console.log(node)
//   //       summer_objects.push(node);
//   //       scene.add(node);
//   //
//   //     });
//   //     // console.log(summer_objects);
//   //     // console.log(summer_objects);
//   //     // gltf.scene.scale.set(1,1,1);
//   //
//   //     // scene.add( gltf.scene );
//   //     // summer_objects.push(gltf.scene);
//   //   },
//   //   // called while loading is progressing
//   //   function ( xhr ) {
//   //
//   //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//   //
//   //   },
//   //   // called when loading has errors
//   //   function ( error ) {
//   //     console.log( 'An error happened' );
//   //
//   //   }
//   //
//   // );
//
//   // console.log(summer_objects);
//
//   return summer_objects;
// }
