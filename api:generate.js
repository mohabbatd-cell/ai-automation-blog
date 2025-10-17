const AIContentGenerator = require('../generate-content.js');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const generator = new AIContentGenerator();
        const newPosts = generator.generateBlogPosts(5);
        
        res.status(200).json({
            success: true,
            message: `Generated ${newPosts.length} new blog posts`,
            posts: newPosts.map(post => post.title)
        });
    } catch (error) {
        console.error('Content generation error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};