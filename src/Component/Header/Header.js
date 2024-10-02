import React, { useEffect, useState } from 'react';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectedData } from '../../Utils/Api';
import down from '../../Image/down.svg'
import displayimg from '../../Image/Display.svg'

const findGroup = () => {
  if (localStorage.getItem("group")) {
    return localStorage.getItem("group");
  }
  else {
    return "status";
  }
}
const findOrder = () => {
  if (localStorage.getItem("order")) {
    return localStorage.getItem("order");
  }
  else {
    return "priority";
  }
}

function Header() {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const { ticket, user } = useSelector(state => state.Reducer)
  const [group, setGroup] = useState(findGroup()); // Stores the selected group value
  const [order, setOrder] = useState(findOrder()); // Stores the selected ordering value

  const handleGrouping = (e, value) => {
    if (value) {
      setGroup(e.target.value);
      setDisplay(!display);
      localStorage.setItem("group", e.target.value);
    }
    else {
      setOrder(e.target.value);
      setDisplay(!display);
      localStorage.setItem("order", e.target.value);
    }
  }

  useEffect(() => {
    if (group === "user") {
      dispatch(selectedData(group, {
        ticket, user
      }, order));
    }
    else {
      dispatch(selectedData(group, ticket, order));
    }
  }, [ticket, dispatch, group, order, user])

  const ShowOption = () => {
    setDisplay(!display);
  };

  return (
    <div className='header-container'>
      <div className='header-display'>
        <div className='header-btn' onClick={ShowOption}>
          <img className='header-icon' src={displayimg} alt="Dropdown icon" />
          <button className='header-btn-display'>Display</button>{" "}
          <img className='header-icon' src={down} alt="Dropdown icon" />
        </div>
        {display && (
          <div className='header-dropdown'>
            <div className='header-grouping'>
              <label htmlFor="group">Grouping</label>
              <select
                id="group"
                name="Group"
                value={group}
                onChange={(e) => handleGrouping(e, true)}
                className='header-select'
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className='header-ordering'>
              <label htmlFor="ordering">Ordering</label>
              <select
                id="ordering"
                name="Ordering"
                onChange={(e) => handleGrouping(e, false)}
                value={order}
                className='header-select'
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
