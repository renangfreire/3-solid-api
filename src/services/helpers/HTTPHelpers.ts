export const conflict = (error: Error) => {
    return {
        status: 409,
        body: error
    }
}