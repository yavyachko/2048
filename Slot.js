export class Slot{
    constructor(gridElement, x, y){
        const spot = document.createElement('div');
        spot.className = "slot";
        gridElement.append(spot);
        this.x = x;
        this.y = y;
    }
    setTile(tile){
        tile.setCords(this.x, this.y);
        this.linkedTile = tile;
    }

    linkTile(tile){
        tile.setCords(this.x, this.y);
        this.linkedTile = tile;
    }

    isEmpty(){
        return !this.linkedTile;
    }

    unlink(){
        this.linkedTile = null;
    }

    linkForResult(tile){
        tile.setCords(this.x, this.y);
        this.linkedTileForResult = tile;
    }

    hasTileResult(){
        return !!this.linkedTileForResult;
    }

    isReady(newTile){
        return this.isEmpty() || (!this.hasTileResult() && this.linkedTile.value === newTile.value);
    }

    unlinkResultTile(){
        this.linkedTileForResult = null;
    }

    resultTiles(){
        if (this.linkedTile != null){
            this.linkedTile.addValue(this.linkedTile.value + this.linkedTileForResult.value);
            this.linkedTileForResult.removeFromDOM();
            this.unlinkResultTile();
        }
    }
}

