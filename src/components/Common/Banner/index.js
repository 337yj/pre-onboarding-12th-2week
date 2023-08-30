import React from 'react';

const Banner = () => {
	return (
		<a href={BANNER_INFO.to}>
			<img src={BANNER_INFO.img} alt="wanted banner" />
		</a>
	);
};

export const BANNER_INFO = {
	to: 'https://www.wanted.co.kr/',
	img: 'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100',
};

export default Banner;
