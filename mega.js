const mega = require("megajs");
const auth = {
    email: 'caspertechke@gmail.com',
    password: 'caspertechke',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
}

const upload = (data, name) => {
    return new Promise((resolve, reject) => {
        try {
            const storage = new mega.Storage(auth, () => {
                data.pipe(storage.upload({name: name, allowUploadBuffering: true}));
                storage.on("add", (file) => {
                    file.link((err, url) => {
                        if (err) reject(err);
                        storage.close();
                        resolve(url);
                    });
                });
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = { upload };
