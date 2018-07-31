var count = 0;
async function trigger_animations(scene){
  scene.traverse( function( node ) {
      if ( node instanceof THREE.Mesh && node.selectable ) {
          node.on('mouseover', function(ev) {
            node.scale.set(1.2,1.2,1.2);
            // console.log(node);
          });
          node.on('mouseout', function(ev) {
            node.scale.set(1,1,1);

          });
          // node.on('touchmove', function(ev) {
          //   node.scale(1,1,1);
          // });
          // node.on('touchstart', function(ev) {
          //   node.scale(1,1,1);
          // });
          node.on('click', function(ev) {
            animating = true;
            // console.log(count);
            // count++;
            // console.log("Clicking")
            // console.log(camera.position);
              // if (animating == false) {
              moveCamera(node);
              // }
              // new TWEEN.Tween( camera.position ).to( {
              //   x: node.position.x + 2*node.scale.x,
              //   y: node.position.y+ 2*node.scale.y,
              //   z: node.position.z + 2*node.scale.z}, 2400)
              //   .easing( TWEEN.Easing.Cubic.Out).start();
              //
              // new TWEEN.Tween( controls.target).to( {
              //   x: node.position.x,
              //   y: node.position.y,
              //   z: node.position.z}, 2400)
              //   .easing( TWEEN.Easing.Cubic.Out).onUpdate(function(){controls.update()}).start();
            // camera.position.set(node.position.x + 2*node.scale.x,node.position.y + 2*node.scale.y,node.position.z + 2*node.scale.z)
            // controls.target.set(node.position.x , node.position.y,node.position)
          });
      }
  } );
}

function bounce(object){

}

function moveCamera(object){
  // moveCamera(object);
  console.log("ANIMATING");

  new TWEEN.Tween( camera.position ).to( {
    x: object.position.x + 2*object.scale.x,
    y: object.position.y+ 2*object.scale.y,
    z: object.position.z + 2*object.scale.z}, 2400)
    .easing( TWEEN.Easing.Cubic.Out).start();

  new TWEEN.Tween( controls.target).to( {
    x: object.position.x,
    y: object.position.y,
    z: object.position.z}, 2400)
    .easing( TWEEN.Easing.Cubic.Out).onUpdate(function(){controls.update()}).start();

}
