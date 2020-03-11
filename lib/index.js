"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dutyChain_1 = require("./dutyChain");
const utils_1 = require("./utils");
class PageSplicing {
    constructor() {
        this.dutyChains = [];
        this.dutyChains = [];
    }
    get chain() {
        return this.dutyChains;
    }
    get head() {
        return this.dutyChains[0];
    }
    get tail() {
        return this.dutyChains.slice(-1)[0];
    }
    get utils() {
        return {
            pagingLogic: (getData, getCount) => {
                return async (offset, pageSize, next) => {
                    return await utils_1.pagingLogic(getData, getCount, offset, pageSize, next);
                };
            },
        };
    }
    emptyChain() {
        this.dutyChains = [];
    }
    next(handler) {
        const nextChain = new dutyChain_1.default(handler);
        if (this.head) {
            this.head.setNext(nextChain);
        }
        this.dutyChains.unshift(nextChain);
        return this;
    }
    async start(pageIndex, pageSize) {
        if (!this.tail)
            throw new Error('duty chain is empty!');
        const ret = await this.tail.handleRequest(pageIndex, pageSize);
        return ret;
    }
}
exports.default = new PageSplicing();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBb0M7QUFDcEMsbUNBQXNDO0FBRXRDLE1BQU0sWUFBWTtJQUVoQjtRQURRLGVBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELElBQVksSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBWSxJQUFJO1FBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDZCxPQUFPO1lBQ0wsV0FBVyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNqQyxPQUFPLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO29CQUN0QyxPQUFPLE1BQU0sbUJBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQ3JFLENBQUMsQ0FBQTtZQUNILENBQUM7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUVNLFVBQVU7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBRU0sSUFBSSxDQUFDLE9BQWlCO1FBQzNCLE1BQU0sU0FBUyxHQUFHLElBQUksbUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6QyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRW5DLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFFBQVE7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRS9ELE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxZQUFZLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEdXR5Q2hhaW4gZnJvbSAnLi9kdXR5Q2hhaW4nO1xuaW1wb3J0IHsgcGFnaW5nTG9naWMgfSBmcm9tICcuL3V0aWxzJztcblxuY2xhc3MgUGFnZVNwbGljaW5nIHtcbiAgcHJpdmF0ZSBkdXR5Q2hhaW5zOiBEdXR5Q2hhaW5bXSA9IFtdO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmR1dHlDaGFpbnMgPSBbXTtcbiAgfVxuICBwdWJsaWMgZ2V0IGNoYWluKCkge1xuICAgIHJldHVybiB0aGlzLmR1dHlDaGFpbnM7XG4gIH1cblxuICBwcml2YXRlIGdldCBoZWFkKCkge1xuICAgIHJldHVybiB0aGlzLmR1dHlDaGFpbnNbMF07XG4gIH1cblxuICBwcml2YXRlIGdldCB0YWlsKCkge1xuICAgIHJldHVybiB0aGlzLmR1dHlDaGFpbnMuc2xpY2UoLTEpWzBdXG4gIH1cblxuICBwdWJsaWMgZ2V0IHV0aWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYWdpbmdMb2dpYzogKGdldERhdGEsIGdldENvdW50KSA9PiB7XG4gICAgICAgIHJldHVybiBhc3luYyAob2Zmc2V0LCBwYWdlU2l6ZSwgbmV4dCkgPT4ge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBwYWdpbmdMb2dpYyhnZXREYXRhLCBnZXRDb3VudCwgb2Zmc2V0LCBwYWdlU2l6ZSwgbmV4dClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZW1wdHlDaGFpbigpIHtcbiAgICB0aGlzLmR1dHlDaGFpbnMgPSBbXVxuICB9XG5cbiAgcHVibGljIG5leHQoaGFuZGxlcjogRnVuY3Rpb24pIHtcbiAgICBjb25zdCBuZXh0Q2hhaW4gPSBuZXcgRHV0eUNoYWluKGhhbmRsZXIpO1xuXG4gICAgaWYgKHRoaXMuaGVhZCkge1xuICAgICAgdGhpcy5oZWFkLnNldE5leHQobmV4dENoYWluKTtcbiAgICB9XG4gICAgdGhpcy5kdXR5Q2hhaW5zLnVuc2hpZnQobmV4dENoYWluKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHN0YXJ0KHBhZ2VJbmRleCwgcGFnZVNpemUpIHtcbiAgICBpZiAoIXRoaXMudGFpbCkgdGhyb3cgbmV3IEVycm9yKCdkdXR5IGNoYWluIGlzIGVtcHR5IScpO1xuICAgIGNvbnN0IHJldCA9IGF3YWl0IHRoaXMudGFpbC5oYW5kbGVSZXF1ZXN0KHBhZ2VJbmRleCwgcGFnZVNpemUpO1xuXG4gICAgcmV0dXJuIHJldFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBQYWdlU3BsaWNpbmcoKTtcbiJdfQ==