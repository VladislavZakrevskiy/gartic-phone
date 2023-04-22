const fs = require('fs')
const path = require('path')


class image {
    load(req, res) {
        try {
            let {image} = req.body
            image = image.replace('data:image/png;base64,', '')
            fs.writeFileSync(path.resolve(__dirname, 'images', `${req.query.id}.jpg`), image, 'base64')
            res.status(200).json('ok')
        } catch (e) {
            console.log(e)
            res.status(500).json('error')
        }
    }

    upload(req, res) {
        try {
            const file = fs.readFileSync(path.resolve(__dirname, 'images', `${req.query.id}.jpg`))
            const data = 'data:image/png;base64,' + file.toString('base64')
            res.json(data)
        } catch (e) {
            console.log(e)
            res.status(500).json('error')
        }
    }

}

module.exports = new image()