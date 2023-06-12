import { useState, useEffect } from 'react'

const useFormattedDate = (date: number) => {
  const [formattedDate, setFormattedDate] = useState<string>('')

  useEffect(() => {
    setFormattedDate(
      Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }).format(date)
    )
  }, [date])

  return formattedDate
}

export default useFormattedDate
