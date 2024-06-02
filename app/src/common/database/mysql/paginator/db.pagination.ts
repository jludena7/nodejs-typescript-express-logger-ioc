export default class DbPagination<T> {
	items: T[];

	cursors: DbPaginationCursor<T>;

	remainingItems!: number;

	constructor(
		items: T[],
		cursor: DbPaginationCursor<T>,
		remainingItems: number
	) {
		this.items = items;
		this.cursors = cursor;
		this.remainingItems = remainingItems;
	}
}

export interface DbPaginationCursor<T> {
	before: T | null;
	after: T | null;
}
