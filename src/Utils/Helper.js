import backlog from './../Image/Backlog.svg'
import cancel from './../Image/Cancelled.svg'
import done from './../Image/Done.svg'
import high from './../Image/Img - High Priority.svg'
import low from './../Image/Img - Low Priority.svg'
import medium from './../Image/Img - Medium Priority.svg'
import inprogress from './../Image/in-progress.svg'
import nopriority from './../Image/No-priority.svg'
import urgent from './../Image/SVG - Urgent Priority colour.svg'
import urgent1 from './../Image/SVG - Urgent Priority grey.svg'
import todo from './../Image/To-do.svg'

export const PriorityIcon=(priority)=>{
  switch(priority){
    case "No priority":return <img src={nopriority} alt="" />
    case "Low":return <img src={low} alt="" />
    case "Medium":return <img src={medium} alt="" />
    case "High":return <img src={high} alt="" />
    case "Urgent":return <img src={urgent} alt="" />
  }
}

export const StatusIcon=(priority)=>{
  switch(priority){
    case "Todo":return <img src={todo} alt="" />
    case "In progress":return <img src={inprogress} alt="" />
    case "Backlog":return <img src={backlog} alt="" />
    case "Done":return <img src={done} alt="" />
    case "Canceled":return <img src={cancel} alt="" />
  }
}
export const GenerateIcon = (status) => {
  const firstLetter = status.charAt(0).toUpperCase(); // Get the first letter of the string and capitalize it

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: 'red', // You can customize the background color
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      {firstLetter}
    </div>
  );
};
