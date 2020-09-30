module.exports = (email, password) => {
    return (`
        INSERT INTO users(Email, Password)
        VALUES ('${email}', '${password}')
    `)
};
