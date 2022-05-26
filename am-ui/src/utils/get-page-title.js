import defaultSettings from '@/settings'

const title = defaultSettings.title || '智慧城市大气环境监测系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
