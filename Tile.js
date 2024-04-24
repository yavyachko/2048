export class Tile {
    constructor(gridElement){
        this.tileElement = document.createElement("div")
        this.tileElement.className = "tile"
        this.addValue(Math.random() <= 0.5 ? 4 : 2);
        this.tileElement.textContent = this.value;
        gridElement.append(this.tileElement);
    }

    setCords(x, y){
        this.x = x;
        this.y = y;
        this.tileElement.style.setProperty("--x", x)
        this.tileElement.style.setProperty("--y", y)
    }
    addValue(value){
        this.value = value;
        this.tileElement.textContent = this.value;
        this.tileElement.style.background = `rgb(${255 - value}, ${255 - value}, ${255 - value})`
        if(value > 128){
            this.tileElement.style.color = "white";
        }
        else{
            this.tileElement.style.color = "black"
        }
    }

    removeFromDOM(){
        this.tileElement.remove();
    }
    //отсюда всё и тянется
    waitForAnimate() {
        return new Promise(resolve => {
            this.tileElement.addEventListener("transitionend", resolve, {once:true})
        })
    }
}