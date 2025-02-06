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
                        className="relative text-left p-8 rounded-2xl group"
                    >
                        {/* Gradient border effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl group-hover:blur-xl transition-all duration-500" />

                        {/* Glass background */}
                        <div className="absolute inset-0 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border border-white/30 dark:border-gray-700/30" />

                        {/* เนื้อหาภายใน */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 [text-wrap:balance] tracking-tight">
                                    ยินดีต้อนรับ สู่{' '}
                                    <span className="inline-block">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 animate-gradient">
                                            Your Docs
                                        </span>
                                        <motion.div
                                            className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 rounded-full mt-1"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ delay: 0.5, duration: 0.8 }}
                                        />
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.p
                                className="text-xl text-gray-700 dark:text-gray-300 mb-8 [text-wrap:balance] leading-relaxed"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                คำแนะนำที่ครอบคลุมของคุณในการสร้างซอฟต์แวร์ที่น่าทึ่ง เรียบง่าย ทรงพลัง และจัดทำเป็นเอกสารอย่างสวยงาม
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                <motion.a
                                    whileHover={{ scale: 1.05, translateY: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/docs"
                                    className="relative group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium transition-all duration-300"
                                >
                                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                                    <span className="relative">ลองใช้งานตอนนี้</span>
                                </motion.a>

                                <motion.a
                                    whileHover={{ scale: 1.05, translateY: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://github.com/NekoSakuraLucia/Docs-Website-React"
                                    rel="noopener noreferrer"
                                    target='_blank'
                                    className="relative group px-8 py-3 rounded-xl font-medium transition-all duration-300"
                                >
                                    <span className="absolute inset-0 rounded-xl bg-white dark:bg-gray-800 opacity-50 group-hover:opacity-70 backdrop-blur-sm transition-opacity" />
                                    <span className="relative text-gray-900 dark:text-white">ดูโค้ดบน GitHub</span>
                                </motion.a>
                            </motion.div>
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