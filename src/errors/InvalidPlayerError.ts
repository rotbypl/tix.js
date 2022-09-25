export default class InvalidPlayerError extends Error {
    constructor (player: string | number) {
        if (typeof player === 'string')
            super(`Could not find user with the name "${player}"`)
        else
            super(`Could not find user with the id "${player}"`)
    }
}
