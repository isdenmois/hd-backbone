
module.exports = function (time) {
    if (!time || typeof time.getDate != 'function') {
        return time;
    }

    let day = time.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = time.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = time.getFullYear();

    if (arguments.length > 2) {
        let hour = time.getHours();
        if (hour < 10) {
            hour = '0' + hour;
        }

        let min = time.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }

        return `${day}.${month}.${year} ${hour}:${min}`;
    }

    return `${day}.${month}.${year}`;
};
