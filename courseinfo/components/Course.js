import Header from './Header'
import Content from './Content'

  
  const Sum = ({parts}) => {
    const exercises = parts.map((part) => part.exercises)
    const totalSum = exercises.reduce((sum, exercises) => sum + exercises, 0)
    return (
      <div>
       <strong> total of {totalSum} exercises </strong>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    const parts = course.parts
    return (
      <div>
        <Header name={course.name} />
          {parts.map(parts =>

        <Content key={parts.id} parts={parts} />
          )}
        <Sum parts={parts} />
      </div>
    )
  }
  
  export default Course