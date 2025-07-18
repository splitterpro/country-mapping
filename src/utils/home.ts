export const filterCountryList = [
    { "id": "ALL", "name": "All" },
    { "id": "ASIA", "name": "Asia" },
    { "id": "EUROPE", "name": "Europe" }
]

export function getNextSlideIndex(current: number, total: number, direction: string, selectIndex?: number): number {
    switch (direction) {
        case 'next':
            return (current + 1) % total;
        case 'previous':
            return current === 0 ? total - 1 : current - 1;
        case 'select':
            return typeof selectIndex === 'number' ? selectIndex : 0;
        default:
            return current;
    }
}