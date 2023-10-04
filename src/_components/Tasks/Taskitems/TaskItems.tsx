import ProgressIcon from '../../../../public/SVG/progress.svg'
import TodoIcon from '../../../../public/SVG/todo.svg'
import DoneIcon from '../../../../public/SVG/done.svg'
import TopArrow from '../../../../public/SVG/top_arrow.svg'
import DownArrow from '../../../../public/SVG/down_arrow.svg'
import LeftArrow from '../../../../public/SVG/left_arrow.svg'
import WorkIcon from '../../../../public/SVG/work.svg'
import PersonalIcon from '../../../../public/SVG/personal.svg'
import React from 'react'
export const TaskItems = ({ taskItems }: { taskItems: string[] }) => {
  const getIconsDependingOnProp = (taskItem: string) => {
    if (taskItem === 'In Progress') return <ProgressIcon />;
    if (taskItem === 'Todo') return <TodoIcon />;
    if (taskItem === 'Done') return <DoneIcon />;
    if (taskItem === 'High') return <TopArrow />;
    if (taskItem === 'Low') return <DownArrow />;
    if (taskItem === 'Medium') return <LeftArrow />;
    if (taskItem === 'Work') return <WorkIcon />;
    if (taskItem === 'Personal') return <PersonalIcon />;
  }
  return (
    <React.Fragment>
      {taskItems.map(taskItem => {
        return <div key={taskItem}>{getIconsDependingOnProp(taskItem)}{taskItem}</div>
      })}
    </React.Fragment>
  )
};