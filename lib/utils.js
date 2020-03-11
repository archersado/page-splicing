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
            const getDataParam = Object.assign(Object.assign({}, param), { startRow: offset, pageSize });
            if (is.asyncFunction(getData)) {
                return await getData(getDataParam);
            }
            return getData(getDataParam);
        }
        {
            if (is.asyncFunction(getData)) {
                data = await getData(Object.assign(Object.assign({}, param), { startRow: offset, pageSize: currentSize }));
            }
            else {
                data = getData(Object.assign(Object.assign({}, param), { startRow: offset, pageSize: currentSize }));
            }
            const otherData = await next(0, pageSize - currentSize) || [];
            return [...data, ...otherData];
        }
    }
    {
        const secondOffset = offset - count;
        const result = await next(secondOffset, pageSize) || [];
        return result;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQyxpQ0FBaUM7QUFDaEM7Ozs7Ozs7Ozs7OztHQVlHO0FBQ1EsUUFBQSxXQUFXLEdBQUcsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3pGLElBQUksS0FBSyxDQUFDO0lBQ1YsSUFBSSxJQUFJLENBQUM7SUFDVCxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDOUIsS0FBSyxHQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQy9CO1NBQU07UUFDTCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3pCO0lBQ0QsSUFBSSxLQUFLLEdBQUcsTUFBTSxFQUFFO1FBQ2xCLE1BQU0sV0FBVyxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUM7UUFFbkMsSUFBSSxXQUFXLElBQUksUUFBUSxFQUFFO1lBQzNCLE1BQU0sWUFBWSxtQ0FDYixLQUFLLEtBQ1IsUUFBUSxFQUFFLE1BQU0sRUFDaEIsUUFBUSxHQUNULENBQUM7WUFDRixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzdCLE9BQU8sTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDcEM7WUFDRCxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM5QjtRQUFFO1lBQ0QsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM3QixJQUFJLEdBQUcsTUFBTSxPQUFPLGlDQUFNLEtBQUssS0FBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLElBQUcsQ0FBQzthQUM3RTtpQkFBTTtnQkFDTCxJQUFJLEdBQUcsT0FBTyxpQ0FBTSxLQUFLLEtBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxJQUFHLENBQUM7YUFDdkU7WUFDQSxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvRCxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztTQUNoQztLQUNGO0lBQUU7UUFDRCxNQUFNLFlBQVksR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEQsT0FBTyxNQUFNLENBQUM7S0FDZjtBQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiBpbXBvcnQgKiBhcyBpcyBmcm9tICdpcy10eXBlLW9mJztcbiAgLyoqXG4gICAqIOWIhumhteaLvOaOpemAu+i+kVxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0geyp9IGdldERhdGEg6I635Y+W5pWw5o2u5Ye95pWwXG4gICAqIEBwYXJhbSB7Kn0gZ2V0Q291bnQg6I635Y+W5pWw6YeP5Ye95pWwXG4gICAqIEBwYXJhbSB7Kn0gb2Zmc2V0IOWBj+enu+mHj1xuICAgKiBAcGFyYW0geyp9IHBhZ2VTaXplIOmhteWkp+Wwj1xuICAgKiBAcGFyYW0geyp9IG5leHQg6IGM6LSj6ZO+5LiL5LiA546vXG4gICAqIEBwYXJhbSB7Kn0gW3BhcmFtPXt9XSDpnIDopoHkvKDpgJLnmoTlj4LmlbDlj6/nnIHnlaVcbiAgICogQHJldHVybnNcbiAgICogQG1lbWJlcm9mIFRvZG9TZXJ2aWNlXG4gICAqL1xuZXhwb3J0IGNvbnN0IHBhZ2luZ0xvZ2ljID0gYXN5bmMgKGdldERhdGEsIGdldENvdW50LCBvZmZzZXQsIHBhZ2VTaXplLCBuZXh0LCBwYXJhbSA9IHt9KSA9PiB7XG4gIGxldCBjb3VudDtcbiAgbGV0IGRhdGE7XG4gIGlmIChpcy5hc3luY0Z1bmN0aW9uKGdldENvdW50KSkge1xuICAgIGNvdW50ID0gYXdhaXQgZ2V0Q291bnQocGFyYW0pO1xuICB9IGVsc2Uge1xuICAgIGNvdW50ID0gZ2V0Q291bnQocGFyYW0pO1xuICB9XG4gIGlmIChjb3VudCA+IG9mZnNldCkge1xuICAgIGNvbnN0IGN1cnJlbnRTaXplID0gY291bnQgLSBvZmZzZXQ7XG5cbiAgICBpZiAoY3VycmVudFNpemUgPj0gcGFnZVNpemUpIHtcbiAgICAgIGNvbnN0IGdldERhdGFQYXJhbSA9IHtcbiAgICAgICAgLi4ucGFyYW0sXG4gICAgICAgIHN0YXJ0Um93OiBvZmZzZXQsXG4gICAgICAgIHBhZ2VTaXplLFxuICAgICAgfTtcbiAgICAgIGlmIChpcy5hc3luY0Z1bmN0aW9uKGdldERhdGEpKSB7XG4gICAgICAgIHJldHVybiBhd2FpdCBnZXREYXRhKGdldERhdGFQYXJhbSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0RGF0YShnZXREYXRhUGFyYW0pO1xuICAgIH0gIHtcbiAgICAgIGlmIChpcy5hc3luY0Z1bmN0aW9uKGdldERhdGEpKSB7XG4gICAgICAgIGRhdGEgPSBhd2FpdCBnZXREYXRhKHsgLi4ucGFyYW0sIHN0YXJ0Um93OiBvZmZzZXQsIHBhZ2VTaXplOiBjdXJyZW50U2l6ZSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEgPSBnZXREYXRhKHsgLi4ucGFyYW0sIHN0YXJ0Um93OiBvZmZzZXQsIHBhZ2VTaXplOiBjdXJyZW50U2l6ZSB9KTtcbiAgICAgIH1cbiAgICAgICBjb25zdCBvdGhlckRhdGEgPSBhd2FpdCBuZXh0KDAsIHBhZ2VTaXplIC0gY3VycmVudFNpemUpIHx8IFtdO1xuICAgICAgcmV0dXJuIFsuLi5kYXRhLCAuLi5vdGhlckRhdGFdO1xuICAgIH1cbiAgfSAge1xuICAgIGNvbnN0IHNlY29uZE9mZnNldCA9IG9mZnNldCAtIGNvdW50O1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG5leHQoc2Vjb25kT2Zmc2V0LCBwYWdlU2l6ZSkgfHwgW107XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbiJdfQ==