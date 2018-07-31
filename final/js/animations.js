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
              moveCamera(node);
              var title = document.getElementById("objectTitle");
              title.innerHTML = node.name;
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
