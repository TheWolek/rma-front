const formatTime = function (dateIn) {
  const d = new Date(dateIn);
  return (
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2) +
    ":" +
    ("0" + d.getSeconds()).slice(-2)
  );
};

export default formatTime;
