"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is = require("is-type-of");
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
exports.pagingLogic = async (getData, getCount, offset, pageSize, next, param = {}) => {
    let count;
    let data;
    if (is.asyncFunction(getCount)) {
        count = await getCount(param);
    }
    else {
        count = getCount(param);
    }
    if (count > offset) {
        const currentSize = count - offset;
        if (currentSize >= pageSize) {
            const getDataParam = Object.assign(Object.assign({}, param), { offset,
                pageSize });
            if (is.asyncFunction(getData)) {
                return await getData(getDataParam);
            }
            return getData(getDataParam);
        }
        else {
            if (is.asyncFunction(getData)) {
                data = await getData(Object.assign(Object.assign({}, param), { offset, pageSize: currentSize }));
            }
            else {
                data = getData(Object.assign(Object.assign({}, param), { offset, pageSize: currentSize }));
            }
            const otherData = await next(0, pageSize - currentSize) || [];
            return [...data, ...otherData];
        }
    }
    else {
        const secondOffset = offset - count;
        const result = await next(secondOffset, pageSize) || [];
        return result;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBRSxpQ0FBaUM7QUFDakM7Ozs7Ozs7Ozs7OztHQVlHO0FBQ1EsUUFBQSxXQUFXLEdBQUcsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3ZGLElBQUksS0FBSyxDQUFDO0lBQ1YsSUFBSSxJQUFJLENBQUM7SUFDVCxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDOUIsS0FBSyxHQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQy9CO1NBQU07UUFDTCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3pCO0lBQ0QsSUFBSSxLQUFLLEdBQUcsTUFBTSxFQUFFO1FBQ2xCLE1BQU0sV0FBVyxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUM7UUFFbkMsSUFBSSxXQUFXLElBQUksUUFBUSxFQUFFO1lBQzNCLE1BQU0sWUFBWSxtQ0FDYixLQUFLLEtBQ1IsTUFBTTtnQkFDTixRQUFRLEdBQ1QsQ0FBQTtZQUVELElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDN0IsT0FBTyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztZQUNELE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlCO2FBQU07WUFDTCxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzdCLElBQUksR0FBRyxNQUFNLE9BQU8saUNBQU0sS0FBSyxLQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxJQUFHLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0wsSUFBSSxHQUFHLE9BQU8saUNBQU0sS0FBSyxLQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxJQUFHLENBQUE7YUFDNUQ7WUFDRCxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM5RCxPQUFPLENBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUUsQ0FBQztTQUNsQztLQUNGO1NBQU07UUFDTCxNQUFNLFlBQVksR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7UUFFdkQsT0FBTyxNQUFNLENBQUM7S0FDZjtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIiAgaW1wb3J0ICogYXMgaXMgZnJvbSAnaXMtdHlwZS1vZic7XG4gIC8qKlxuICAgKiDliIbpobXmi7zmjqXpgLvovpFcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHsqfSBnZXREYXRhIOiOt+WPluaVsOaNruWHveaVsFxuICAgKiBAcGFyYW0geyp9IGdldENvdW50IOiOt+WPluaVsOmHj+WHveaVsFxuICAgKiBAcGFyYW0geyp9IG9mZnNldCDlgY/np7vph49cbiAgICogQHBhcmFtIHsqfSBwYWdlU2l6ZSDpobXlpKflsI9cbiAgICogQHBhcmFtIHsqfSBuZXh0IOiBjOi0o+mTvuS4i+S4gOeOr1xuICAgKiBAcGFyYW0geyp9IFtwYXJhbT17fV0g6ZyA6KaB5Lyg6YCS55qE5Y+C5pWw5Y+v55yB55WlXG4gICAqIEByZXR1cm5zXG4gICAqIEBtZW1iZXJvZiBUb2RvU2VydmljZVxuICAgKi9cbmV4cG9ydCBjb25zdCBwYWdpbmdMb2dpYyA9IGFzeW5jIChnZXREYXRhLCBnZXRDb3VudCwgb2Zmc2V0LCBwYWdlU2l6ZSwgbmV4dCwgcGFyYW0gPSB7fSkgPT4ge1xuICAgIGxldCBjb3VudDtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoaXMuYXN5bmNGdW5jdGlvbihnZXRDb3VudCkpIHtcbiAgICAgIGNvdW50ID0gYXdhaXQgZ2V0Q291bnQocGFyYW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCA9IGdldENvdW50KHBhcmFtKTtcbiAgICB9XG4gICAgaWYgKGNvdW50ID4gb2Zmc2V0KSB7XG4gICAgICBjb25zdCBjdXJyZW50U2l6ZSA9IGNvdW50IC0gb2Zmc2V0O1xuXG4gICAgICBpZiAoY3VycmVudFNpemUgPj0gcGFnZVNpemUpIHtcbiAgICAgICAgY29uc3QgZ2V0RGF0YVBhcmFtID0ge1xuICAgICAgICAgIC4uLnBhcmFtLFxuICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICBwYWdlU2l6ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzLmFzeW5jRnVuY3Rpb24oZ2V0RGF0YSkpIHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0RGF0YShnZXREYXRhUGFyYW0pO1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZ2V0RGF0YShnZXREYXRhUGFyYW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzLmFzeW5jRnVuY3Rpb24oZ2V0RGF0YSkpIHtcbiAgICAgICAgICBkYXRhID0gYXdhaXQgZ2V0RGF0YSh7IC4uLnBhcmFtLCBvZmZzZXQsIHBhZ2VTaXplOiBjdXJyZW50U2l6ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXRhID0gZ2V0RGF0YSh7IC4uLnBhcmFtLCBvZmZzZXQsIHBhZ2VTaXplOiBjdXJyZW50U2l6ZSB9KVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG90aGVyRGF0YSA9IGF3YWl0IG5leHQoMCwgcGFnZVNpemUgLSBjdXJyZW50U2l6ZSkgfHwgW107XG4gICAgICAgIHJldHVybiBbIC4uLmRhdGEsIC4uLm90aGVyRGF0YSBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWNvbmRPZmZzZXQgPSBvZmZzZXQgLSBjb3VudDsgICAgICBcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG5leHQoc2Vjb25kT2Zmc2V0LCBwYWdlU2l6ZSkgfHwgW11cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0iXX0=