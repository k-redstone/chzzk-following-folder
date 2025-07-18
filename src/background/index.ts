import type { IChzzkResponse, IMessage } from '@/types'
import type { IFollowingListContent, ILiveContent } from '@/types/follow'

import { FETCH_FOLLOWING_URL } from '@/constants/endpoint'

console.log('bg loaded')

async function request<T>(path: string): Promise<IChzzkResponse<T>> {
  const url = new URL(path)

  const request = new Request(url, {
    cache: 'no-cache',
  })

  const response = await fetch(request)

  if (response.ok) {
    return response.json()
  }

  throw new Error(`${response.status}: ${response.statusText}`)
}

// 치지직 API
async function fetchFollowList() {
  const followList = await request<IFollowingListContent>(FETCH_FOLLOWING_URL)
  console.log(followList.content)
  return followList.content
}

async function fetchStreamerLiveStatus(hashId: string) {
  const liveStatus = await request<ILiveContent>(
    `https://api.chzzk.naver.com/polling/v3.1/channels/${hashId}/live-status`,
  )
  console.log(liveStatus)
  return liveStatus.content
}

// 헬퍼 함수들

const messageHandlers: Record<string, (...args: string[]) => Promise<unknown>> =
  {
    fetchFollowList,
    fetchStreamerLiveStatus,
  }

chrome.runtime.onMessage.addListener(
  (message: unknown, _sender, sendResponse) => {
    const msg = message as IMessage
    const handler = messageHandlers[msg.type]

    if (!handler) throw new RangeError()

    handler(...msg.args)
      .then((result) => sendResponse(result))
      .catch((error) => sendResponse({ error: error.message }))

    return true
  },
)
