export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(date);

  return formattedDate;
};

export const formatMonthYear = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(date);

  return formattedDate;
};
