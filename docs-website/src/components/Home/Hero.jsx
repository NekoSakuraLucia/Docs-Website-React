import { motion } from 'framer-motion';
import CodeBlock from './CodeBlock';
import Typewriter from 'typewriter-effect';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router';

const TypedCodeBlock = () => {
    return (
        <div className="text-white">
            <CodeBlock
                code={
                    <Typewriter
                        options={{
                            delay: 50,
                            cursor: '|',
                            wrapperClassName: 'whitespace-pre-wrap',
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString('const messages = [\n')
                                .typeString(
                                    '  "คำแนะนำที่ครอบคลุมของคุณในการสร้างซอฟต์แวร์ที่น่าทึ่ง เรียบง่าย และจัดทำเป็นเอกสารอย่างสวยงาม",\n'
                                )
                                .pauseFor(500)
                                .typeString(
                                    '  "เว็บไซต์ Docs Web เอกสารที่อยากจะแนะนำให้กับคุณเลย!!!!",\n'
                                )
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
    // เพิ่ม mouse tracking สำหรับ 3D effect
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const damping = 50;
    const springX = useSpring(mouseX, { damping });
    const springY = useSpring(mouseY, { damping });

    const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + rect.height / 2;

                mouseX.set((e.clientX - centerX) / rect.width);
                mouseY.set((e.clientY - centerY) / rect.height);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

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
                                            Docs Web
                                        </span>
                                        <motion.div
                                            className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 rounded-full mt-1"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{
                                                delay: 0.5,
                                                duration: 0.8,
                                            }}
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
                                คำแนะนำที่ครอบคลุมของคุณในการสร้างซอฟต์แวร์ที่น่าทึ่ง
                                เรียบง่าย ทรงพลัง และจัดทำเป็นเอกสารอย่างสวยงาม
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05, translateY: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to="/docs"
                                        className="relative group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium transition-all duration-300"
                                    >
                                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                                        <span className="relative">
                                            ลองใช้งานตอนนี้
                                        </span>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <div ref={containerRef} className="perspective-1000">
                        <motion.div
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="relative"
                        >
                            {/* เอฟเฟกต์เรืองแสง */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />

                            {/* เนื้อหาหลัก 2 */}
                            <div className="relative backdrop-blur-sm bg-white/5 dark:bg-gray-900/5 p-3 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl">
                                {/* องค์ประกอบลอยตัว 3 มิติ */}
                                <div
                                    className="absolute -left-4 -top-4 w-8 h-8 bg-blue-500/10 rounded-lg transform rotate-12 translate-z-12"
                                    style={{ transform: 'translateZ(40px)' }}
                                />
                                <div
                                    className="absolute -right-6 -bottom-6 w-12 h-12 bg-purple-500/10 rounded-lg transform -rotate-12 translate-z-8"
                                    style={{ transform: 'translateZ(60px)' }}
                                />

                                {/* เนื้อหาภายในโค้ด */}
                                <motion.div
                                    style={{ transform: 'translateZ(30px)' }}
                                    className="relative z-10"
                                >
                                    <TypedCodeBlock />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
