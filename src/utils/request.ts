import axios from 'axios'

export default async function request (url: string, params?: { [K: string]: any }): Promise<{ status: boolean, data: any }> {
    let response: any

    if (params) {
        let request_params = {}
        for (let [ key, value ] of Object.entries(params)) {
            request_params[key] = value
        }

        try {
            response = await axios.get(url, {
                headers: {
                    Accept: 'application/json'
                },
                params: request_params
            })
        } catch (error: any) {
            response = { status: false, data: error.response.data }
        }

        return { status: true, data: response.data }
    }

    try {
        response = await axios.get(url)
    } catch (error: any) {
        response = { status: false, data: error.response.data }
    }

    return { status: true, data: response.data }
}
