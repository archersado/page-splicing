 import * as is from 'is-type-of';
  /**
   * 分页拼接逻辑
   *
   * @private
   * @param {*} getData 获取数据函数
   * @param {*} getCount 获取数量函数
   * @param {*} offset 偏移量
   * @param {*} pageSize 页大小
   * @param {*} next 职责链下一环
   * @param {*} [param={}] 需要传递的参数可省略
   * @returns
   * @memberof TodoService
   */
export const pagingLogic = async (getData, getCount, offset, pageSize, next, param = {}) => {
  let count;
  let data;
  if (is.asyncFunction(getCount)) {
    count = await getCount(param);
  } else {
    count = getCount(param);
  }
  if (count > offset) {
    const currentSize = count - offset;

    if (currentSize >= pageSize) {
      const getDataParam = {
        ...param,
        startRow: offset,
        pageSize,
      };
      if (is.asyncFunction(getData)) {
        return await getData(getDataParam);
      }
      return getData(getDataParam);
    }  {
      if (is.asyncFunction(getData)) {
        data = await getData({ ...param, startRow: offset, pageSize: currentSize });
      } else {
        data = getData({ ...param, startRow: offset, pageSize: currentSize });
      }
       const otherData = await next(0, pageSize - currentSize) || [];
      return [...data, ...otherData];
    }
  }  {
    const secondOffset = offset - count;
    const result = await next(secondOffset, pageSize) || [];
    return result;
  }
};
