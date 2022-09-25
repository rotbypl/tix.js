import request from '../utils/request'
import { API_ENDPOINT, USERS_ENDPOINT, FRIENDS_ENDPOINT } from '../utils/constants'
import InvalidPlayerError from '../errors/InvalidPlayerError'

export default async function getPlayerIdFromName (query: string): Promise<number | null> {
    const response = await request(`${API_ENDPOINT}/users/get-by-username`, {
        username: query
    }).then(response => 'errorMessage' in response.data ? null : response.data.Id)
    if (response === null)
        Promise.reject(new InvalidPlayerError(query))
    return response
}
