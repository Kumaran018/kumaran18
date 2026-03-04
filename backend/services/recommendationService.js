/**
 * AI Recommendation Service
 * Implements a weighted scoring formula based on:
 * 1. Content-Based Filtering (Tag/Interest Match) - 40% weight
 * 2. Skill-Level Matching - 30% weight
 * 3. Interaction History / Popularity - 30% weight
 */

const Content = require('../models/Content');
const Interaction = require('../models/Interaction');

/**
 * Calculates Jaccard Similarity between two sets of strings
 */
const calculateSimilarity = (set1, set2) => {
    const intersection = set1.filter(tag => set2.includes(tag));
    const union = [...new Set([...set1, ...set2])];
    return intersection.length / union.length;
};

/**
 * Maps difficulty to numeric value for distance calculation
 */
const difficultyMap = {
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3
};

/**
 * Calculates skill level match score (1 - normalized distance)
 */
const calculateSkillMatch = (userSkill, contentDifficulty) => {
    const userVal = difficultyMap[userSkill] || 1;
    const contentVal = difficultyMap[contentDifficulty] || 1;

    // Perfect match = 1.0
    // One level away = 0.5
    // Two levels away = 0.0
    const distance = Math.abs(userVal - contentVal);
    return Math.max(0, 1 - (distance * 0.5));
};

const getRecommendations = async (user) => {
    const allContent = await Content.find({});
    const userInteractions = await Interaction.find({ userId: user._id });

    // Get unique content IDs the user has already viewed/completed
    const interactedContentIds = userInteractions.map(i => i.contentId.toString());

    const scoredContent = allContent.map(content => {
        // 1. Tag Match Score (0 to 1)
        const tagMatchScore = calculateSimilarity(user.interests, content.tags);

        // 2. Skill Match Score (0 to 1)
        const skillMatchScore = calculateSkillMatch(user.skillLevel, content.difficulty);

        // 3. Interaction / Popularity Weight
        // We boost content that hasn't been seen, or boost highly rated content
        const interactionWeight = interactedContentIds.includes(content._id.toString()) ? 0.2 : 1.0;
        const popularityScore = (content.rating / 5) * 0.7 + (Math.min(content.viewCount, 1000) / 1000) * 0.3;

        const finalInteractionScore = (interactionWeight * 0.5) + (popularityScore * 0.5);

        // Weighted Formula: Score = (T * 0.4) + (S * 0.3) + (I * 0.3)
        const totalScore = (tagMatchScore * 0.4) + (skillMatchScore * 0.3) + (finalInteractionScore * 0.3);

        return {
            ...content.toObject(),
            recommendationScore: totalScore
        };
    });

    // Sort by score descending and return top 10
    return scoredContent
        .filter(c => !userInteractions.some(i => i.contentId.toString() === c._id.toString() && i.type === 'complete'))
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, 10);
};

module.exports = { getRecommendations };
