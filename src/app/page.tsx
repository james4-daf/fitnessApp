"use client"
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import DatePicker from './components/DatePicker/page'
import DailyWeighIn from './components/DailyWeighIn/page'

export default function Home() {

  // console.log(tasks)
  return (
    <main >
      {/* <ul>
        {tasks?.map(({ text, _id, isCompleted }) => {
          return <li key={_id.toString()}>{text} is {isCompleted ? "done" : "todo"}</li>
        })}
      </ul> */}
      {/* <DatePicker /> */}
      <DailyWeighIn />
    </main>
  )
}
