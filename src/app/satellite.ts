export class Satellite {
    name: string;
    orbitType: string;
    type: string;
    operational: boolean;
    launchDate: string;
    warning: boolean;
    //shouldShowWarning: boolean;

    constructor(name: string, type: string, launchDate: string, orbitType: string, operational: boolean) {
        this.name = name;
        this.type = type;
        this.launchDate = launchDate;
        this.orbitType = orbitType;
        this.operational = operational;
    }

    shouldShowWarning(): boolean {
        //console.log("hit shouldshowwarning function");
        if(this.type.toLowerCase() === "space debris") {
            console.log("hit function if, return true");
            //let warning: boolean = true;
            return true;
        } else {
            return false;
        }
    }
}



