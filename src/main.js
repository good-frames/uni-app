import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import './permission' // permission
import '@/static/styles/index.scss'

export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
