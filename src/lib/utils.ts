export const getPusherChannelName = (key: string) => {
  return key.replace(/:/g, '-')
}
