## 请求接口放置的位置（按照模块分类）

默认写法

```typescript
import { PostRequestModel, GetRequestModel, PutRequestModel, DeleteRequestModel } from '@dc/vue-web-base/src/utils/model/request-model'
import { PageModel } from '@dc/vue-web-base/src/utils/model/result-model'

// 当前模块通用请求前缀
const MODULE_API_PREFIX = '/system/factor'

export default {
	page: (query?: {}) => new PostRequestModel<PageModel<unknown>>(`${MODULE_API_PREFIX}/page`, query).request(),
	formSelect: (query?: {}) => new PostRequestModel<Array<unknown>>(`${MODULE_API_PREFIX}/all`, query).request(),
	map: (query?: {}) => new PostRequestModel<Array<unknown>>(`${MODULE_API_PREFIX}/map`, query).request(),
	getById: (id: string) => new GetRequestModel<unknown>(`${MODULE_API_PREFIX}/${id}`, {}).request(),
	add: (data: {}) => new PostRequestModel<unknown>(`${MODULE_API_PREFIX}/`, data).request(),
	update: (id: string, data: {}) => new PutRequestModel<unknown>(`${MODULE_API_PREFIX}/${id}`, data).request(),
	delete: (id: string) => new DeleteRequestModel<unknown>(`${MODULE_API_PREFIX}/${id}`, {}).request()
}
```

上述代码中 unknown 需要用具体的 entity 对象代替
