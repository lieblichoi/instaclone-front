import React, { useCallback, useEffect, useState } from "react"
import _ from "lodash"

export const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props

  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window
    const { scrollHeight } = document.body

    // 스크롤 계산!
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop

    if (scrollHeight - innerHeight - scrollTop < 250) {
      if (loading) {
        return
      }
      callNext()
    }
  }, 300)

  const handleScroll = useCallback(_handleScroll, [loading])

  useEffect(() => {
    if (is_next) {
      window.addEventListener("scroll", handleScroll)
    } else {
      window.removeEventListener("scroll", handleScroll)
    }
    return () => window.removeEventListener("scroll", handleScroll)
  }, [is_next, loading])

  return <>{children}</>
}

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
}
