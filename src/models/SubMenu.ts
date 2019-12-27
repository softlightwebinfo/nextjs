export class SubMenu {
    private _image!: string;
    private _title!: string;
    private _category!: string;
    private _time!: string;

    get time(): string {
        return this._time;
    }

    set time(value: string) {
        this._time = value;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }

    constructor(title: string, category: string, image: string, time: string) {
        this.title = title;
        this.category = category;
        this.image = image;
        this.time = time;
    }

}
