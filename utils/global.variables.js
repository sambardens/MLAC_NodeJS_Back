function getThirtyDaysAgo() {
    const thirtyDate = new Date(new Date().getTime() - 60 * 1000);
    // return thirtyDate.toLocaleDateString('sv-SE') + ' ' + thirtyDate.toLocaleTimeString('sv-SE');

    return thirtyDate.toISOString().slice(0, 19).replace("T", " ");
}

// const now = new Date();
// const utcDateTimeString = now.toISOString().slice(0, 19).replace('T', ' ');
// console.log(utcDateTimeString)

function getSixtyDaysAgo() {
    const sixtyDate = new Date(new Date().getTime() - 60 * 1000 * 2);
    return sixtyDate.toISOString().slice(0, 19).replace("T", " ");
}

const allowedSortFieldsRelease = ["id", "name", "createdAt", "type", "releaseDate"];
const allowedSortFieldsIncome = ["id", "paymentEmail", "createdAt", "price"];
const allowedSortFieldsUser = ["id", "firstName", "lastName", "email", "accountStatus", "createdAt", "signIn"];
const allowedSortOrders = ["ASC", "DESC"];

const releaseFilter = {
    releaseTypes: "type",
    performers: "bapsName",
    genres: "mainGenre",
    subGenres: "subGenres",
};

const incomeFilter = {
    paymentEmail: "paymentEmail",
    releaseTypes: "type",
    performers: "bapsName",
    genres: "mainGenre",
    subGenres: "subGenres",
};

const userFilter = {
    role: "role",
    performers: "bapsName",
};

export { getThirtyDaysAgo, getSixtyDaysAgo, allowedSortFieldsRelease, allowedSortFieldsIncome, allowedSortFieldsUser, allowedSortOrders, releaseFilter, incomeFilter, userFilter };
