async signUp(req, res, next) {
    try {
        console.log('SignUp Request Body:', req.body);
        const { firstName, lastName, email, password, provider } = req.body;
        const { token } = req.query;

        const createdUser = await authService.signUp(
            firstName,
            lastName,
            email,
            password,
            token,
            provider
        );

        console.log('User Created:', createdUser);

        res.cookie('refreshToken', createdUser.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return res.json({
            activateToken: createdUser.activateToken,
            user: createdUser.user,
        });
    } catch (error) {
        console.error('SignUp Error:', error.message);
        return next(error);
    }
}
