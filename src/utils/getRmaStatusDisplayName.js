const getStatusDisplayName = function (id) {
  switch (id) {
    case 1:
      return "Nowe";
    case 2:
      return "Przyjęto w serwisie";
    case 3:
      return "W realizacji";
    case 4:
      return "Zlecono kontakt";
    case 5:
      return "Oczekuje na części";
    case 6:
      return "Przekazano do odesłania";
    case 7:
      return "Zakończone";
    case 8:
      return "Anulowane";
  }
};

export default getStatusDisplayName;
