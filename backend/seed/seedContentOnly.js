const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Content = require('../models/Content');

dotenv.config();

const academicContent = [
    // ==================== COMPUTER SCIENCE ====================
    // Beginner Level
    {
        title: "Introduction to Programming - Python Basics",
        subject: "Computer Science",
        type: "video",
        difficulty: "Beginner",
        tags: ["python", "programming", "basics", "syntax"],
        contentUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        description: "Learn Python programming from scratch. Perfect for absolute beginners.",
        rating: 4.8,
        viewCount: 1200
    },
    {
        title: "Computer Science Fundamentals PDF",
        subject: "Computer Science",
        type: "pdf",
        difficulty: "Beginner",
        tags: ["cs-fundamentals", "basics", "theory"],
        contentUrl: "https://www.tutorialspoint.com/computer_fundamentals/computer_fundamentals_tutorial.pdf",
        description: "Complete guide to computer science fundamentals including hardware, software, and basic concepts.",
        rating: 4.5,
        viewCount: 800
    },
    {
        title: "Programming Basics Quiz",
        subject: "Computer Science",
        type: "quiz",
        difficulty: "Beginner",
        tags: ["programming", "basics", "variables", "loops"],
        contentUrl: "https://www.w3schools.com/quiztest/quiztest.asp?qtest=PYTHON",
        description: "Test your understanding of basic programming concepts.",
        rating: 4.3,
        viewCount: 500
    },
    // Intermediate Level
    {
        title: "Data Structures and Algorithms",
        subject: "Computer Science",
        type: "video",
        difficulty: "Intermediate",
        tags: ["algorithms", "data-structures", "sorting", "searching"],
        contentUrl: "https://www.youtube.com/watch?v=8hly31xKli0",
        description: "Comprehensive course on data structures and algorithms with practical examples.",
        rating: 4.9,
        viewCount: 2500
    },
    {
        title: "Data Structures Complete Guide PDF",
        subject: "Computer Science",
        type: "pdf",
        difficulty: "Intermediate",
        tags: ["data-structures", "linked-lists", "trees", "graphs"],
        contentUrl: "https://www.geeksforgeeks.org/data-structures/",
        description: "In-depth guide covering arrays, linked lists, stacks, queues, trees, and graphs.",
        rating: 4.7,
        viewCount: 1800
    },
    {
        title: "Algorithms Assessment Quiz",
        subject: "Computer Science",
        type: "quiz",
        difficulty: "Intermediate",
        tags: ["algorithms", "complexity", "sorting"],
        contentUrl: "https://www.hackerrank.com/domains/algorithms",
        description: "Challenge yourself with algorithm problems and complexity analysis.",
        rating: 4.6,
        viewCount: 1200
    },
    // Advanced Level
    {
        title: "Advanced Algorithm Design",
        subject: "Computer Science",
        type: "video",
        difficulty: "Advanced",
        tags: ["algorithms", "dynamic-programming", "greedy", "graph-algorithms"],
        contentUrl: "https://www.youtube.com/watch?v=oBt53YbR9Kk",
        description: "Master advanced algorithmic techniques including dynamic programming and graph algorithms.",
        rating: 4.9,
        viewCount: 1500
    },
    {
        title: "System Design and Architecture PDF",
        subject: "Computer Science",
        type: "pdf",
        difficulty: "Advanced",
        tags: ["system-design", "architecture", "scalability"],
        contentUrl: "https://github.com/donnemartin/system-design-primer",
        description: "Learn how to design large-scale systems with real-world examples.",
        rating: 4.8,
        viewCount: 2000
    },
    {
        title: "Advanced CS Concepts Quiz",
        subject: "Computer Science",
        type: "quiz",
        difficulty: "Advanced",
        tags: ["system-design", "algorithms", "optimization"],
        contentUrl: "https://leetcode.com/problemset/all/",
        description: "Test your knowledge on advanced computer science topics.",
        rating: 4.7,
        viewCount: 900
    },

    // ==================== WEB DEVELOPMENT ====================
    // Beginner Level
    {
        title: "HTML & CSS Crash Course",
        subject: "Web Development",
        type: "video",
        difficulty: "Beginner",
        tags: ["html", "css", "frontend", "basics"],
        contentUrl: "https://www.youtube.com/watch?v=UB1O30fR-EE",
        description: "Learn HTML and CSS from scratch to build beautiful websites.",
        rating: 4.7,
        viewCount: 3000
    },
    {
        title: "Web Development Basics PDF",
        subject: "Web Development",
        type: "pdf",
        difficulty: "Beginner",
        tags: ["html", "css", "javascript", "basics"],
        contentUrl: "https://www.w3.org/standards/webdesign/",
        description: "Complete guide to web development fundamentals.",
        rating: 4.5,
        viewCount: 1500
    },
    {
        title: "HTML/CSS Fundamentals Quiz",
        subject: "Web Development",
        type: "quiz",
        difficulty: "Beginner",
        tags: ["html", "css", "basics"],
        contentUrl: "https://www.w3schools.com/html/html_quiz.asp",
        description: "Test your HTML and CSS knowledge.",
        rating: 4.4,
        viewCount: 1000
    },
    // Intermediate Level
    {
        title: "JavaScript ES6+ Complete Course",
        subject: "Web Development",
        type: "video",
        difficulty: "Intermediate",
        tags: ["javascript", "es6", "async", "promises"],
        contentUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        description: "Master modern JavaScript with ES6+ features and best practices.",
        rating: 4.8,
        viewCount: 2800
    },
    {
        title: "React.js Developer Guide PDF",
        subject: "Web Development",
        type: "pdf",
        difficulty: "Intermediate",
        tags: ["react", "components", "hooks", "state"],
        contentUrl: "https://react.dev/learn",
        description: "Comprehensive guide to building modern web apps with React.",
        rating: 4.9,
        viewCount: 2200
    },
    {
        title: "JavaScript Intermediate Quiz",
        subject: "Web Development",
        type: "quiz",
        difficulty: "Intermediate",
        tags: ["javascript", "functions", "objects"],
        contentUrl: "https://www.w3schools.com/js/js_quiz.asp",
        description: "Challenge your JavaScript skills with intermediate problems.",
        rating: 4.6,
        viewCount: 1400
    },
    // Advanced Level
    {
        title: "Advanced React Patterns & Performance",
        subject: "Web Development",
        type: "video",
        difficulty: "Advanced",
        tags: ["react", "optimization", "patterns", "architecture"],
        contentUrl: "https://www.youtube.com/watch?v=3XaXKiXtNjw",
        description: "Master advanced React patterns, performance optimization, and architecture.",
        rating: 4.9,
        viewCount: 1800
    },
    {
        title: "Full-Stack Architecture PDF",
        subject: "Web Development",
        type: "pdf",
        difficulty: "Advanced",
        tags: ["fullstack", "architecture", "microservices", "deployment"],
        contentUrl: "https://github.com/kamranahmedse/developer-roadmap",
        description: "Complete guide to full-stack development and system architecture.",
        rating: 4.8,
        viewCount: 1600
    },
    {
        title: "Advanced Web Dev Quiz",
        subject: "Web Development",
        type: "quiz",
        difficulty: "Advanced",
        tags: ["react", "node", "architecture"],
        contentUrl: "https://www.codingame.com/start",
        description: "Test your advanced web development knowledge.",
        rating: 4.7,
        viewCount: 800
    },

    // ==================== AI/ML ====================
    // Beginner Level
    {
        title: "Introduction to Machine Learning",
        subject: "AI/ML",
        type: "video",
        difficulty: "Beginner",
        tags: ["machine-learning", "ai", "basics", "python"],
        contentUrl: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
        description: "Learn the fundamentals of machine learning and AI.",
        rating: 4.8,
        viewCount: 2500
    },
    {
        title: "AI Fundamentals PDF Guide",
        subject: "AI/ML",
        type: "pdf",
        difficulty: "Beginner",
        tags: ["ai", "basics", "concepts"],
        contentUrl: "https://www.ibm.com/cloud/learn/what-is-artificial-intelligence",
        description: "Introduction to artificial intelligence concepts and applications.",
        rating: 4.6,
        viewCount: 1200
    },
    {
        title: "ML Basics Quiz",
        subject: "AI/ML",
        type: "quiz",
        difficulty: "Beginner",
        tags: ["machine-learning", "basics"],
        contentUrl: "https://www.kaggle.com/learn",
        description: "Test your understanding of basic ML concepts.",
        rating: 4.5,
        viewCount: 900
    },
    // Intermediate Level
    {
        title: "Deep Learning with Python",
        subject: "AI/ML",
        type: "video",
        difficulty: "Intermediate",
        tags: ["deep-learning", "neural-networks", "tensorflow", "keras"],
        contentUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
        description: "Build neural networks and deep learning models with Python.",
        rating: 4.9,
        viewCount: 3200
    },
    {
        title: "Machine Learning Algorithms PDF",
        subject: "AI/ML",
        type: "pdf",
        difficulty: "Intermediate",
        tags: ["algorithms", "supervised", "unsupervised"],
        contentUrl: "https://scikit-learn.org/stable/tutorial/index.html",
        description: "Comprehensive guide to ML algorithms and their implementations.",
        rating: 4.7,
        viewCount: 1800
    },
    {
        title: "Neural Networks Quiz",
        subject: "AI/ML",
        type: "quiz",
        difficulty: "Intermediate",
        tags: ["neural-networks", "deep-learning"],
        contentUrl: "https://www.coursera.org/learn/neural-networks-deep-learning",
        description: "Test your knowledge of neural networks and deep learning.",
        rating: 4.6,
        viewCount: 1100
    },
    // Advanced Level
    {
        title: "Advanced Deep Learning & Computer Vision",
        subject: "AI/ML",
        type: "video",
        difficulty: "Advanced",
        tags: ["computer-vision", "cnn", "transformers", "advanced"],
        contentUrl: "https://www.youtube.com/watch?v=ArPaAX_PhIs",
        description: "Master advanced deep learning techniques and computer vision.",
        rating: 4.9,
        viewCount: 2000
    },
    {
        title: "AI Research Papers Collection PDF",
        subject: "AI/ML",
        type: "pdf",
        difficulty: "Advanced",
        tags: ["research", "papers", "advanced", "theory"],
        contentUrl: "https://arxiv.org/list/cs.AI/recent",
        description: "Collection of cutting-edge AI research papers and implementations.",
        rating: 4.8,
        viewCount: 1200
    },
    {
        title: "Advanced ML Concepts Quiz",
        subject: "AI/ML",
        type: "quiz",
        difficulty: "Advanced",
        tags: ["advanced", "research", "theory"],
        contentUrl: "https://www.kaggle.com/competitions",
        description: "Challenge yourself with advanced ML problems.",
        rating: 4.7,
        viewCount: 700
    },

    // ==================== MATHEMATICS ====================
    // Beginner Level
    {
        title: "Algebra Fundamentals",
        subject: "Mathematics",
        type: "video",
        difficulty: "Beginner",
        tags: ["algebra", "equations", "basics"],
        contentUrl: "https://www.youtube.com/watch?v=NybHckSEQBI",
        description: "Learn the basics of algebra including equations and functions.",
        rating: 4.7,
        viewCount: 1800
    },
    {
        title: "Basic Mathematics PDF",
        subject: "Mathematics",
        type: "pdf",
        difficulty: "Beginner",
        tags: ["math", "basics", "arithmetic"],
        contentUrl: "https://www.mathsisfun.com/",
        description: "Complete guide to basic mathematics concepts.",
        rating: 4.5,
        viewCount: 1400
    },
    {
        title: "Algebra Basics Quiz",
        subject: "Mathematics",
        type: "quiz",
        difficulty: "Beginner",
        tags: ["algebra", "equations"],
        contentUrl: "https://www.khanacademy.org/math/algebra",
        description: "Test your algebra fundamentals.",
        rating: 4.4,
        viewCount: 1000
    },
    // Intermediate Level
    {
        title: "Calculus Complete Course",
        subject: "Mathematics",
        type: "video",
        difficulty: "Intermediate",
        tags: ["calculus", "derivatives", "integrals"],
        contentUrl: "https://www.youtube.com/watch?v=WUvTyaaNkzM",
        description: "Master calculus from limits to integration.",
        rating: 4.8,
        viewCount: 2200
    },
    {
        title: "Linear Algebra PDF Guide",
        subject: "Mathematics",
        type: "pdf",
        difficulty: "Intermediate",
        tags: ["linear-algebra", "matrices", "vectors"],
        contentUrl: "https://www.math.ucdavis.edu/~linear/",
        description: "Comprehensive guide to linear algebra and matrix operations.",
        rating: 4.7,
        viewCount: 1600
    },
    {
        title: "Calculus Assessment Quiz",
        subject: "Mathematics",
        type: "quiz",
        difficulty: "Intermediate",
        tags: ["calculus", "derivatives", "integrals"],
        contentUrl: "https://www.khanacademy.org/math/calculus-1",
        description: "Test your calculus knowledge.",
        rating: 4.6,
        viewCount: 1200
    },
    // Advanced Level
    {
        title: "Advanced Mathematical Analysis",
        subject: "Mathematics",
        type: "video",
        difficulty: "Advanced",
        tags: ["analysis", "topology", "advanced"],
        contentUrl: "https://www.youtube.com/watch?v=sqEyWLGvvdw",
        description: "Explore advanced topics in mathematical analysis.",
        rating: 4.9,
        viewCount: 1000
    },
    {
        title: "Abstract Algebra PDF",
        subject: "Mathematics",
        type: "pdf",
        difficulty: "Advanced",
        tags: ["abstract-algebra", "groups", "rings"],
        contentUrl: "https://abstract.ups.edu/",
        description: "Deep dive into abstract algebra and group theory.",
        rating: 4.8,
        viewCount: 800
    },
    {
        title: "Advanced Math Quiz",
        subject: "Mathematics",
        type: "quiz",
        difficulty: "Advanced",
        tags: ["advanced", "analysis", "theory"],
        contentUrl: "https://www.brilliant.org/courses/advanced-mathematics/",
        description: "Challenge yourself with advanced mathematical problems.",
        rating: 4.7,
        viewCount: 600
    },

    // ==================== PHYSICS ====================
    // Beginner Level
    {
        title: "Introduction to Physics",
        subject: "Physics",
        type: "video",
        difficulty: "Beginner",
        tags: ["physics", "mechanics", "basics"],
        contentUrl: "https://www.youtube.com/watch?v=ZM8ECpBuQYE",
        description: "Learn the fundamentals of physics including motion and forces.",
        rating: 4.7,
        viewCount: 1600
    },
    {
        title: "Physics Fundamentals PDF",
        subject: "Physics",
        type: "pdf",
        difficulty: "Beginner",
        tags: ["physics", "basics", "concepts"],
        contentUrl: "https://www.physicsclassroom.com/",
        description: "Complete guide to basic physics concepts.",
        rating: 4.6,
        viewCount: 1200
    },
    {
        title: "Basic Physics Quiz",
        subject: "Physics",
        type: "quiz",
        difficulty: "Beginner",
        tags: ["physics", "mechanics", "basics"],
        contentUrl: "https://www.khanacademy.org/science/physics",
        description: "Test your understanding of basic physics.",
        rating: 4.5,
        viewCount: 900
    },
    // Intermediate Level
    {
        title: "Electromagnetism Course",
        subject: "Physics",
        type: "video",
        difficulty: "Intermediate",
        tags: ["electromagnetism", "electricity", "magnetism"],
        contentUrl: "https://www.youtube.com/watch?v=OBN3kNO3V8g",
        description: "Comprehensive course on electricity and magnetism.",
        rating: 4.8,
        viewCount: 1800
    },
    {
        title: "Thermodynamics PDF Guide",
        subject: "Physics",
        type: "pdf",
        difficulty: "Intermediate",
        tags: ["thermodynamics", "heat", "energy"],
        contentUrl: "https://www.feynmanlectures.caltech.edu/",
        description: "In-depth guide to thermodynamics and heat transfer.",
        rating: 4.7,
        viewCount: 1400
    },
    {
        title: "Electromagnetism Quiz",
        subject: "Physics",
        type: "quiz",
        difficulty: "Intermediate",
        tags: ["electromagnetism", "circuits"],
        contentUrl: "https://phet.colorado.edu/en/simulations/filter?subjects=physics",
        description: "Test your knowledge of electromagnetic theory.",
        rating: 4.6,
        viewCount: 1000
    },
    // Advanced Level
    {
        title: "Quantum Mechanics",
        subject: "Physics",
        type: "video",
        difficulty: "Advanced",
        tags: ["quantum", "mechanics", "advanced"],
        contentUrl: "https://www.youtube.com/watch?v=lZ3bPUKo5zc",
        description: "Explore the fascinating world of quantum mechanics.",
        rating: 4.9,
        viewCount: 1500
    },
    {
        title: "Quantum Physics PDF",
        subject: "Physics",
        type: "pdf",
        difficulty: "Advanced",
        tags: ["quantum", "physics", "theory"],
        contentUrl: "https://www.quantum-physics.polytechnique.fr/",
        description: "Advanced quantum physics theory and applications.",
        rating: 4.8,
        viewCount: 1100
    },
    {
        title: "Advanced Physics Quiz",
        subject: "Physics",
        type: "quiz",
        difficulty: "Advanced",
        tags: ["quantum", "relativity", "advanced"],
        contentUrl: "https://www.brilliant.org/courses/quantum-mechanics/",
        description: "Challenge yourself with advanced physics problems.",
        rating: 4.7,
        viewCount: 700
    },

    // ==================== CYBER SECURITY ====================
    // Beginner Level
    {
        title: "Cybersecurity Basics",
        subject: "Cyber Security",
        type: "video",
        difficulty: "Beginner",
        tags: ["security", "basics", "threats"],
        contentUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
        description: "Learn the fundamentals of cybersecurity and online safety.",
        rating: 4.7,
        viewCount: 2000
    },
    {
        title: "Introduction to Cybersecurity PDF",
        subject: "Cyber Security",
        type: "pdf",
        difficulty: "Beginner",
        tags: ["security", "basics", "concepts"],
        contentUrl: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/entry/cybersecurity-essentials.html",
        description: "Complete guide to cybersecurity fundamentals.",
        rating: 4.6,
        viewCount: 1500
    },
    {
        title: "Security Basics Quiz",
        subject: "Cyber Security",
        type: "quiz",
        difficulty: "Beginner",
        tags: ["security", "basics"],
        contentUrl: "https://www.cybrary.it/",
        description: "Test your cybersecurity knowledge.",
        rating: 4.5,
        viewCount: 1100
    },
    // Intermediate Level
    {
        title: "Ethical Hacking Course",
        subject: "Cyber Security",
        type: "video",
        difficulty: "Intermediate",
        tags: ["hacking", "penetration-testing", "security"],
        contentUrl: "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
        description: "Learn ethical hacking and penetration testing techniques.",
        rating: 4.8,
        viewCount: 2500
    },
    {
        title: "Network Security PDF",
        subject: "Cyber Security",
        type: "pdf",
        difficulty: "Intermediate",
        tags: ["network", "security", "protocols"],
        contentUrl: "https://www.sans.org/reading-room/",
        description: "Comprehensive guide to network security and protocols.",
        rating: 4.7,
        viewCount: 1800
    },
    {
        title: "Penetration Testing Quiz",
        subject: "Cyber Security",
        type: "quiz",
        difficulty: "Intermediate",
        tags: ["pentesting", "hacking"],
        contentUrl: "https://www.hackthebox.com/",
        description: "Test your penetration testing skills.",
        rating: 4.6,
        viewCount: 1300
    },
    // Advanced Level
    {
        title: "Advanced Threat Detection",
        subject: "Cyber Security",
        type: "video",
        difficulty: "Advanced",
        tags: ["threat-detection", "forensics", "advanced"],
        contentUrl: "https://www.youtube.com/watch?v=NG9Cg_vBKOg",
        description: "Master advanced threat detection and incident response.",
        rating: 4.9,
        viewCount: 1600
    },
    {
        title: "Advanced Security Architecture PDF",
        subject: "Cyber Security",
        type: "pdf",
        difficulty: "Advanced",
        tags: ["architecture", "security", "enterprise"],
        contentUrl: "https://www.nist.gov/cyberframework",
        description: "Enterprise security architecture and frameworks.",
        rating: 4.8,
        viewCount: 1200
    },
    {
        title: "Advanced Security Quiz",
        subject: "Cyber Security",
        type: "quiz",
        difficulty: "Advanced",
        tags: ["advanced", "forensics", "incident-response"],
        contentUrl: "https://www.offensive-security.com/",
        description: "Challenge yourself with advanced security scenarios.",
        rating: 4.7,
        viewCount: 800
    }
];

const seedDB = async () => {
    try {
        const mongoUri = process.argv[2] || process.env.MONGODB_URI;
        if (!mongoUri) {
            console.error('No MongoDB URI provided!');
            process.exit(1);
        }

        console.log('Connecting to database...');
        await mongoose.connect(mongoUri);
        console.log('Connected!');

        console.log('Clearing old content...');
        await Content.deleteMany();

        console.log('Inserting new content...');
        const createdContent = await Content.insertMany(academicContent);

        console.log(`Successfully inserted ${createdContent.length} items!`);
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
