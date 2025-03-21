export const getRandomColor = () => {
  const colors = ["#FF66A8", "#FFD86D", "#FD9A6A", "#89B6FF"];
  return colors[Math.floor(Math.random() * colors.length)];
};
