var count = 0;
var animating = false;
function trigger_animations(scene){
  scene.traverse( function( node ) {
      if ( node instanceof THREE.Mesh && node.selectable ) {
          node.on('mouseover', function(ev) {
            // node.scale.set(1.2,1.2,1.2);
            bounce(node);
            // console.log(node);
          });
          // node.on('mouseout', function(ev) {
          //   node.scale.set(1,1,1);
          //
          // });
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
              var more = document.getElementById("more");
              title.innerHTML = attractions[node.index].name;
              more.innerHTML = "Find Out More"

              //PRELOAD MODAL WITH INFORMATION
              var modalTitle = document.getElementById("modalLabel");
              modalTitle.innerHTML = attractions[node.index].name;

              var modalTitle = document.getElementById("modalBody");
              modalBody.innerHTML = attractions[node.index].description;

              // $.getJSON("../json/test.json", function(json){
              //   alert(json.attractions[0].name);
              // });

          });
      }
  } );
}

function bounce(object){

  let obj = {
    x:object.scale.x,
    y:object.scale.y,
    z:object.scale.z
  }

  let cpy = JSON.parse(JSON.stringify(obj));

  if (!object.animating) {
    object.animating = true;
    new TWEEN.Tween( object.scale).to( {
      x: object.scale.x * 1.5,
      y: object.scale.y * 1.5,
      z: object.scale.z * 1.5}, 300)
      .easing( TWEEN.Easing.Cubic.Out).start();

    new TWEEN.Tween( object.position).to( {
      x: object.position.x,
      y: object.position.y + (.25 * cpy.y),
      z: object.position.z}, 300)
      .easing( TWEEN.Easing.Cubic.Out).start();

    object.scale.set(object.scale.x * 1.5,object.scale.y * 1.5,object.scale.z * 1.5);
    object.position.set(object.position.x,object.position.y +.25,object.position.z );

    // new TWEEN.Tween( object.position).to( {
    //   x: object.position.x,
    //   y: object.position.y - (.25 * cpy.y),
    //   z: object.position.z}, 1500).delay(250)
    //   .easing( TWEEN.Easing.Elastic.Out).start();
    new TWEEN.Tween( object.scale).to( {
      x: cpy.x,
      y: cpy.y,
      z: cpy.z}, 1500).delay(250)
      .easing( TWEEN.Easing.Elastic.Out).
      onComplete(function() {
        object.animating = false
      }).start();

  }

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
