import { capitalizeFirstLetter } from '@/_utils/helpers/capitalizeFirstLetter';

export const formatFields = (field: string) => {
  const isLevelField = field.includes('Level')
  return isLevelField ? field.slice(-5) : capitalizeFirstLetter(field)
}