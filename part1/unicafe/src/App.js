import { useState } from 'react'

const Statistics = (props) => {
  const feedbackSum = props.good + props.neutral + props.bad
  const feedbackAvg = (props.good - props.bad) / feedbackSum
  const feedbackPos = ((props.good) / feedbackSum) * 100 + ' %' 

  if (feedbackSum === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <h3>No feedback given</h3>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {feedbackSum}</div>
      <div>average {feedbackAvg}</div>
      <div>positive {feedbackPos}</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App