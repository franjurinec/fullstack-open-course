import { CoursePart } from "../types"

const Content = ({courseParts}: {courseParts: CoursePart[]}) => (
  <>
    {courseParts.map(part => {
      switch (part.type) {
      case "normal": 
        return (
          <p key={part.name}>
            <b>{part.name} {part.exerciseCount}</b> <br/>
            <i>{part.description}</i>
          </p>
        )
          
      case "groupProject":
        return (
          <p key={part.name}>
            <b>{part.name} {part.exerciseCount}</b> <br/>
            project exercises {part.groupProjectCount}
          </p>
        )
        
      case "submission":
        return (
          <p key={part.name}>
            <b>{part.name} {part.exerciseCount}</b> <br/>
            <i>{part.description}</i> <br/>
            submit to {part.exerciseSubmissionLink}
          </p>
        )

      case "special":
        return (
          <p key={part.name}>
            <b>{part.name} {part.exerciseCount}</b> <br/>
            <i>{part.description}</i> <br/>
            required skills: {part.requirements.join(', ')}
          </p>
        )
      }

    }
      
    )}
  </>
)

export default Content
