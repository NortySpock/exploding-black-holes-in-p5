"use strict";

var canvasWidth = 700;
var canvasHeight = 700;
var maxDimension = Math.max(canvasWidth, canvasHeight);
var blackHoleFill = 0;
var whiteSpaceFill = 255;

var array_width = 3;
var x_array = new Array(array_width);
var y_array = new Array(array_width);
var radius_array = new Array(array_width);
var color_array = new Array(array_width);
var BlackHolesExploded = 0;

var numberOfBlackHoles = 0;
var availibleSlot = 0;

var isDead = false;
var mousePressed = true;
var expansionRadius = 10;


function setup() {
    reset();
}

function draw() {
        background(whiteSpaceFill);
        fill(blackHoleFill);
        numberOfBlackHoles = 0;

        // draw all non-zero circles
        for (var i = 0; i < array_width; i++) {
            var xpos = x_array[i];
            var ypos = y_array[i];
            var radius = 10;
            if (isDead) {
                radius = radius_array[i];
            } else {
                radius = radius_array[i] = radius_array[i] + expansionRadius;
            }

            if (xpos > 0 && ypos > 0 && radius > 0) {
                numberOfBlackHoles++;
                fill(color_array[i]);
                ellipse(xpos, ypos, radius, radius);

                //if this is a whitespace circle, we have already rendered it and it's time to clear it
                if (color_array[i]==whiteSpaceFill) {
                    // clear this circle
                    x_array[i] = y_array[i] = radius_array[i] = 0;
                }

                // check to see if we lost
                if (radius > maxDimension) {
                    isDead = true;
                }

            } else {
                availibleSlot = i;
            }
        }

        // have room for one more, add one circle this round
        if (!isDead && numberOfBlackHoles < array_width) {
            x_array[availibleSlot] = random(canvasWidth);
            y_array[availibleSlot] = random(canvasHeight);
            radius_array[availibleSlot] = random(50) + 1;
            color_array[availibleSlot] = blackHoleFill;
        }

        if (isDead) {
            textAlign(CENTER, CENTER);
            fill(128);
            text("Game Over.", canvasWidth / 2, canvasHeight / 4);
            text("Zapped:" + BlackHolesExploded, canvasWidth / 2, canvasHeight * (3 / 4));
        }

    }

function reset(){
    createCanvas(canvasWidth, canvasHeight);

    frameRate(20);
    textSize(60);

    for (var i = 0; i < array_width; i++) {
        x_array[i] = 0;
        y_array[i] = 0;
        radius_array[i] = 0;
    }

    numberOfBlackHoles = 0;
    isDead = false;
    availibleSlot = 0;

}

function mouseClicked(){
  if(!isDead)
  {
    for(var i=0;i<array_width;i++)
    {
      if(dist(mouseX, mouseY, x_array[i], y_array[i]) <= radius_array[i])
      {
        color_array[i] = whiteSpaceFill;
        BlackHolesExploded++;
      }
    }
  }
  return false;
}

