import {Container} from "./Container.js"
import {Tile} from "./Tile.js"

const gridContainer = document.getElementById("gridContainer");
const container = new Container(gridContainer);

container.getEmptySlot().setTile(new Tile(gridContainer));
container.getEmptySlot().setTile(new Tile(gridContainer));

function setInputOnce(){
    window.addEventListener("keydown", inputKey, {once: true})
}
async function inputKey(event){
    switch(event.key){
        case "w":
        case "ArrowUp":
            await moveUp();
            break;
        case "s":
        case "ArrowDown":
            await moveDown();
            break;
        case "a":
        case "ArrowLeft":
            await moveLeft();
            break;
        case "d":
        case "ArrowRight":
            await moveRight();
            break; 
        default:
            console.log(event.key)
            setInputOnce();
            return;
    }   
    const newTile = new Tile(gridContainer)
    container.getEmptySlot().linkTile(newTile);
    setInputOnce();
}
async function slideTiles(groupSlots) {
    const promises = [];

    groupSlots.forEach(slotGroup => { slideTilesGroup(slotGroup, promises)});

    await Promise.all(promises);

    container.slots.forEach(slot =>{
        slot.hasTileResult() && slot.resultTiles();
    })
}
function slideTilesGroup(group, promises){
    for(let i = 1; i<group.length; i++){
        if(group[i].isEmpty()){
            continue;
        }

        const linkedSlot = group[i];
        let target;
        let j = i-1;
        while(j >= 0 && group[j].isReady(linkedSlot.linkedTile)){
            target = group[j];
            j--;
        }
        if(!target){
            continue;
        }

        promises.push(linkedSlot.linkedTile.waitForAnimate())

        if(target.isEmpty() ){
            target.linkTile(linkedSlot.linkedTile)
        }else{
            target.linkForResult(linkedSlot.linkedTile)
        }
        linkedSlot.unlink();
    }
}
async function moveUp(){
    await slideTiles(container.slotsGroupedArrayY)
}
async function moveDown(){
    await slideTiles(container.slotsGroupedReverseArrayY);
}
async function moveLeft(){
    await slideTiles(container.slotsGroupedArrayX)
}
async function moveRight(){
   await slideTiles(container.slotsGroupedReverseArrayX);
}
setInputOnce();