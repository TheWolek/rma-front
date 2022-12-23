const getTypeDisplayName = function (id) {
  switch (id) {
    case 1:
      return "Naprawa gwarancyjna";
    case 2:
      return "Naprawa płatna";
  }
};

export default getTypeDisplayName;
