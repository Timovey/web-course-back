const fetch = require('node-fetch')
const yandex = {
    CLIENT_ID : "05eb21e4cdef40a0b3d7fa6d5efde8f5",
    CLIENT_SECRET : "338f7ce4cc4046cca49c92f329e533a9",
    CALLBACK_URL : "http://localhost:3000/auth"
}; 

let oauth = {
    refreshToken: null,
    accessToken: null,
    typeToken: null,
    lifetimeToken: null
}
exports.main = (req, res) => {
    res.render('main.ejs');
};
exports.signOut = (req, res) => {
    res.redirect('/main');
    oauth = {}
}

exports.auth = async (req, res) => {
    const query = {
        body: `grant_type=authorization_code&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}&code=${req.query.code}`,
        method: 'post'
    };
    await fetch('https://oauth.yandex.ru/token', query)
        .then(res => res.json())
        .then(data => { oauth.accessToken = data.access_token; oauth.refreshToken = data.refresh_token; oauth.lifetimeToken = data.expires_in; oauth.typeToken = data.token_type; })
    res.redirect('/tokens');
}

exports.tokens = (req, res) => {
    res.render('tokens.ejs', { access_token: oauth.accessToken, refresh_token: oauth.refreshToken, lifetime: oauth.lifetimeToken, type: oauth.typeToken });
}

exports.updateTokens = async (req, res) => {
    if (oauth.refreshToken != null) {
        const query = {
            body: `grant_type=refresh_token&refresh_token=${oauth.refreshToken}&client_id=${yandex.CLIENT_ID}&client_secret=${yandex.CLIENT_SECRET}`,
            method: 'post'
        }
        await fetch('https://oauth.yandex.ru/token', query)
            .then(res => res.json())
            .then(data => { oauth.accessToken = data.access_token; oauth.refreshToken = data.refresh_token; oauth.lifetimeToken = data.expires_in; oauth.typeToken = data.token_type; })
    }
    res.redirect('/tokens')
} 