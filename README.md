## 원티드 프리온보딩 프론트엔드 인턴십 2주차 과제

특정 깃헙 레파지토리([Issues react](https://github.com/facebook/react/issues))의 이슈 목록과 상세 내용을 확인하는 웹 사이트 구축

<br/>

## 프로젝트 실행 방법

```
git clone https://github.com/337yj/pre-onboarding-12th-2week.git

npm install
npm start
```

<br/>

## 폴더 구조

```
  📂 src
   ├─ api # 서버 요청 api
   │  ├─ apiClient
   │  └─ issue
   │
   ├─ components
   │  ├─ Common # 공통 컴포넌트
   │  │  ├─ Banner
   │  │  ├─ IssueItem
   │  │  └─ Loading
   │  │
   │  └─ Layout # Header, 레이아웃
   │  
   ├─ hook
   │  └─ useObserver # 인피니트 스크롤
   │  
   ├─ pages
   │  ├─ Home
   │  ├─ IssueDetail
   │  └─ NotFound
   │  
   ├─ router 
   └─ index.js
```

<br/>

## 기능 구현

### ✅ API 관리

```js
import axios from 'axios';

const ACCESS_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
});

apiClient.interceptors.request.use(async (config) => {
	if (ACCESS_TOKEN) {
		config.headers['Authorization'] = ACCESS_TOKEN;
		config.headers['X-GitHub-Api-Version'] = '2022-11-28';
	}

	return config;
});

export default apiClient;
```

```js
import apiClient from './apiClient';

export const ORGANIZATION = 'facebook';
export const REPOSITORY = 'react';

export const getIssueList = async (params) => {
	return await apiClient.get(`repos/${ORGANIZATION}/${REPOSITORY}/issues`, {
		params,
	});
};

export const getIssue = async (id) => {
	return await apiClient.get(`repos/${ORGANIZATION}/${REPOSITORY}/issues/${id}`);
};
```

- `axios의 intercepter`를 사용해 모든 요청에 일관된 헤더를 추가할 수 있어 코드 중복을 방지하고 효율적인 관리를 할 수 있도록 구현
- issue 요청 관련 API를 파일로 분리
- `ORGANIZATION`과 `REPOSITORY`를 변수로 만들어 레포지토리 변경 시 간단하게 변경, 헤더 타이틀로 재사용

<br/>

### ✅ 데이터 요청 중 로딩 표시

```js
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
	return (
		<div>
			<AiOutlineLoading3Quarters />
			<p>Loading</p>
		</div>
	);
};

export default Loading;
```

```js
// Home/index.js
const [issueList, setIssueList] = useState([]);
const [loading, setLoading] = useState(false);
const [nextPage, setNextPage] = useState(true);
const [page, setPage] = useState(1);

const getIssues = async () => {
	setLoading(true);
	const { data } = await getIssueList({ sort: 'comments', page, state: 'open' });
	if (data.length === 0) {
		setNextPage(false);
	} else {
		setIssueList((prev) => [...prev, ...data]);
		setPage((prev) => prev + 1);
	}
	setLoading(false);
};
...
return (
		<main>
			<ul>
				...
				{loading && <Loading />}
			</ul>
		</main>
	);
```

- Home, IssueDetail 컴포넌트에서 데이터 로딩 중인지를 나타내는 `loading` 변수를 `useState`를 사용하여 관리
- 데이터가 로딩 중인 동안에는 `setLoading(true)`를 호출하여 로딩 상태를 나타내고, 데이터 로딩이 완료되면 `setLoading(false)`를 호출하여 로딩 상태가 종료

  <br/>

### ✅ 인피니트 스크롤

```js
import { useEffect, useRef } from 'react';

const useObserver = (onIntersect, dependencyList) => {
	const targetRef = useRef(null);

	useEffect(() => {
		if (targetRef && targetRef.current) {
			const intersectionObserver = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);
						onIntersect();
					}
				});
			});

			intersectionObserver.observe(targetRef.current);
			return () => intersectionObserver.disconnect();
		}
	}, [targetRef, ...dependencyList]);

	return targetRef;
};

export default useObserver;
```

```js
// Home/index.js
...
const loadMore = async () => {
  if (nextPage && !loading) {
    await getIssues();
  }
};

const targetRef = useObserver(loadMore, [nextPage, loading]);

return (
  <main>
    <ul>
      ...
      <div ref={targetRef} />
    </ul>
  </main>
);
```

- 유지보수성, 가독성 높이기 위해 Custom Hook으로 구현
- `IntersectionObserver` 사용
- `useRef`로 `targetRef`를 생성하고 대상 컴포넌트의 `ref`에 연결
- `targetRef`로 설정한 요소가 뷰포트에 드러날 때 `loadMore` 함수를 호출
- `observer.unobserve`를 사용하여 콜백 호출 전에 관찰 해제

<br/>
