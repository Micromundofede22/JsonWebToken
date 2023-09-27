
export const handlePolicies = policies => (req, res, next) => {
    const user = req.user.user || null
    // console.log('handlePolicies: ', user)
    if (policies.includes('ADMIN' || 'PREMIUM' )) {
        if (user.role != 'admin' && user.role != "premium") {
            return res.status(401).render('errors/base', {
                error: 'Acceso denegado. Necesita ser ADMIN o PREMIUM'
            })
        }
    }

    if (policies.includes('USER')) {
        if (user.role !== 'user') {
            return res.status(401).render('errors/base', {
                error: 'Acceso denegado. Necesita cuenta de user'
            })
        }
    }

    // if (policies.includes('PREMIUM')) {
    //     if (user.role !== 'premium') {
    //         return res.status(403).render('errors/base', {
    //             error: 'Acceso denegado. Necesita ser admin o cuenta premium'
    //         })
    //     }
    // }

    return next()
}

