var canavs;
var database;
var stoke;

var drawing = []

function setup() {
    canvas = createCanvas(2000, 1000);
    canvas.parent('canvascontainer');
    database = firebase.database()
    background(51)


    var input = createInput("");
    input.hide();
        var Button1  = createButton("stroke");
        var buttton2  =createButton("apply");
        buttton2.hide();
        var greeting  = createElement('h3');

        input.position(130,160);
        Button1.position(250,200);
        buttton2.position(150,200);
        Button1.mousePressed(function(){
          input.show();
            
            buttton2.show();
          


        });
        buttton2.mousePressed(function(){
          input.hide();
          buttton2.hide();
          console.log("strokeWeight has been Changed")
          stoke  = input.value();         
          greeting.html("stroke" + stoke);
          greeting.position(130,160);
          
        })
        


    

}

var db_drawing = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
    readData()
    beginShape();
    stroke(255);
    strokeWeight(stoke);
    noFill();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }

}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d
    })
}
