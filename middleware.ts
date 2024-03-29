/* Set the protect endpoint with login */
export {default} from 'next-auth/middleware'

export const config = {
    matcher: [
        '/issues/new',
        '/issues/edit/:id+'
    ]
}