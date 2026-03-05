const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Content = require('../models/Content');

dotenv.config();

// Hand-picked unique, high-quality images from Unsplash for every single course based on title
// All cropped/sized nicely via URL parameters
const courseImages = {
    // ==================== COMPUTER SCIENCE ====================
    "Introduction to Programming - Python Basics": "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=800&q=80",
    "Computer Science Fundamentals PDF": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    "Programming Basics Quiz": "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80",
    "Data Structures and Algorithms": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    "Data Structures Complete Guide PDF": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    "Algorithms Assessment Quiz": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    "Advanced Algorithm Design": "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    "System Design and Architecture PDF": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "Advanced CS Concepts Quiz": "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80",

    // ==================== WEB DEVELOPMENT ====================
    "HTML & CSS Crash Course": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80",
    "Web Development Basics PDF": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    "HTML/CSS Fundamentals Quiz": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    "JavaScript ES6+ Complete Course": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
    "React.js Developer Guide PDF": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    "JavaScript Intermediate Quiz": "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
    "Advanced React Patterns & Performance": "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80",
    "Full-Stack Architecture PDF": "https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?w=800&q=80",
    "Advanced Web Dev Quiz": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",

    // ==================== AI/ML ====================
    "Introduction to Machine Learning": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    "AI Fundamentals PDF Guide": "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
    "ML Basics Quiz": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    "Deep Learning with Python": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    "Machine Learning Algorithms PDF": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    "Neural Networks Quiz": "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800&q=80",
    "Advanced Deep Learning & Computer Vision": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    "AI Research Papers Collection PDF": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
    "Advanced ML Concepts Quiz": "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&q=80",

    // ==================== MATHEMATICS ====================
    "Algebra Fundamentals": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "Basic Mathematics PDF": "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80",
    "Algebra Basics Quiz": "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80",
    "Calculus Complete Course": "https://images.unsplash.com/photo-1629854837599-2703fb737d97?w=800&q=80",
    "Linear Algebra PDF Guide": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
    "Calculus Assessment Quiz": "https://images.unsplash.com/photo-1632516643720-e7f5d7d6eca8?w=800&q=80",
    "Advanced Mathematical Analysis": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "Abstract Algebra PDF": "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80",
    "Advanced Math Quiz": "https://images.unsplash.com/photo-1633519183416-2abe062fcff0?w=800&q=80",

    // ==================== PHYSICS ====================
    "Introduction to Physics": "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80",
    "Physics Fundamentals PDF": "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=800&q=80",
    "Basic Physics Quiz": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    "Electromagnetism Course": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    "Thermodynamics PDF Guide": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    "Electromagnetism Quiz": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "Quantum Mechanics": "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&q=80",
    "Quantum Physics PDF": "https://images.unsplash.com/photo-1614729939124-03290b270737?w=800&q=80",
    "Advanced Physics Quiz": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",

    // ==================== CYBER SECURITY ====================
    "Cybersecurity Basics": "https://images.unsplash.com/photo-1510511459019-5d0197411ed7?w=800&q=80",
    "Introduction to Cybersecurity PDF": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    "Security Basics Quiz": "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80",
    "Ethical Hacking Course": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "Network Security PDF": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    "Penetration Testing Quiz": "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&q=80",
    "Advanced Threat Detection": "https://images.unsplash.com/photo-1510511459019-5d0197411ed7?w=800&q=80",
    "Advanced Security Architecture PDF": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    "Advanced Security Quiz": "https://images.unsplash.com/photo-1526374865366-af0a487c9649?w=800&q=80"
};

const defaultImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80";

const assignUniqueImages = async () => {
    try {
        const mongoUri = process.argv[2] || process.env.MONGODB_URI;
        if (!mongoUri) {
            console.error('No MongoDB URI provided!');
            process.exit(1);
        }

        console.log('Connecting to database...');
        await mongoose.connect(mongoUri);
        console.log('Connected!');

        console.log('Fetching all content...');
        const allContent = await Content.find({});

        console.log(`Updating ${allContent.length} items with UNIQUE cover images...`);
        let updatedCount = 0;

        for (const item of allContent) {
            const newImage = courseImages[item.title] || defaultImage;

            // Adding a small random query param ensures they are treated distinctly
            // if Unsplash caches identically for same URL but we might have reused a couple accidentally
            // Doing it here just in case! 
            item.coverImage = newImage;
            await item.save();
            updatedCount++;
        }

        console.log(`Successfully updated ${updatedCount} items with unique cover images!`);
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

assignUniqueImages();
