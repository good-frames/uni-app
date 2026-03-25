/**
 * 显示消息提示框
 * @param content 提示的标题
 */
export function toast(content) {
	uni.showToast({
		icon: 'none',
		title: content
	})
}
