import {
	getToken
} from '@/utils/auth.js'
import {
	toast
} from '@/utils/common.js'
import {
	isHttp
} from '@/utils/validate.js'
import config from '@/config'

const timeout = 10000
const baseUrl = config.baseUrl

const request = config => {
	const isToken = config?.isToken || false
	const isExternalLink = isHttp(config.url)
	config.header = config.header || {}
	if (isToken && getToken()) {
		config.header['Authorization'] = `Bearer` + getToken()
	}

	return new Promise(async (resolve, reject) => {
		try {
			const {
				statusCode,
				data
			} = await uni.request({
				method: config.method || 'get',
				timeout: config.timeout || timeout,
				url: isExternalLink ? config.url : (config.baseUrl || baseUrl + config.url),
				data: config.data,
				header: config.header,
				dataType: 'json'
			})


			if (statusCode !== 200) {
				toast('后端接口连接异常')
				reject('后端接口异常')
				return
			}

			if (isExternalLink) {
				resolve(data)
				return
			}

			resolve(data.data)
		} catch (error) {
			console.log('error', error)
			let {
				message
			} = error
			if (message === 'Network Error') {
				message = '后端接口连接异常'
			} else if (message.includes('timeout')) {
				message = '系统接口请求超时'
			} else if (message.includes('Request failed with status code')) {
				message = '系统接口' + message.substr(message.length - 3) + '异常'
			}
			toast(message)
			reject(error)
		}
	})
}

export default request
