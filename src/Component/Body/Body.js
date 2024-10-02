import React from 'react';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import add from '../../Image/add.svg'
import dot from '../../Image/3 dot menu.svg'
import './Body.css'; // Kanban board styling
import { GenerateIcon, PriorityIcon, StatusIcon } from '../../Utils/Helper';

const Body = () => {
  const { selectData, user } = useSelector((state) => state.DataReducer);
  console.log(selectData)

  return (
    selectData && (
      <div className="kanban-board">
        {selectData.map((ele, idx) => (
          <div key={idx} className="kanban-column">
            <div className="column-title">
              <div className='title'>
                {/* <div style={{height:'13px'}}> */}
                  {user ? GenerateIcon(ele[idx]?.title) : (PriorityIcon(ele[idx]?.title) || StatusIcon(ele[idx]?.title))}
                {/* </div> */}
                <span>{ele[idx]?.title}</span>
                <span>{ele[idx]?.value?.length}</span>
              </div>
              <div>
                <img className='header-icon' src={add} alt="Add icon" />
                <img className='header-icon' src={dot} alt="Add icon" />
              </div>
            </div>
            <div>
              {ele[idx]?.value?.map((e) => (
                <Card key={e.id} id={idx} mainid={e.id} title={e.title} tag={e.tag} status={e.status} priority={ele[idx]?.title}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Body;
