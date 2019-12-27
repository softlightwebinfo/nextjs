export class Pagination {
    /**
     * Get total pages count
     * @param pageLength
     * @param totalItems
     */
    public static getPagesCount(pageLength: number, totalItems: number): number {
        return Math.ceil(totalItems / pageLength);
    }
}
