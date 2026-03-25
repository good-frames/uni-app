import {
	onShareAppMessage,
	onShareTimeline
} from '@dcloudio/uni-app'

export default function useShare(data) {
	// 分享给朋友
	onShareAppMessage(() => {
		return {
			title: data.title,
			path: data.path,
			content: data.content,
			desc: data.desc
		}
	})

	// 分享到朋友圈
	onShareTimeline(() => {
		return {
			title: data.title,
			imageUrl: data.img,
			query: data.query
		}
	})
}
