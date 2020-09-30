module.exports = (email) => {
    return (`
        SELECT *
        FROM users
        WHERE email='${email}'
    `)
};
