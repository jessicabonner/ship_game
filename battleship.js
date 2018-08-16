const cells = document.getElementsByTagName("TD")
const container = document.getElementById("ships")
const ships = document.getElementsByClassName("ship")


for(const cell of cells) {
  cell.addEventListener("dragover", dragover)
  cell.addEventListener("dragenter", dragenter)
  cell.addEventListener("drop", drop)
  cell.addEventListener("dragleave", dragleave)
  cell.addEventListener("dragstart", dragstart)
}

for(const ship of ships) {
    ship.addEventListener("dblclick", rotate);
    ship.addEventListener("dragstart", dragstart)
}

  container.addEventListener("dragover", dragover)
  container.addEventListener("dragenter", dragenter)
  container.addEventListener("drop", drop)
  container.addEventListener("dragleave", dragleave)
  container.addEventListener("dragstart", dragstart)
  
function rotate(){
    const height=this.offsetHeight+"px"
    const width=this.offsetWidth+"px"

    
        this.style.width=height
        this.style.height=width
    
    var loc=this.getBoundingClientRect()
    if (checkOverlap(this,loc.left,loc.right,loc.top,loc.bottom)){
     /*     
        this part cant be done until we make note of ship placement!!
        if (//check that on board){
            if (!checkOnBoard(cell, Math.round(this.offsetHeight/50), 
            Math.round(this.offsetWidth/50)){
                const height=this.offsetHeight+"px"
                const width=this.offsetWidth+"px"

                this.style.width=height
                this.style.height=width
            }
        } */
        
        const height=this.offsetHeight+"px"
        const width=this.offsetWidth+"px"

        this.style.width=height
        this.style.height=width
    }

}
  
function dragstart(e){
    e.dataTransfer.setData("ship", e.target.id);
    const ship=document.getElementById(e.target.id)
    
    var ship_height=ship.offsetHeight
    var ship_width=ship.offsetWidth
    var cells_height=Math.round(ship_height/50)
    var cells_width=Math.round(ship_width/50)
    
    localStorage.setItem("cells_height", cells_height)
    localStorage.setItem("cells_width", cells_width)


}
  
function dragover(e) {
  e.preventDefault()
    if (this.tagName=="TD" && 
    !checkOnBoard(this, parseInt(localStorage.getItem("cells_width")), 
        parseInt(localStorage.getItem("cells_height")))){
    colorCells("lightblue", this)
    this.style.backgroundColor="lightblue"
  }
}
function dragenter(e) {
  e.preventDefault()
  
  
    
  
   
}

function colorCells(color, starting_cell){
   var cells_height = undefined;
   var cells_width = undefined;
   if(localStorage.getItem("cells_height")&&localStorage.getItem("cells_width")){
    cells_height = localStorage.getItem("cells_height");
    cells_width = localStorage.getItem("cells_width");
    

    
    var cell_index=starting_cell.cellIndex
    var row_index=starting_cell.parentNode.rowIndex
    
    if (cell_index&&row_index){
    for (i = 1; i < cells_height; i++) {
        
       document.getElementById('board').rows[(row_index+i)].cells[cell_index].style.backgroundColor=color;

    }
    
    for (i = 1; i < cells_width; i++) {
        document.getElementById('board').rows[row_index].cells[(cell_index+i)].style.backgroundColor=color;

    }
    
   }
   }
}


 function dragleave(e) {
    if (!checkOnBoard(this, parseInt(localStorage.getItem("cells_width")), parseInt(localStorage.getItem("cells_height")))){
        colorCells(null, this);
        this.style.backgroundColor=null
    }
  }
  
function drop(e) {
    //console.log(e.dataTransfer.getData("ship"))
  const ship = document.getElementById(e.dataTransfer.getData("ship"));
  if (this.tagName == "TD"){
    var board=document.getElementById("board")
    
    var board_loc=board.getBoundingClientRect();
    var cell_loc = this.getBoundingClientRect();
    
    
    ship_left=cell_loc.left
    ship_top=cell_loc.top
    ship_bottom=ship_top+ship.offsetHeight
    ship_right=ship_left+ship.offsetWidth
    if (!checkOverlap(ship, ship_left, ship_right, ship_top, ship_bottom) && 
    !checkOnBoard(this, Math.round(ship.offsetWidth/50),Math.round(ship.offsetHeight/50))){
        ship.style.position="absolute"
        board.append(ship)
        ship.style.left=cell_loc.left-board_loc.left+'px'
        ship.style.top=cell_loc.top-board_loc.top+'px'

    }
    if (!checkOnBoard(this, parseInt(localStorage.getItem("cells_width")), parseInt(localStorage.getItem("cells_height")))){

        colorCells(null, this)
        this.style.backgroundColor=null
    }
    
    
  } else {
    this.append(ship);
    ship.style.position=null
    ship.style.left=null
    ship.style.top=null
  }
  
  if(localStorage.getItem("cells_width")){
    localStorage.removeItem("cells_width");
  }
  if(localStorage.getItem("cells_height")){
    localStorage.removeItem("cells_height");
  }
  
  

}

function checkOnBoard(starting_cell, ship_width, ship_height){
    
    var cell_index=starting_cell.cellIndex
    var row_index=starting_cell.parentNode.rowIndex
    
    
    if (cell_index+ship_width>11){
        return true
    } else if (row_index+ship_height>11){
        return true
    } else {
        return false
    }
    
}

function checkOverlap(current,current_left, current_right, current_top, current_bottom) {

    for(const ship of ships) {
        if (ship.id != current.id){
            var compare_loc=ship.getBoundingClientRect()

            if (((current_right<=compare_loc.right)&&(current_right>=compare_loc.left)) || 
                ((current_left<=compare_loc.right)&&(current_left>=compare_loc.left))){
                    
                    if (((current_top>=compare_loc.top)&&(current_top<=compare_loc.bottom)) || 
                    ((current_bottom>=compare_loc.top)&&(current_bottom<=compare_loc.bottom))){
                        return true
                        
                    } else if (((compare_loc.top>=current_top)&&(compare_loc.top<=current_bottom)) || 
                    ((compare_loc.bottom>=current_top)&&(compare_loc.bottom<=current_bottom))){
                        return true
                    
                    }
                }
                
            if (((current_bottom<=compare_loc.bottom)&&(current_bottom>=compare_loc.top)) || 
                ((current_top<=compare_loc.bottom)&&(current_top>=compare_loc.top))){
                    
                    if (((current_left>=compare_loc.left)&&(current_left<=compare_loc.right)) || 
                    ((current_right>=compare_loc.left)&&(current_right<=compare_loc.right))){
                        return true
                        
                    } else if (((compare_loc.left>=current_left)&&(compare_loc.left<=current_right)) || 
                    ((compare_loc.right>=current_left)&&(compare_loc.right<=current_right))){
                        return true
                    
                    }
                }
        }
    }
}
