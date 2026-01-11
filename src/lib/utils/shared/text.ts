export function toSentenceCase(word: string) {
  return word.length >= 2
    ? word[0]!.toUpperCase() + word.substring(1, word.length).toLowerCase()
    : word;
}
