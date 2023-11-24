//Converte string de data no formato 2023-11-21T03:00:00.000+00:00 para 21/11/2023
export function formatDateDayMonthYear(inputDateString) {
    const inputDate = new Date(inputDateString);
    if (isNaN(inputDate.getTime())) {
        return inputDateString;
    }
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear();
    return `${day}/${month}/${year}`;
}

//Converte string de data no formato 2023-11-21T03:00:00.000+00:00 para 2023-21-11
export function formatDateYearMonthDay(inputDateString) {
    const inputDate = new Date(inputDateString);  
    if (isNaN(inputDate.getTime())) {
      return inputDateString;
    }
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = inputDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }