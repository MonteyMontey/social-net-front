import cookie from 'react-cookies';

const removeAccessToken = () => {
  cookie.remove('token', { path: '/' });
};

// shamelessly copied (and then modified) from https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
const timeSince = (date) => {
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    const parsed = parseInt(secondsPast);
    return parsed <= 1 ? '1 second ago' : parsed + ' seconds ago';
  }
  if (secondsPast < 3600) {
    const parsed = parseInt(secondsPast / 60);
    return parsed === 1 ? '1 minute ago' : parsed + ' minutes ago';
  }
  if (secondsPast <= 86400) {
    const parsed = parseInt(secondsPast / 3600);
    return parsed === 1 ? '1 hour ago' : parsed + ' hours ago';
  }
  if (secondsPast > 86400) {
    const day = date.getDate();
    const month = date.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
    const year = date.getFullYear() === now.getFullYear() ? "" : " " + date.getFullYear();
    return day + " " + month + year;
  }
};

export { removeAccessToken, timeSince };
