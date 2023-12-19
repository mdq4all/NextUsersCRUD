import jwt from 'jsonwebtoken'

export function createAccessToken(payload: { id: string }): Promise<string> {
    const { TOKEN_SECRET } = process.env;

    return new Promise((resolve, reject) => {
        if (!TOKEN_SECRET) {
            return Promise.reject(new Error('TOKEN_SECRET no está configurado.'));
        }

        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    if (token)
                        resolve(token)
                }
            }
        )
    })
}