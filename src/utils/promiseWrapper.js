const promiseWrapper = promise => promise
    .then(res => {
        return {
            res,
            err: null
        }
    })
    .catch(err => {
        return {
            err,
            res: null
        }
    });

export default promiseWrapper;