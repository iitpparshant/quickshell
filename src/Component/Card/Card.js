import React from 'react';
import { useSelector } from 'react-redux';
import './Card.css'; // Ensure to create a CSS file for the Card component
import { GenerateIcon, PriorityIcon, StatusIcon } from '../../Utils/Helper';

function Card({ id, mainid, title, tag, status, priority }) {
  const { selectData, user } = useSelector((state) => state.DataReducer);
  let priority_list = ["No priority", "Low", "Medium", "High", "Urgent"];
  return (
    <div className='card'>
      <div className='cardup'>
        <div>{mainid}</div>
        {!user ? GenerateIcon(priority) : ""}
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
