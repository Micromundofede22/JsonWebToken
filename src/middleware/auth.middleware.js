
export const handlePolicies = policies => (req, res, next) => {
    const user = req.user.user || null
    // console.log('handlePolicies: ', user)
    if (policies.includes('ADMIN')) {
        if (user.role !== 'admin') {
            return res.status(403).render('errors/base', {
                error: 'Acceso denegado. Necesita ser ADMIN'
            })
        }
    }

    if (policies.includes('USER')) {
        if (user.role !== 'user') {
            return res.status(403).render('errors/base', {
                error: 'Acceso denegado. Necesita cuenta de user'
            })
        }
    }

    return next()
}

