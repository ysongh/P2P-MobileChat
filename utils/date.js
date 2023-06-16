export const dateToUnixTime = async () => {
  const date = new Date()
  const unixTime = Math.floor(date.getTime() / 1000)
  console.log(unixTime)
  return unixTime
}