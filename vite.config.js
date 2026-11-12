import vituum from 'vituum'
import pug from '@vituum/vite-plugin-pug'
import path from 'path'

export default {
    plugins: [
        vituum({
            imports: {
                filenamePattern: {
                    '+.css': [],
                    '+.scss': []
                }
            },
        }),
        pug({root: './src'}),
    ],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, 'src'),
            '@assets': path.resolve(import.meta.dirname, 'src/assets')
        },
    },
}
