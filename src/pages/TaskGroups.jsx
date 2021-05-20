import * as React from 'react'
import { Grid } from '@chakra-ui/react'
// import { id } from 'date-fns/locale'

import { getTaskGroups } from '../utils/api'
import { TaskGroupColumn } from './components/TaskGrupColumn'

// eslint-disable-next-line react/prop-types
const TaskGrpups = ({ boardId }) => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = React.useState('loading')
  const [groups, setGroups] = React.useState([])

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getTaskGroups(boardId)
        setGroups(data)
      }
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }, [boardId])

  console.log(groups)

  return (
    <Grid gridTemplateColumns={['auto', '15rem auto']} gap="4">
      {groups.map((group) => (
        <TaskGroupColumn group={group} />
      ))}
    </Grid>
  )
}

export default TaskGrpups
