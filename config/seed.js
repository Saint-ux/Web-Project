const { Course } = require('../models');

const seedDatabase = async () => {
    try {
        const count = await Course.count();
        if (count === 0) {
            await Course.bulkCreate([
                { title: 'Compiler Design', description: 'Deep dive into lexical analysis, parsing, and code generation engines.', instructor: 'Dr. Kebede' },
                { title: 'Computer Security', description: 'Advanced fundamentals covering cryptographic principles, network security, and JWT implementations.', instructor: 'Abebe Chala' },
                { title: 'Artificial Intelligence Foundations', description: 'Exploring heuristic search, neural architectures, and intelligent agent behaviors.', instructor: 'Dr. Alemu' }
            ]);
            console.log('[SEED] Sample courses successfully seeded into database.');
        }
    } catch (error) {
        console.error('[SEED ERROR] Failed to seed repository assets:', error);
    }
};

module.exports = seedDatabase;