module.exports = (id) => {
    return (`
        SELECT *
        FROM users
        WHERE Id='${id}'
    `)
};
