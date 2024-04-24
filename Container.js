import { Slot } from "./Slot.js";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE*GRID_SIZE;

export class Container {
    constructor(gridElem){
        this.slots = []
        for(let i = 0; i< CELLS_COUNT; i++){
            this.slots.push(
                new Slot(gridElem, i % GRID_SIZE, parseInt(i / GRID_SIZE))
            )
        }
        this.slotsGroupedArrayY = this.slotsToArrayY();
        this.slotsGroupedReverseArrayY = this.slotsGroupedArrayY.map(column => [...column].reverse())
        this.slotsGroupedArrayX = this.slotsToArrayX();
        this.slotsGroupedReverseArrayX = this.slotsGroupedArrayX.map(row => [...row].reverse())
    }

    getEmptySlot(){
        const emptySlots = this.slots.filter(elem => elem.isEmpty());
        const returnIndex = parseInt(Math.random()* emptySlots.length);
        return emptySlots[returnIndex];
    }

    slotsToArrayY(){
        return this.slots.reduce((groupSlots, slot) =>{
            groupSlots[slot.x] = groupSlots[slot.x] || [];
            groupSlots[slot.x][slot.y] = slot;
            return groupSlots;
        }, [])
    }

    slotsToArrayX(){
        return this.slots.reduce((groupSlots, slot) =>{
            groupSlots[slot.y] = groupSlots[slot.y] || [];
            groupSlots[slot.y][slot.x] = slot;
            return groupSlots;
        }, [])
    }

}