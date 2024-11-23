export function formatDate(date: string){
    const dateFormatted = new Date(date).toLocaleDateString();
    return dateFormatted
}