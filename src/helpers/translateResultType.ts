function translateResultHeader(type: string): string {
    switch (type) {
        case 'TIME': 
            return 'Tid (T:M:S:HS)';
        case 'DISTANCE':
            return 'Afstand (M.CM)';
        case 'POINTS':
            return 'Point';
        default:
            return 'Resultat';
    }
}

export { translateResultHeader }