export const priorityBadge = (priority) => {
  const map = {
    High: "danger",
    Medium: "warning",
    Low: "success",
  };

  return map[priority] || "secondary";
};
