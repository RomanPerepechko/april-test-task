export enum ViewMode {
    List = 'list',
    Grid = 'grid'
}

export interface PaginationParams {
    total: number,
    limit: number,
    page: number,
}