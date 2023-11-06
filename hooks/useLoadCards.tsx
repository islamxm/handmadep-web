import { useState } from "react"

const useLoadCards = () => {
  const [lastItemId, setLastItemId] = useState(0)
  const [canLoadNext, setCanLoadNext] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const loadMore = (id: number) => {
    setLastItemId(id)
  }

  const reset = () => {
    setLastItemId(0)
  }

  return {
    lastItemId,
    canLoadNext,
    isEnd,
    
    loadMore,
    reset
  }
}
export default useLoadCards;