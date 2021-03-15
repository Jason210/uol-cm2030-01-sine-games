/*eslint no-undef: 0 */
// Jason De Donno

var length;
var confLocs = [];
var conTheta = [];

var slider1;
var slider2;

function setup()
{
    slider1 = createSlider(0, 255, 100);
    slider1.position(10, 10);
    slider1.style("width", "80px");

    slider2 = createSlider(0, 255, 10);
    slider2.position(10, 40);
    slider2.style("width", "80px");


    angleMode(DEGREES);
    createCanvas(900, 800, WEBGL);

    for (var i = 0; i < 200; i++)
    {
        // fill array with confetti locations
        var location = createVector(random(-500, 500), random(-800, 0), random(-500, 500));
        confLocs.push(location);

        // fill array with random angles
        conTheta.push(random(360));
    }
}

function draw()
{
    var val1 = slider1.value();
    background(val1);

    var val2 = slider2.value();
    //background(val2);

    normalMaterial();
    stroke(0);
    strokeWeight(2);

    pointLight(100, 0, 0, 450, 0, -450);
    pointLight(0, 0, 100, -450, 0, -450);

    ambientLight(20, 20, 45);
    var xloc = cos(frameCount) * 1200;
    var zloc = sin(frameCount) * 1200;
    camera(xloc, -500, zloc, 0, 0, 0, 0, 1, 0);
    pointLight(val2, val2, 0, xloc, 0, zloc);
    createGrid();
    confetti();
}

function createGrid()
{
    for (var z = -400; z < 401; z = z + 50)
    {
        for (var x = -400; x < 401; x = x + 50)
        {
            push();
            {
                specularMaterial(250);
                translate(x, 0, z);
                var height = 200 + sin(dist(x, 0, 0, 0, z, 0) + frameCount * 2) * 100;

                box(50, height, 50);
            }
            pop();

        }
    }
}

/////////////////////////////////////////////////////
function confetti()
{
    for (var i = 0; i < 200; i++)
    {
        push();
        {
            translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
            rotateX(conTheta[i]);
            plane(15, 15);
        }
        pop();

        confLocs[i].y = confLocs[i].y + 1;
        conTheta[i] = conTheta[i] + 10;
        if (confLocs[i].y > 0) confLocs[i].y = -800;
    }
}
