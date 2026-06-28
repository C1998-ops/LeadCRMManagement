import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Loader: React.FC = () => {
	const isLoading = useSelector((state: RootState) => state.loading.isLoading);

	if (!isLoading) return null;

	return (
		<div className="fixed top-0 left-0 w-full h-full flex flex-col-reverse items-center justify-center z-50 bg-black bg-opacity-10">
			<span className="text-lg text-gray-500">Loading...</span>
			<svg 
				xmlns="http://www.w3.org/2000/svg" 
				width="56" 
				height="57" 
				viewBox="0 0 56 57" 
				fill="none"
				className="animate-spin"
			>
				<g clipPath="url(#paint0_angular_12860_24247_clip_path)" data-figma-skip-parse="true">
					<g transform="matrix(0 0.028 -0.028 0 28 28.1172)">
						<foreignObject x="-1035.71" y="-1035.71" width="2071.43" height="2071.43">
							<div style={{background: "conic-gradient(from 90deg,rgba(99, 116, 234, 1) 0deg,rgba(99, 116, 234, 0) 360deg)", height: "100%", width: "100%", opacity: 1}}></div>
						</foreignObject>
					</g>
				</g>
				<path d="M56 28.1172C56 43.5812 43.464 56.1172 28 56.1172C12.536 56.1172 0 43.5812 0 28.1172C0 12.6532 12.536 0.117188 28 0.117188C43.464 0.117188 56 12.6532 56 28.1172ZM7.84 28.1172C7.84 39.2512 16.8659 48.2772 28 48.2772C39.1341 48.2772 48.16 39.2512 48.16 28.1172C48.16 16.9831 39.1341 7.95719 28 7.95719C16.8659 7.95719 7.84 16.9831 7.84 28.1172Z" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_ANGULAR&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.38823530077934265,&quot;g&quot;:0.45490196347236633,&quot;b&quot;:0.91764706373214722,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:0.38823530077934265,&quot;g&quot;:0.45490196347236633,&quot;b&quot;:0.91764706373214722,&quot;a&quot;:0.0},&quot;position&quot;:1.0}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.38823530077934265,&quot;g&quot;:0.45490196347236633,&quot;b&quot;:0.91764706373214722,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:0.38823530077934265,&quot;g&quot;:0.45490196347236633,&quot;b&quot;:0.91764706373214722,&quot;a&quot;:0.0},&quot;position&quot;:1.0}],&quot;transform&quot;:{&quot;m00&quot;:3.4290112931175884e-15,&quot;m01&quot;:-56.0,&quot;m02&quot;:56.0,&quot;m10&quot;:56.0,&quot;m11&quot;:3.4290112931175884e-15,&quot;m12&quot;:0.11718750},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}"/>
				<defs>
					<clipPath id="paint0_angular_12860_24247_clip_path">
						<path d="M56 28.1172C56 43.5812 43.464 56.1172 28 56.1172C12.536 56.1172 0 43.5812 0 28.1172C0 12.6532 12.536 0.117188 28 0.117188C43.464 0.117188 56 12.6532 56 28.1172ZM7.84 28.1172C7.84 39.2512 16.8659 48.2772 28 48.2772C39.1341 48.2772 48.16 39.2512 48.16 28.1172C48.16 16.9831 39.1341 7.95719 28 7.95719C16.8659 7.95719 7.84 16.9831 7.84 28.1172Z"/>
					</clipPath>
				</defs>
			</svg>
		</div>
	);
};

export default Loader; 