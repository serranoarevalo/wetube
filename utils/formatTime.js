import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");

const formatTime = date => timeAgo.format(date);

export default formatTime;
