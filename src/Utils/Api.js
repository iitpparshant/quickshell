import axios from 'axios';

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: 'DATA_REQUEST' });
    const { data } = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
    dispatch({ type: 'DATA_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'DATA_FAILURE', payload: error.message });
  }
};

export const selectedData = (group, { ticket, user }, order) => async (dispatch) => {
  try {
    dispatch({ type: 'SELECT_DATA_REQUEST' });

    let selectData = [];
    const priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];

    // Function to find the user name based on userId
    const getUserName = (userId) => {
      const foundUser = user.find((usr) => usr.id === userId);
      return foundUser ? foundUser.name : 'Unknown';
    };

    // Grouping by Status
    if (group === "status") {
      const statusSet = [...new Set(ticket.map((item) => item.status))];
      selectData = statusSet.map((status, idx) => {
        const filteredTickets = ticket.filter((item) => item.status === status);
        const updatedTickets = filteredTickets.map(ticketItem => ({
          ...ticketItem,
          userName: getUserName(ticketItem.userId),  // Add userName field
        }));
        return {
          [idx]: { title: status, value: updatedTickets },
        };
      });
    }

    // Grouping by User
    else if (group === "user") {
      selectData = user.map((usr, idx) => {
        const userTickets = ticket.filter((item) => item.userId === usr.id);
        const updatedTickets = userTickets.map(ticketItem => ({
          ...ticketItem,
          userName: usr.name,  // Add userName field directly
        }));
        return {
          [idx]: { title: usr.name, value: updatedTickets },
        };
      });
    }

    // Grouping by Priority
    else {
      selectData = priorityList.map((priority, idx) => {
        const priorityTickets = ticket.filter((item) => item.priority === idx);
        const updatedTickets = priorityTickets.map(ticketItem => ({
          ...ticketItem,
          userName: getUserName(ticketItem.userId),  // Add userName field
        }));
        return {
          [idx]: { title: priority, value: updatedTickets },
        };
      });
    }

    // Ordering by Priority
    if (order === "priority") {
      selectData.forEach((group) => {
        Object.values(group).forEach((g) => {
          g.value.sort((a, b) => b.priority - a.priority);
        });
      });
    }

    // Ordering by Title
    if (order === "title") {
      selectData.forEach((group) => {
        Object.values(group).forEach((g) => {
          g.value.sort((a, b) => a.title.localeCompare(b.title));
        });
      });
    }

    dispatch({ type: 'SELECT_DATA_SUCCESS', payload: { selectData, user: group === 'user' } });
  } catch (error) {
    dispatch({ type: 'SELECT_DATA_FAILURE', payload: error.message });
  }
};
