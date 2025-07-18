import type { BookmarkItem } from '@/types/bookmark'

import useStreamerLiveStatus from '@/content/hooks/queries/useStreamerLiveStatus'

interface IStreamerItemProps {
  streamer: BookmarkItem
  compact: boolean
}
export default function StreamerItem({
  streamer,
  compact,
}: IStreamerItemProps) {
  const { data: liveStatusData } = useStreamerLiveStatus(streamer.hashId)

  const isLive = liveStatusData?.status === 'OPEN'

  if (compact) {
    return (
      <div className="flex items-center justify-center py-2">
        <img
          src={streamer.profileImageUrl}
          alt={streamer.name}
          className={`h-8 w-8 rounded-full`}
        />
      </div>
    )
  }

  return (
    <a
      href={isLive ? `/live/${streamer.hashId}` : `/${streamer.hashId}`}
      className={`hover:bg-bg-04 flex cursor-pointer items-center gap-2 rounded py-1 pr-2 pl-1.5 ${!isLive && `grayscale filter`}`}
    >
      <div
        className={`border-bg-02 h-8 w-8 overflow-hidden rounded-full border-2 ${isLive && `border-bg-chzzk-04`}`}
      >
        <img
          width={26}
          height={26}
          src={streamer.profileImageUrl}
          alt={streamer.name}
          className={`aspect-auto h-full w-full object-cover`}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[13px] font-extrabold">
          {streamer.name}
        </span>
        {isLive && (
          <span className="truncate text-[12px] text-gray-400">
            {liveStatusData.liveCategoryValue}
          </span>
        )}
      </div>
      {isLive && (
        <div className="ml-2 flex items-center gap-1 text-xs">
          <span className="text-[18px] leading-none text-[#FF5454]">•</span>
          {liveStatusData.concurrentUserCount > 0 && (
            <span className="font-semibold text-[#FF5454]">
              {liveStatusData.concurrentUserCount.toLocaleString()}
            </span>
          )}
        </div>
      )}
    </a>
  )
}
