// function to see if the user is the author or an admin
export const isAuthorOrAdmin = (user, ticketAuthor) => {
  const { userInfo } = user.authState;
  return user.isAdmin() || userInfo._id === ticketAuthor;
};
