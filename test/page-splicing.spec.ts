import PageSplicing from '../src/index';

beforeAll(async () => {
  PageSplicing.emptyChain();
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
    const handler = PageSplicing.utils.pagingLogic(getData, getCount);
    PageSplicing.next(handler)
  };
  const tc1 = await PageSplicing.start(1,5);

  expect(tc1).toEqual([2,2,3,3,3]);
  const tc2 = await PageSplicing.start(5,10);
  expect(tc2).toEqual([3,4,4,4,4,5,5,5,5,5]);
});

