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
