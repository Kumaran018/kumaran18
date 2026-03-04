const User = require('../models/User');
const Content = require('../models/Content');
const Interaction = require('../models/Interaction');

// @desc    Get all users with stats
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    const users = await User.find({}).select('-password');

    // Calculate basic stats for each user
    const usersWithStats = await Promise.all(users.map(async (user) => {
        const completionCount = await Interaction.countDocuments({
            userId: user._id,
            type: 'complete'
        });

        // Mark as inactive if no login in 30 days
        const isInactive = (new Date() - new Date(user.lastLogin)) > (30 * 24 * 60 * 60 * 1000);

        return {
            ...user.toObject(),
            completionCount,
            isInactive
        };
    }));

    res.json(usersWithStats);
};

// @desc    Update user role
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
        user.role = role;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Get platform stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getPlatformStats = async (req, res) => {
    const totalUsers = await User.countDocuments({});
    const totalContent = await Content.countDocuments({});
    const activeUsers = await User.countDocuments({
        lastLogin: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });
    const inactiveUsers = totalUsers - activeUsers;

    const totalCompletions = await Interaction.countDocuments({ type: 'complete' });

    res.json({
        totalUsers,
        totalContent,
        activeUsers,
        inactiveUsers,
        totalCompletions
    });
};

// @desc    AI Resource Collector Agent (Real-time Search)
// @route   POST /api/admin/agent/collect
// @access  Private/Admin/Moderator
const aiResourceAgent = async (req, res) => {
    const { domain, topic } = req.body;

    try {
        console.log(`AI Agent searching for: ${topic} in domain: ${domain}`);
        const axios = require('axios');
        const suggestedResources = [];

        // 1. Search GitHub for repositories
        try {
            const githubResponse = await axios.get('https://api.github.com/search/repositories', {
                params: {
                    q: `${topic} ${domain} tutorial OR awesome`,
                    sort: 'stars',
                    order: 'desc',
                    per_page: 5
                },
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Learning-Platform-Agent'
                }
            });

            githubResponse.data.items.slice(0, 3).forEach(repo => {
                const difficulty = repo.stargazers_count > 10000 ? 'Beginner' : 
                                 repo.stargazers_count > 1000 ? 'Intermediate' : 'Advanced';
                
                suggestedResources.push({
                    title: repo.full_name,
                    type: 'coding',
                    difficulty: difficulty,
                    url: repo.html_url,
                    tags: [domain.toLowerCase(), topic.toLowerCase(), 'github', 'open-source'],
                    description: repo.description || `Popular GitHub repository for ${topic} with ${repo.stargazers_count} stars`,
                    metadata: {
                        stars: repo.stargazers_count,
                        language: repo.language
                    }
                });
            });
        } catch (err) {
            console.error('GitHub API error:', err.message);
        }

        // 2. Generate YouTube search links (direct search URLs)
        const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' ' + domain + ' tutorial')}`;
        suggestedResources.push({
            title: `${topic} Video Tutorials`,
            type: 'video',
            difficulty: 'Beginner',
            url: youtubeSearchUrl,
            tags: [domain.toLowerCase(), topic.toLowerCase(), 'video', 'tutorial'],
            description: `Curated YouTube tutorials for learning ${topic} in ${domain}. Browse through top-rated educational videos.`
        });

        // 3. Add popular learning platforms
        const learningPlatforms = [
            {
                name: 'freeCodeCamp',
                url: `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(topic)}`,
                type: 'article',
                description: `Free articles and tutorials about ${topic} from freeCodeCamp`
            },
            {
                name: 'MDN Web Docs',
                url: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(topic)}`,
                type: 'article',
                description: `Official documentation and guides for ${topic}`
            },
            {
                name: 'Dev.to Community',
                url: `https://dev.to/search?q=${encodeURIComponent(topic)}`,
                type: 'article',
                description: `Community articles and discussions about ${topic}`
            }
        ];

        // Add relevant learning platforms based on domain
        if (domain.toLowerCase().includes('web') || domain.toLowerCase().includes('javascript') || 
            domain.toLowerCase().includes('frontend') || domain.toLowerCase().includes('backend')) {
            suggestedResources.push({
                title: learningPlatforms[0].name + ` - ${topic}`,
                type: learningPlatforms[0].type,
                difficulty: 'Beginner',
                url: learningPlatforms[0].url,
                tags: [domain.toLowerCase(), topic.toLowerCase(), 'article', 'tutorial'],
                description: learningPlatforms[0].description
            });
        }

        // 4. Add Stack Overflow search for problem-solving
        suggestedResources.push({
            title: `${topic} - Q&A and Solutions`,
            type: 'article',
            difficulty: 'Intermediate',
            url: `https://stackoverflow.com/search?q=${encodeURIComponent(topic + ' ' + domain)}`,
            tags: [domain.toLowerCase(), topic.toLowerCase(), 'qa', 'problem-solving'],
            description: `Community-driven Q&A for ${topic}. Find solutions to common problems and best practices.`
        });

        // 5. Add official documentation search
        suggestedResources.push({
            title: `${topic} Official Documentation`,
            type: 'article',
            difficulty: 'Intermediate',
            url: `https://www.google.com/search?q=${encodeURIComponent(topic + ' official documentation ' + domain)}`,
            tags: [domain.toLowerCase(), topic.toLowerCase(), 'documentation', 'reference'],
            description: `Official documentation and reference materials for ${topic}`
        });

        // 6. Add course platforms
        suggestedResources.push({
            title: `${topic} Online Courses`,
            type: 'video',
            difficulty: 'Beginner',
            url: `https://www.coursera.org/search?query=${encodeURIComponent(topic + ' ' + domain)}`,
            tags: [domain.toLowerCase(), topic.toLowerCase(), 'course', 'structured-learning'],
            description: `Structured online courses for ${topic} from top universities and companies`
        });

        res.json({
            agentMessage: `Successfully found ${suggestedResources.length} real-time resources for "${topic}" in ${domain}. Resources include GitHub repos, video tutorials, documentation, and community articles.`,
            suggestions: suggestedResources,
            searchQuery: { domain, topic }
        });

    } catch (error) {
        console.error('AI Agent error:', error);
        res.status(500).json({
            agentMessage: 'Error fetching resources. Please try again.',
            suggestions: [],
            error: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    updateUserRole,
    getPlatformStats,
    aiResourceAgent
};
