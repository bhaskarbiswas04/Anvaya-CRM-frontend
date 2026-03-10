export const priorityBadge = (priority) => {
  const map = {
    high: "danger",
    medium: "warning",
    low: "success",
  };

  return map[priority] || "secondary";
};
