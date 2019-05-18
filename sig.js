/*
Frymans signature code

2 options for use:
    1. Create a canvas on your page with an ID, use sig.attachTo(canvasid)
        to attach it to a canvas whos position you have already defined
    2. Use createContainer(parentID) to inset a canvas into the page automagically
        the parentid could be an empty div

    To get the sig once signed use sig.getSig() this will return a 
    png in a string format, either save it to a database or save it as a png

    To Clear the sig use sig.clear()

    **IMPORTANT**
    put the <Script> tag at the end of your html file before the </html>
    as it doesnt wait for the page to load
*/




var sigconstructor = function(){
    this.canvas =""; //Contains the HTML canvas we are using
    this.g = ""; //the 2d context of our canvas
    this.width = 200; //Change me to change the createContainer size, wont affect attachTo
    this.height = 60; //same
    this.bgcolor = "lightgrey"; //Background colour of the box
    this.textcolor = "black"; //Forground colour of the box
    this.isMouseDown = false; //Dont touch me

    //Creates a new signiture canvas at the ID entered
    this.createContainer = function(id){
        try{
            let tempparent = document.getElementById(id);
            let newcontainer = document.createElement("canvas");
            newcontainer.setAttribute("width",this.width);
            newcontainer.setAttribute("height",this.height);
            newcontainer.setAttribute("id","sigcontainer");
            tempparent.appendChild(newcontainer);
            this.canvas = newcontainer;
            this.setup();
        }catch(err){
            console.log("failed to create a new canvas does the parent id exist: "+err);
            this.canvas = null;
        }
    }

    //Attaches a signiture controller to the Canvas ID eneterd
    this.attachTo = function(canvasid){
        try{
            this.canvas = document.getElementById(canvasid);
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            //get context and colour the background
            this.setup();
        }catch(err){
            console.log("Failed to attach to ID, does it exist");
            this.canvas = null;
        }
    }

    //Sets up all the listeners on the canvas
    this.setup = function(){
          //get context and colour the background
          this.g = this.canvas.getContext("2d");
          this.g.fillStyle = this.bgcolor;
          this.g.fillRect(0,0,this.width,this.height);

          this.canvas.onmousedown = function(){
              this.isMouseDown = true;
          }

          this.canvas.onmousemove = function(e){
              if(!this.isMouseDown) return; //Only draw if the mouse is down
              sig.g.fillStyle = sig.textcolor;
              sig.g.fillRect(e.offsetX,e.offsetY,2,2);
          }

          this.canvas.onmouseup = function(){
              this.isMouseDown = false; //Stop the drawing
          }

    }
    //returns a PNG Image, can save this in db or save it as a png
    this.getSig =function(){
        return this.canvas.toDataURL();
    }

    this.clear = function(){
        sig.g.fillStyle = this.bgcolor
        sig.g.fillRect(0,0,sig.canvas.width,sig.canvas.height);
    }
}

var sig = new sigconstructor;