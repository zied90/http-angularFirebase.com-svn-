const getGroupByActFromLocalStorage = (): boolean => {
  try {
    return localStorage.getItem("groupByAct") !== "false";
  } catch {
    return true; // Default to true
  }
};

const setGroupByActInLocalStorage = (value: boolean) => {
  try {
    localStorage.setItem("groupByAct", value.toString());
  } catch {
    console.warn("Unable to access localStorage");
  }
};


est ce que cest bien comment  qualite de code et asuu donne moi le test unitaire 
