const generateDoors = (horizontalSplit: number, verticalSplit: number) => {
  const doors = [
    [
      horizontalSplit,
      Math.floor((Math.random() * verticalSplit) / 2) + verticalSplit / 2,
    ],
    [horizontalSplit, Math.floor(Math.random() * verticalSplit) + verticalSplit],
    [
      Math.floor((Math.random() * horizontalSplit) / 2) + horizontalSplit / 2,
      verticalSplit,
    ],
    [Math.floor(Math.random() * horizontalSplit) + horizontalSplit, verticalSplit],
  ];

  doors.splice(Math.floor(Math.random() * doors.length), 1);

  return doors;
};

export default generateDoors;
