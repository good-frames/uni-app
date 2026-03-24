import {
	getToken
} from '@/utils/auth'

// 登录页面
const loginPage = "/models/main/pages/login"

// 页面白名单
const whiteList = [
	'/models/main/pages/home',
	'/models/main/pages/login',
	// '/models/common/pages/webview',
]

// 需要权限的路由
const hasRolusList = []

// 检查地址白名单
function checkWhite(url) {
	const path = url.split('?')[0]
	return whiteList.indexOf(path) !== -1
}

// 是否需要权限
function checkRoule(url) {
	const path = url.split('?')[0]
	return hasRolusList.indexOf(path) !== -1
}

// 页面跳转验证拦截器
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"]
list.forEach(item => {
	uni.addInterceptor(item, {
		invoke(to) {
			if (getToken()) {
				if (to.url === loginPage) {
					uni.reLaunch({
						url: "/"
					})
				}
				return true
			} else {
				if (!checkRoule(to.url)) {
					return true
				}
				uni.reLaunch({
					url: loginPage
				})
				return false
			}
		},
		fail(err) {
			console.log(err)
		}
	})
})
