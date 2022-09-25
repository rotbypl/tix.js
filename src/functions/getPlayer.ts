// @ts-nocheck

import request from '../utils/request'
import { API_ENDPOINT, USERS_ENDPOINT, FRIENDS_ENDPOINT } from '../utils/constants'
import getPlayerIdFromName from './getPlayerIdFromName'
import RobloxPlayer from '../structures/RobloxPlayer'
import InvalidPlayerError from '../errors/InvalidPlayerError'

export default async function getPlayer (query: string | number | null) {
    if (typeof query === 'string') 
        query = await getPlayerIdFromName(query)
    if (query === null) return null

    let requests = [
        request(`${USERS_ENDPOINT}/users/${query}`, {
            userId: query
        }),
        Promise.all([
            request(`${FRIENDS_ENDPOINT}/users/${query}/friends/count`),
            request(`${FRIENDS_ENDPOINT}/users/${query}/followers/count`),
            request(`${FRIENDS_ENDPOINT}/users/${query}/followings/count`),
        ]),
        request(`${USERS_ENDPOINT}/users/${query}/username-history`),
    ]
    
    const builder = await Promise.all(requests).then(responses => {
        if (responses[0].status === false) return null

        responses[0] = responses[0].data
        responses[1] = responses[1].map(response => response.data.count)
        responses[2] = responses[2].data.data.map(response => response.name)

        return responses
    })

    if (builder === null) {
        Promise.reject(new InvalidPlayerError(query))
        return null
    } return new RobloxPlayer(builder)
}
