import { createContext, useState } from "react";
import api from "../../services/api";

export const GroupContext = createContext();

export const GroupProviders = ({ children }) => {
  const [groupList, setGroupList] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const createGroup = (payload) => {
    api
      .post("groups/", payload, {
        headers: {
          Authorization: `Bearer  ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res);
        getGroups();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getGroups = () => {
    api
      .get("groups/", {
        headers: {
          Authorization: `Bearer  ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setGroupList(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateGroup = (id, payload) => {
    api
      .patch(`groups/:${id}/`, payload, {
        headers: {
          Authorization: `Bearer  ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        getGroups();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const subscribeGroup = (id) => {
    api
      .post(`groups/:${id}/subscribe/`, {
        headers: {
          Authorization: `Bearer  ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        getGroupsSubscriptions();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getGroupsSubscriptions = () => {
    api
      .get("groups/subscriptions/", {
        headers: {
          Authorization: `Bearer  ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setSubscriptions(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const unsubscribeGroup = (id) => {
    api
      .delete(`groups/:${id}/unsubscribe/`, {
        headers: {
          Authorization: `Bearer  ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res);
        getGroupsSubscriptions();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <GroupContext.Provider
      value={{
        groupList,
        subscriptions,
        createGroup,
        updateGroup,
        subscribeGroup,
        unsubscribeGroup,
        getGroups,
        getGroupsSubscriptions,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
