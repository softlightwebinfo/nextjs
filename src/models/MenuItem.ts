export class MenuItem {
    private route: string;
    private active: boolean;
    private label: string;
    private icon: string;
    private tag: string;

    constructor(route: string, label: string, active: boolean = false, icon: string, tag: string = "") {
        this.route = route;
        this.label = label;
        this.active = active;
        this.icon = icon;
        this.tag = tag;
    }

    getRoute(): string {
        return this.route;
    }

    getActive(): boolean {
        return this.active;
    }

    getLabel(): string {
        return this.label;
    }

    setRoute(route: string): void {
        this.route = route;
    }

    setActive(active: boolean): void {
        this.active = active;
    }

    setLabel(label: string): void {
        this.label = label;
    }

    setIcon(icon: string): void {
        this.icon = icon;
    }

    getIcon(): string {
        return this.icon;
    }

    setTag(tag: string): void {
        this.tag = tag;
    }

    getTag(): string {
        return this.tag;
    }
}
