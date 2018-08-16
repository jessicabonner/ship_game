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
        const height=this.offsetHeight+"px"
        const width=this.offsetWidth+"px"

        this.style.width=height
        this.style.height=width
    }

}
  
function dragstart(e){
    e.dataTransfer.setData("ship", e.target.id);
    console.log(e.target.id)


}
  
function dragover(e) {
  e.preventDefault()

}
function dragenter(e) {
  e.preventDefault()
  if (this.tagName == "TD"){
    this.style.backgroundColor="lightblue"
   }
}

 function dragleave(e) {
    this.style.backgroundColor=null
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
    if (!checkOverlap(ship, ship_left, ship_right, ship_top, ship_bottom)){
        ship.style.position="absolute"
        board.append(ship)
        ship.style.left=cell_loc.left-board_loc.left+'px'
        ship.style.top=cell_loc.top-board_loc.top+'px'

    }
    this.style.backgroundColor=null
    
    
  } else {
    this.append(ship);
    ship.style.position=null
    ship.style.left=null
    ship.style.top=null
  }
  
  

}

function checkOverlap(current,current_left, current_right, current_top, current_bottom) {
    //console.log("checking overlap")
    //console.log(current_left)
    //console.log(current_right)
    //console.log(current_top)
    //console.log(current_bottom)
    for(const ship of ships) {
        if (ship.id != current.id){
            var compare_loc=ship.getBoundingClientRect()
            
            if (((current_right<=compare_loc.right)&&(current_right>=compare_loc.left)) || 
                ((current_left<=compare_loc.right)&&(current_left>=compare_loc.left))){
                    
                    if (((current_top>=compare_loc.top)&&(current_top<=compare_loc.bottom)) || 
                    ((current_bottom>=compare_loc.top)&&(current_bottom<=compare_loc.bottom))){
      //                  console.log("overlap")
                        return true
                        
                    } else if (((compare_loc.top>=current_top)&&(compare_loc.top<=current_bottom)) || 
                    ((compare_loc.bottom>=current_top)&&(compare_loc.bottom<=current_bottom))){
        //                console.log("overlap")
                        return true
                    
                    }
                }
        }
    }
}
