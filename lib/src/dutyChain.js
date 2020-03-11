"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DutyChain {
    constructor(fn) {
        this.fn = fn;
    }
    async handleRequest(...outer) {
        const next = async (...args) => {
            if (!this.next || !this.next.handleRequest)
                return;
            const result = await this.next.handleRequest(...args);
            console.log(result);
            return result;
        };
        return await this.fn(...outer, next);
    }
    setNext(successor) {
        this.next = successor;
        return this.next;
    }
}
exports.default = DutyChain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHV0eUNoYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2R1dHlDaGFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQXFCLFNBQVM7SUFHNUIsWUFBWSxFQUFFO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUs7UUFDMUIsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7Z0JBQUUsT0FBTztZQUVuRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7WUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUE7UUFDRCxPQUFPLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsT0FBTyxDQUFDLFNBQVM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUV0QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBdkJELDRCQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIER1dHlDaGFpbiB7XG4gIG5leHQ6IGFueTtcbiAgZm46IEZ1bmN0aW9uO1xuICBjb25zdHJ1Y3RvcihmbikgeyBcbiAgICB0aGlzLmZuID0gZm47XG4gIH1cblxuICBhc3luYyBoYW5kbGVSZXF1ZXN0KC4uLm91dGVyKSB7XG4gICAgY29uc3QgbmV4dCA9IGFzeW5jICguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoIXRoaXMubmV4dCB8fCAhdGhpcy5uZXh0LmhhbmRsZVJlcXVlc3QpIHJldHVybjtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5uZXh0LmhhbmRsZVJlcXVlc3QoLi4uYXJncylcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gYXdhaXQgdGhpcy5mbiguLi5vdXRlciwgbmV4dCk7XG4gIH1cblxuICBzZXROZXh0KHN1Y2Nlc3Nvcikge1xuICAgIHRoaXMubmV4dCA9IHN1Y2Nlc3NvcjtcblxuICAgIHJldHVybiB0aGlzLm5leHQ7XG4gIH1cbn0iXX0=