// let bounce = false;
// let out = true;
// //function to make a bounce animation
// function bouncer(mesh,a,b,c){
//   if (bounce) {
//     if (out) {
//       //animate out (and up)
//       mesh.scale.x += .1;
//       mesh.scale.y += .1;
//       mesh.scale.z += .1;
//       mesh.position.y += .05;
//       //check if all the way out
//         //set out to false
//       if (cube.scale.x > 2) {
//         out = false;
//       }
//     }else if(!out){
//       mesh.scale.x -= .1;
//       mesh.scale.y -= .1;
//       mesh.scale.z -= .1;
//       mesh.position.y -=.05;
//       if (mesh.scale.x < 1) {
//         mesh.scale.set(1,1,1);
//         mesh.position.set(-2,0,0);
//         bounce = false;
//         out = true;
//       }
//     }
//   }
// }



function scale_out(mesh,scale,speed){
    //animate out (and up)
    mesh.scale.x += speed;
    mesh.scale.y += speed;
    mesh.scale.z += speed;
    mesh.position.y += speed/2;
    if (mesh.scale.x > scale) {
      mesh.scale.set(scale,scale,scale);
      mesh.position.set(mesh.position.x,mesh.position.y +scale/2,mesh.posiiton.z);
      return true;
    }else{
      return false;
    }
}

function scale_in(mesh,scale,speed){
    mesh.scale.x -= speed;
    mesh.scale.y -= speed;
    mesh.scale.z -= speed;
    mesh.position.y -= speed/2;
    if (mesh.scale.x < scale) {
      mesh.scale.set(scale,scale,scale);
      mesh.position.set(mesh.position.x,mesh.position.y -scale/2,mesh.posiiton.z);
      bounce = false;
    }
}
