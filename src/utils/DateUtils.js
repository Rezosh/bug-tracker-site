import moment from "moment";

function formatReadableDate(date) {
  return moment(date).format("MMMM Do YYYY");
}

// export default formatReadableDate;
export { formatReadableDate };
