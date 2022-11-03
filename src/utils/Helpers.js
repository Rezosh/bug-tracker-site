// function to see if the user is the author or an admin
export const isAuthorOrAdmin = (userInfo, ticketAuthor) => {
  return userInfo.isAdmin() || userInfo._id === ticketAuthor;
};
