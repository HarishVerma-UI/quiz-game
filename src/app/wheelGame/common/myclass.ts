import { GameService } from "../service/game.service";
import { commonModel } from "./commonModel";

export class commonGameUtilityCollectionClass {
    collection: commonModel[];

    constructor() {
        this.collection = [];
    }

    push(value: string) {
        this.collection.push({ id: this.getNextId(), value: value });
    }

    update(value: commonModel) {
        this.collection[this.findIndex(value)] = value;
    }

    delete(value: commonModel) {
        var index = this.findIndex(value);
        this.collection.splice(index, 1);
        this.reorderCollectionIndex();
    }

    private reorderCollectionIndex() {
        for (let i = 0; i < this.collection.length; i++) {
            this.collection[i].id = i + 1;
        }
    }

    private getNextId(): number {
        if (this.collection.length - 1 < 0) return 1;

        return this.collection[this.collection.length - 1].id + 1;
    }

    private alreadyExist(obj: commonModel): boolean {
        if (this.findIndex(obj) === -1) return false;

        return true;
    }

    private findIndex(obj: commonModel) {
        return this.collection.findIndex(q => q.id === obj.id || q.value === obj.value);
    }

    ConvertStringToArray(text: string) {
        let x = text.split(";").filter(m => m !== "");
        let array: commonModel[] = [];
        for (let i = 1; i <= x.length; i++) {
            array.push({ id: i, value: x[i - 1] });
        }

        return array;
    }

    ConvertArrayToString(list: commonModel[]): string {
        let returnValue: string = "";
        list.forEach(element => {
            returnValue = returnValue.concat(element.value + ";");
        });

        return returnValue;
    }


}