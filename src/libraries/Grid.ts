import {ReactElement} from "react";

export class Grid {
    private columns: number;
    private rows: any[];
    private group: any[];
    private result: any[];
    private count: number;
    private total: number;
    private column: number;

    constructor(columns: number, rows: any[]) {
        this.columns = columns;
        this.rows = rows;
        this.result = [];
        this.group = [];
    }

    public generateColumns(rows: any[] = this.rows) {
        this.group = [];
        this.result = [];
        this.total = rows.length;
        this.count = Math.ceil(this.total / this.columns);
        this.column = 0;

        for (let i = 0; i < this.columns; i++) {
            let group = [];
            for (let o = 0; o < this.count; o++) {
                group = [...group, ...this.rows.splice(0, 1)]
            }
            this.result.push(group);
        }
    }

    public getResult(): any[] {
        return this.result;
    }

    public render(renderColumn: (children: ReactElement<any>, item: any[], index: number) => void, renderItem: (item: any, index: number) => void) {
        return this.result.map((item, index) => {
            return renderColumn(item.map((it, ind) => renderItem(it, ind)), item, index)
        });
    }
}
