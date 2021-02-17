import postCssFlexBugsFix from 'postcss-flexbugs-fixes';
import postCssPresetEnv from 'postcss-preset-env';
import postCssNormalize from 'postcss-normalize';

module.exports = {
    plugins: [
        require('autoprefixer'), // needs post-css 8
        postCssFlexBugsFix(), // require('postcss-flexbugs-fixes'),
        postCssPresetEnv({
            autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
            },
            stage: 3,
        }), // require('postcss-preset-env')({
        // postCssNormalize(), // require('postcss-normalize'),
    ],
    ident: 'postcss',
};
