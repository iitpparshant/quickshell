import React from 'react';
import { useSelector } from 'react-redux';
import './Card.css'; 
import { GenerateIcon, PriorityIcon, StatusIcon } from '../../Utils/Helper';


function Card({ id, mainid,name,title, tag, status, priority }) {
  const { selectData, user } = useSelector((state) => state.DataReducer);
  console.log("siojriortjovtjio",selectData)
  let priority_list = ["No priority", "Low", "Medium", "High", "Urgent"];
  return (
    <div className='card'>
      <div className='cardup'>
        <div>{mainid}</div>
        {!user ? GenerateIcon(name) : ""}
      </div>
      <div className="cardmid">
        {(user || priority_list.includes(priority)) ? StatusIcon(status) : ""}
        {/* <h1>{priority_list[id]}</h1> */}
        {/* <h2>{priority}</h2> */}
        <div className='card-title'>{title}</div>
      </div>
      <div className='card-tags'>
        {(user || !priority_list.includes(priority)) && (
          <div className='progress'>
            {PriorityIcon(priority_list[id])}
          </div>
        )}

        {tag.map((ele, idx) => (
          <div key={idx} className='tag-item'>
            <span className='tag-dot'>•</span> {ele}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
