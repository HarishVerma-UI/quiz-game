import { GameService } from "../service/game.service";
import { commonGameUtilityCollectionClass } from "./myclass";

export class nameClass extends commonGameUtilityCollectionClass {
    key: string = "name";

    constructor(private service: GameService = new GameService()) {
        super();
        this.setCollection();
    }

    updateService() {
        this.service.save(this.key, this.ConvertArrayToString(this.collection));
    }

    setCollection(){
        let d = this.service.getNames();

        if(d!==null) this.collection = this.ConvertStringToArray(d);
    }

}