export interface PaginationInterface {
	items: object[];
	paging: {
		previous: string | null;
		next: string | null;
		cursors: {
			before: number | string | null;
			after: number | string | null;
		};
		remaining_items: number | null;
	};
}
