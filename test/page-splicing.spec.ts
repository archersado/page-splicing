import PageSplicing from '../src/index';

const ps = new PageSplicing();
beforeAll(async () => {
  ps.emptyChain();
})
const getDataMock = data => {
  return async (param) => new Promise(resolve => {
    const { pageSize, offset } = param;
    setTimeout(() => {
      if (Array.isArray(data)) {
        const offsetData = data.filter((_el, i) => i >= offset).filter((_el, i) => i < pageSize);
        resolve(offsetData);
      } else {
        resolve(data);
      }
    }, 0)
  })
}

test("base page splicing", async () => {
  const list = [1,2,3,4,5];
  for (const item of list) {
    const data = new Array(item).fill(item);
    const count = item;
    const getData = getDataMock(data);
    const getCount = getDataMock(count);
    const handler = ps.utils.pagingLogic(getData, getCount);
    ps.next(handler)
  };
  const tc1 = await ps.start(1,5);

  expect(tc1).toEqual([2,2,3,3,3]);
  const tc2 = await ps.start(5,10);
  expect(tc2).toEqual([3,4,4,4,4,5,5,5,5,5]);
});

