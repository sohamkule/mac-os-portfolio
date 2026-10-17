import  { useEffect, useState } from 'react'

const getFormattedDateTime = () => {
  const now = new Date()
  const weekday = now.toLocaleDateString('en-US', { weekday: 'short' })
  const month = now.toLocaleDateString('en-US', { month: 'short' })
  const day = now.getDate()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${weekday} ${month} ${day} ${hours}:${minutes}:${seconds}`
}

const DateTime = () => {
  const [dateTime, setDateTime] = useState(getFormattedDateTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getFormattedDateTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <div>{dateTime}</div>
}

export default DateTime
