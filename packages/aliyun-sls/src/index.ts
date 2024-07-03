import type { WebTrackerBrowserOptions } from '@aliyun-sls/web-types'

import SlsTracker from '@aliyun-sls/web-track-browser'
import UAParser from 'ua-parser-js'

type TrackerOptions = WebTrackerBrowserOptions & {
  host?: string
  project?: string
}

export function createSlsTracker(options: TrackerOptions) {
  const opts = {
    host: 'cn-hangzhou.log.aliyuncs.com',
    project: 'js',
    time: 10,
    count: 10,
  }

  const tracker = new SlsTracker({ ...opts, ...options })
  const presetData = getPresetData()

  return {
    ...tracker,
    send: (log: Record<string, unknown>) => tracker.send({ ...presetData, ...log }),
    sendImmediate: (log: Record<string, unknown>) => tracker.sendImmediate({ ...presetData, ...log }),
    sendBatchLogs: (logs: Record<string, unknown>[]) => tracker.sendBatchLogs(logs.map((log) => ({ ...presetData, ...log }))),
    sendBatchLogsImmediate: (logs: Record<string, unknown>[]) => tracker.sendBatchLogsImmediate(logs.map((log) => ({ ...presetData, ...log }))),
  }
}

function getPresetData() {
  const ua = new UAParser(navigator.userAgent)
  const device = ua.getDevice()
  const stringify = (data: { name?: string; version?: string }) => `${data.name} ${data.version}`

  return {
    _url_: location.href,
    _title_: document.title,
    _referrer_: document.referrer || (opener && opener.location.href) || '',
    _ua_: navigator.userAgent,
    _device_: `${device.vendor} ${device.model}`,
    _os_: stringify(ua.getOS()),
    _browser_: stringify(ua.getBrowser()),
    _engine_: stringify(ua.getEngine()),
  }
}
