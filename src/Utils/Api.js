import axios from 'axios';

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: 'DATA_REQUEST' })
    const { data } = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
    dispatch({ type: 'DATA_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'DATA_FAILURE' });
  }
}

export const selectedData = (group, ticket, order) => async (dispatch) => {
  try {
    dispatch({ type: 'SELECT_DATA_REQUEST' })
    let user = false;
    let myset = new Set();
    let temp = [], selectData = [];
    if (group === "status") {
      ticket.forEach(element => {
        myset.add(element.status);
      });
      temp = [...myset];
      temp.forEach((e, idx) => {
        let arr = ticket.filter((ele) => {
          return e === ele.status;
        })
        selectData.push({
          [idx]: {
            title: e,
            value: arr
          }
        })
      })
    }
    else if (group === 'user') {
      user = true;
      ticket?.user?.forEach((ele, idx) => {
        let arr = ticket?.ticket?.filter((e) => {
          return ele.id === e.userId;
        })
        selectData.push({
          [idx]: {
            title: ele.name,
            value: arr
          }
        })
      })
    }
    else {
      let priority_list = ["No priority", "Low", "Medium", "High", "Urgent"];
      priority_list.forEach((ele, idx) => {
        let arr = ticket.filter((e) => {
          return idx === e.priority;
        })
        selectData.push({
          [idx]: {
            title: ele,
            value: arr
          }
        })
      })
    }
    if (order === "priority") {
      selectData.forEach((ele, idx) => [
        ele[idx]?.value?.sort((a, b) => b.priority - a.priority)
      ])
    }
    if (order === "title") {
      selectData.forEach((ele, idx) => [
        ele[idx]?.value?.sort((a, b) => a.title.localeCompare(b.title))
      ])
    }
    dispatch({ type: 'SELECT_DATA_SUCCESS', payload: { selectData, user } });
  }
  catch (error) {
    dispatch({ type: 'SELECT_DATA_FAILURE', payload: error.message })
  }
}
