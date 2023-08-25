import { useState } from "react";

export function useToggleShowMore(string: string, maxLength: number) {
  const [showMore, setShowMore] = useState(() => {
    return string.length < maxLength
  })

  const toggleShowMore = () => {
    return setShowMore(state => !state)
  }

  const text = showMore ? string + " " : string.slice(0, maxLength) + "... ";

  return ({ toggleShowMore, text, showMore })


}