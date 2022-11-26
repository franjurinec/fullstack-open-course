interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercise = (hours: number[], target: number): ExerciseResult => {
  const total = hours.reduce((a, v) => a + v)
  const periodLength = hours.length
  const trainingDays = hours.filter(h => h > 0).length
  const average = total / periodLength
  
  let rating = 3
  let ratingDescription = 'Not close to target'
  
  if (average < target) {
    rating = 2
    ratingDescription = 'Almost reached target'
  }

  if (average < (0.75 * target)) {
    rating = 1
    ratingDescription = 'Target reached'
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  }
}

