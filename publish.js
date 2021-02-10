const ghpages = require('gh-pages');

ghpages.publish('dist', { repo: 'https://github.com/portfolio-y0711/dependencies' }, () => {
    console.log('publish succeeded');
});
