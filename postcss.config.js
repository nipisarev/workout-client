console.log('diman');
module.exports = {
    plugins: {
        'postcss-cssnext': {
            browsers: ['last 2 versions', '> 5%'],
            features: {
                customProperties: {
                    variables: {
                        'color-text': '#444548',
                        /* Note that you can use global colors and variables */
                        'color-primary': 'green',
                        'button-height': '40px',
                        'color-accent': 'blue'
                    }
                }
            }
        }
    }
}