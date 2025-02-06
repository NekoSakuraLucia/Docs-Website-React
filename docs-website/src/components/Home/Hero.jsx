import { motion } from 'framer-motion';
import CodeBlock from './CodeBlock';
import Typewriter from 'typewriter-effect';

const TypedCodeBlock = () => {
    return (
        <div className="text-white">
            <CodeBlock
                code={
                    <Typewriter
                        options={{
                            delay: 50,
                            cursor: '|',
                            wrapperClassName: 'whitespace-pre-wrap'
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString('const messages = [\n')
                                .typeString('  "คำแนะนำที่ครอบคลุมของคุณในการสร้างซอฟต์แวร์ที่น่าทึ่ง เรียบง่าย และจัดทำเป็นเอกสารอย่างสวยงาม",\n')
                                .pauseFor(500)
                                .typeString('  "Template เว็บไซต์ Docs แจกฟรี สำหรับสร้างเอกสารอย่างสวยงาม",\n')
                                .pauseFor(500)
                                .typeString('];\n\n')
                                .typeString('console.log(messages);')
                                .start();
                        }}
                    />
                }
                language="javascript"
            />
        </div>
    );
};

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center">
            {/* พื้นหลังที่มีการไล่ระดับสีและเบลอ */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
                <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-[100px]" />
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/30 dark:bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/30 dark:bg-purple-500/20 rounded-full blur-3xl" />
            </div>

            {/* เนื้อหาหลัก */}
            <div className="relative container mx-auto px-6 py-16 md:-mt-[150px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 [text-wrap:balance]">
                            ยินดีต้อนรับ สู่{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                Your Docs
                            </span>
                        </h1>
                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 [text-wrap:balance]">
                            คำแนะนำที่ครอบคลุมของคุณในการสร้างซอฟต์แวร์ที่น่าทึ่ง เรียบง่าย ทรงพลัง และจัดทำเป็นเอกสารอย่างสวยงาม
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/docs"
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/25"
                            >
                                ลองใช้งานตอนนี้
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://github.com/NekoSakuraLucia/Docs-Website-React"
                                rel="noopener noreferrer"
                                target='_blank'
                                className="px-8 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white rounded-lg font-medium hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 shadow-lg"
                            >
                                ดูโค้ดบน GitHub
                            </motion.a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="backdrop-blur-sm bg-white/5 dark:bg-gray-900/5 p-3 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl"
                    >
                        <TypedCodeBlock />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;