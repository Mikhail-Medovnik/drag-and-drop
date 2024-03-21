export function capitalizeWord(word: string) {
  const wordLowerCase = word.toLowerCase();
  const firstLetterCap = wordLowerCase.charAt(0).toUpperCase();
  const remainingLetters = wordLowerCase.slice(1);
  return firstLetterCap + remainingLetters;
}
