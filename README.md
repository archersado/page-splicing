# page-splicing

Splicing data in different backend system, a common problem in BFF layer.
Using Duty Chain to make it easy for extension.

解决BFF层常见了多后端系统分页拼接问题。利用职责链提供符合开闭原则的分页拼接方案。

## Install

```

```bash
$ npm install page-splicing
```

## How to use

tips: the interface to get data from backend should support search by offset(related to primary key or index)
获取后端数据的接口需要支持偏移量查询(这个偏移量可以被计算为主键或数据索引)

```typescript
import PageSplicing from 'page-splicing';
import rp from 'rp'

const getData = async function (currentPage, pageSize) {
  const firstSystemData = async (param) => {
    const { data, count } = await rp({ url: 'domainA.com', qs: param });
    // your logic 
    return { data, count }
  }

  const secondSystemData = async (param) => {
    const { data, count } = await rp({ url: 'domainA.com', qs: param });
    // your logic 
    return { data, count }
  }

  PageSplicing.next(firstSystemData).next(secondSystemData);
  
  return await PageSplicing.run(currentPage, pageSize);
}

const data = await getData(1, 10);
```
