exports.filterQuery = (params, query) => {
    let where = {};
    params.forEach(param => {
        if (query[param]) where[param] = query[param] === "null" ? null : query[param];
    });
    return where;
}