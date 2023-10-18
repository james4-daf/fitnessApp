import React, { useState } from 'react';
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import moment from 'moment';

interface DailyEntry {
  date: string;
  weight: number;
}

function formatDateString(date: string): string {
  // Parse the input date string
  const parsedDate = moment(date, 'YYYY-MM-DD');

  // Format the date as "DD-MM-YY"
  return parsedDate.format('DD-MM-YY');
}

function DailyWeighIn() {
  const [daily, setDaily] = useState<DailyEntry>({
    date: '',
    weight: 0,
  })
  const formattedDate = moment().format('DD/MM/YY');
  const dailyWeighIn = useMutation(api.dailyWeight.createDailyWeight)
  const deleteDailyWeighIn = useMutation(api.dailyWeight.deleteDailyWeight)
  const updateDailyWeighIn = useMutation(api.dailyWeight.updateDailyWeight)
  const allWeighIns = useQuery(api.dailyWeight.getAllDailyWeight)
  const [editWeight, setEditWeight] = useState(false)
  const [editedWeight, setEditedWeight] = useState<number | undefined>(undefined);
  const [showWeightInput, setShowWeightInput] = useState(false)
  function addDailyWeight(e: React.FormEvent) {

    e.preventDefault()
    const formattedDate = formatDateString(daily.date);
    // dailyWeighIn({ date: daily.date, weight: daily.weight })
    const dailyEntry: DailyEntry = {
      date: formattedDate,
      weight: daily.weight,
    };

    // Call the mutation with the formatted data
    dailyWeighIn(dailyEntry);
    setDaily({ date: '', weight: 0 });
    setShowWeightInput((prev) => !prev)


  }

  function updateDaily(id: string, weight: number) {
    updateDailyWeighIn({ id, weight })
  }
  function deleteDaily(id: string) {
    deleteDailyWeighIn({ id })
  }

  return (
    <div className='flex flex-col items-center justify-between'>
      <h1 className='text-2xl py-8'> Weight Tracker</h1>
      <div className='pt-4'>
        {showWeightInput &&
          <div className='h-36'>
            <div className='flex justify-between'>
              <p>Daily weight</p>


              <button onClick={() => setShowWeightInput(false)} className=' border-2 hover:bg-red-600 order-last'> Close</button>

            </div>
            <form onSubmit={addDailyWeight}>
              <label>Date</label>
              <input type='date' required name='date' max={formattedDate} onChange={(e) => setDaily({ ...daily, date: e.target.value })} value={daily.date} className='border border-cyan-500' />
              <label>Weight</label>
              <input required type='number' name='weight' className='border border-cyan-500' onFocus={(e) => e.target.select()} onChange={(e) => setDaily({ ...daily, weight: parseFloat(e.target.value) })} value={daily.weight} />
              {/* <input required placeholder='enter weight e.g. 170lbs' type='number' name='weight' className='border border-cyan-500' onChange={(e) => setWeight(e.target.value)} value={weight} /> */}
              <button type='submit' className='border-4 border-amber-400 rounded-md hover:bg-blue-500'>Enter</button>
            </form>
          </div>
        }

        {!showWeightInput &&
          (
            <div className='h-36'>
              <button className='border-4 border-amber-400 rounded-md hover:bg-blue-500' onClick={() => setShowWeightInput((prev) => !prev)} >Add Daily weight</button>
            </div>
          )
        }
      </div>
      <div>

        <table className="table-auto border-separate border-spacing-6 border border-slate-400">
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight (lbs)</th>
              <th></th>
            </tr>
          </thead>
          {allWeighIns?.map((daily) => {
            return (
              <tbody key={daily._id}>
                <tr>
                  <td className='border border-slate-300'>{daily.date}</td>
                  {!editWeight ? <td>{daily.weight}</td> : <td><input required type='number' name='weight' className='border border-cyan-500' onFocus={(e) => e.target.select()} onChange={(e) => setEditedWeight(parseFloat(e.target.value))} value={editedWeight !== undefined ? editedWeight : daily.weight} /></td>}

                  <td>
                    {/* <button onClick={() => { deleteDaily(daily._id,) }} >Update</button> */}
                    <button onClick={() => { setEditWeight(true) }} >Edit</button>
                    {/* <button onClick={() => { deleteDaily(daily._id) }} >Delete</button> */}
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    </div >
  )
}

export default DailyWeighIn;