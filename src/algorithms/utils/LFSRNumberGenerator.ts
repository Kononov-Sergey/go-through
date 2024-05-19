const LFSRNumberGenerator = (
  buffer: number[],
  links: number[],
  numberToGenerate: number
) => {
  const innerBuffer = buffer.slice();
  const innerLinks = links.slice();
  const result = [];
  for (let i = 1; i < numberToGenerate; i++) {
    let index;
    let newNum = 0;
    for (let j = 0; j < innerLinks.length; j++) {
      index = innerLinks[j];
      newNum += innerBuffer[index] + (i + j) * +Math.PI.toFixed(0);
    }

    innerBuffer.pop();
    innerBuffer.unshift(newNum % 2);
    const bufferStr = innerBuffer.reduce((a, b) => {
      return a + b;
    }, "");

    result.push(parseInt(bufferStr, 2));
  }
  return result;
};
export default LFSRNumberGenerator;
