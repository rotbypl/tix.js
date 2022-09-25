export default class InvalidThumbnailError extends Error {
    constructor (size: string, crop: string, sizes: {[K: string]: string[]}) {
        super(`"${size}" is not a valid size for crop type "${crop}", valid crop types: [ ${sizes[crop].join(', ')} ]`)
    }
}
