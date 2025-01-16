 public userListToCSV = (users: User[]): string => {
    const rows = users.map((user) => [user.lastname, user.firstname, user.email, user.id, user.type]);
    console.log([ ...rows].map((row) => row.join(";")).join("\n"),"ddddddddddddd")
    return [...rows].map((row) => row.join(";")).join("\n");
  };
