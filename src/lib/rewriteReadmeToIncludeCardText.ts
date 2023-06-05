import { MARK } from '../constant'
import { Language, Score, Theme } from '../types/types'

const createCardText = ({
  shareId,
  score,
  theme,
  lang,
  cardWidth,
  showUpdateTime,
}: {
  shareId: string
  score: Score
  theme: Theme
  lang: Language
  cardWidth: string
  showUpdateTime: boolean
}): string => {
  const imageUrl = `https://lapras-card-generator.vercel.app/api/svg?e=${
    score.eScore
  }&b=${score.bScore}&i=${score.iScore}&b1=${encodeURIComponent(
    theme.background.first
  )}&b2=${encodeURIComponent(theme.background.second)}&i1=${encodeURIComponent(
    theme.icon.first
  )}&i2=${encodeURIComponent(theme.icon.second)}&l=${lang}`

  const updateTime = showUpdateTime ? `  \nLast Updated on ${new Date().toLocaleString()}` : ''

  return `<a href="https://lapras.com/public/${shareId}" target="_blank" rel="noopener noreferrer"><img src="${imageUrl}" width="${cardWidth}" ></a>${updateTime}`
}

export const rewriteReadmeToIncludeCardText = (
  readme: string,
  {
    shareId,
    score,
    theme,
    lang,
    cardWidth,
    showUpdateTime,
  }: {
    shareId: string
    score: Score
    theme: Theme
    lang: Language
    cardWidth: string
    showUpdateTime: boolean
  }
): string => {
  const markerPattern = new RegExp(`(${MARK.START})[\\s\\S]*(${MARK.END})`)
  if (!markerPattern.test(readme)) {
    throw new Error(`Error: README.mdにカードを挿入するためのMARKER文字列が見つかりませんでした。"${MARK.START + MARK.END}" をREADME.mdに追加してください`)
  }

  const cardText = createCardText({shareId, score, theme, lang, cardWidth, showUpdateTime})
  return readme.replace(markerPattern, `$1\n${cardText}\n$2`)
}
