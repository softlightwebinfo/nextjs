import {SubMenu} from "@models/SubMenu";
export class Menu {
    private _label!: string;
    private _route!: string;
    private _submenus: SubMenu[] = [];

    get submenus(): SubMenu[] {
        return this._submenus;
    }

    set submenus(value: SubMenu[]) {
        this._submenus = value;
    }

    constructor(label: string, route: string, subMenus: SubMenu[] = []) {
        this.label = label;
        this.route = route;
        this.submenus = subMenus;
    }

    get route(): string {
        return this._route;
    }

    set route(value: string) {
        this._route = value;
    }

    get label(): string {
        return this._label;
    }

    set label(value: string) {
        this._label = value;
    }
}
