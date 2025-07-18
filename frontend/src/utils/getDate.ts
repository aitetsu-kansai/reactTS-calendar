import { getLocalTimeZone, today } from '@internationalized/date'

export const getDate = () => today(getLocalTimeZone())
