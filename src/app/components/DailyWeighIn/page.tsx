import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import moment from 'moment';


type Props = {};

function DailyWeighIn({ }: Props) {
  const [daily, setDaily] = useState({
    date: '',
    weight: ''
  })
  const [weight, setWeight] = useState('')
  const formattedDate = moment().format('DD/MM/YY');
  const dailyWeighIn = useMutation(api.dailyWeight.getDailyWeight)
  const [showWeightInput, setShowWeightInput] = useState(false)
  function addDailyWeight(e) {
    e.preventDefault()
    // dailyWeighIn({ date: daily.date, weight: daily.weight })
    dailyWeighIn(daily)
    setDaily({ date: '', weight: '' });
    setShowWeightInput((prev) => !prev)
  }

  return showWeightInput ?
    (

      <div>
        <p>Daily weight</p>
        <form onSubmit={addDailyWeight}>
          <input type='date' required name='date' max={formattedDate} onChange={(e) => setDaily({ ...daily, date: e.target.value })} value={daily.date} className='border border-cyan-500' />
          <input required placeholder='enter weight e.g. 170lbs' type='number' name='weight' className='border border-cyan-500' onChange={(e) => setDaily({ ...daily, weight: e.target.value })} value={daily.weight} />
          {/* <input required placeholder='enter weight e.g. 170lbs' type='number' name='weight' className='border border-cyan-500' onChange={(e) => setWeight(e.target.value)} value={weight} /> */}
          <button type='submit' className='border-4 border-amber-400 rounded-md hover:bg-blue-500'>Enter</button>
        </form>
      </div>)

    :

    (
      <div>

        <button className='border-4 border-amber-400 rounded-md hover:bg-blue-500' onClick={() => setShowWeightInput((prev) => !prev)} >Add Daily weight</button>
      </div>

    )
}

export default DailyWeighIn;
