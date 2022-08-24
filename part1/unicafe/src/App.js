import { useState } from 'react'

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

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
      <table>
        <tbody>
          <StatisticsLine text='good' value={props.good} />
          <StatisticsLine text='neutral' value={props.neutral} />
          <StatisticsLine text='bad' value={props.bad} />
          <StatisticsLine text='all' value={feedbackSum} />
          <StatisticsLine text='average' value={feedbackAvg} />
          <StatisticsLine text='positive' value={feedbackPos} />  
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  return <button onClick={props.action}>{props.text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' action={() => setGood(good+1)} />
      <Button text='neutral' action={() => setNeutral(neutral+1)} />
      <Button text='bad' action={() => setBad(bad+1)} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App