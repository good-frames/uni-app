export default function useSystem() {
  const safeAreaInsetsInfo = ref()

  const { safeAreaInsets } = uni.getSystemInfoSync()
  safeAreaInsetsInfo.value = safeAreaInsets

  return {
    safeAreaInsets: safeAreaInsets
  }

}