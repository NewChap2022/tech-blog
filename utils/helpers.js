const formatDate = date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
    ).getFullYear()}`;
};

const limitedText = text => {
    const lengthOfText = text.split(' ').length;
    if (lengthOfText > 50) {
        return text.split(' ').slice(0, 51).join(' ');
    }
    return text;
}

module.exports = { formatDate, limitedText}