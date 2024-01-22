// Create a Pixi Application
const app = new PIXI.Application({ width: 800, height: 600 });

// Create a first rectangle
const rect2 = new PIXI.Graphics();
rect2.beginFill("white"); // Red color
rect2.drawRect(0, 0, 100, 100);
rect2.endFill();
rect2.x = 200;
rect2.y = 200;

app.stage.addChild(rect2);

// Create a first rectangle
const rect = new PIXI.Graphics();
/*
rect.beginFill("white"); // Red color
rect.drawRect(0, 0, 100, 100);
rect.endFill();
rect.x = 200;
rect.y = 200;
*/

rect.lineStyle(2, "white", 1.0); 
rect.moveTo(200, 50);
rect.lineTo(200, 100);

app.stage.addChild(rect);

// define mirror line
const p1_arr = [300,0]
const p2_arr = [400,600]

mir = new PIXI.Graphics();
mir.lineStyle(2, "white", 1.0); 

mir.moveTo(p1_arr[0], p1_arr[1]);
mir.lineTo(p2_arr[0], p2_arr[1]);

app.stage.addChild(mir);

// works on position -> adjust positon to change mirroring behaviour
function mirror(container,p1_arr,p2_arr) {

  // get center of of container
  const cent_arr = [container.x, container.y];

  if (p1_arr[0] === p2_arr[0]) { // vertical line
    var projX_fl = p2_arr[0] + (p2_arr[0] - cent_arr[0])
    var projY_fl = cent_arr[1]
  } else if (p1_arr[1] === p2_arr[1]) { // horizontal line
    var projX_fl = cent_arr[0]
    var projY_fl = p2_arr[1] + (p2_arr[1] - cent_arr[1])
  } else {
    // equation for line crossing the two points
    const slMirAx_fl = (p2_arr[1] - p1_arr[1]) / (p2_arr[0] - p1_arr[0]);
    const yMirAx_fl = p2_arr[1] - p2_arr[0] * slMirAx_fl;
    // compute orthogonal point on mirror axis
    const yOrth_fl =  cent_arr[1] - cent_arr[0] * (-1 / slMirAx_fl);
    const intSectX_fl = (yOrth_fl - yMirAx_fl) /  (slMirAx_fl + 1/slMirAx_fl)
    // compute projected point
    var projX_fl = intSectX_fl + (intSectX_fl - cent_arr[0])
    var projY_fl = yOrth_fl + projX_fl * (-1 / slMirAx_fl)
  }

  // adjust container position
  container.position = {x: projX_fl, y: projY_fl}

}


// Add the renderer view to the DOM
document.body.appendChild(app.view);

// Render the stage
app.renderer.render(app.stage);


setInterval(() => {

  // set intersection as pivot point and rotate by 180 degrees
  //const oldPivot_dic = rect.position
  mirror(rect, p1_arr, p2_arr)

  app.renderer.render(app.stage);
}, 2000);


// sage: position = center 