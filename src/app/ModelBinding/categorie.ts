export class Categorie{
_id:string;
    name:string;
    _journal:string;

        constructor(data) {
        Object.assign(this, data);
    }
}