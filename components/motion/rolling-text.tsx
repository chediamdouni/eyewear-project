"use client"

import { motion, type Transition, type UseInViewOptions, useInView } from "motion/react"
import * as React from "react"

const ENTRY_ANIMATION = {
    initial: { rotateX: 0 },
    animate: { rotateX: 90 },
}

const EXIT_ANIMATION = {
    initial: { rotateX: 90 },
    animate: { rotateX: 0 },
}

const formatCharacter = (char: string) => (char === " " ? "\u00A0" : char)

type RollingTextProps = Omit<React.ComponentProps<"span">, "children"> & {
    transition?: Transition
    inView?: boolean
    inViewMargin?: UseInViewOptions["margin"]
    inViewOnce?: boolean
    text: string
    triggerOnHover?: boolean
}

function RollingText({
    ref,
    transition = { duration: 0.3, delay: 0.03, ease: "easeOut" },
    inView = false,
    inViewMargin = "0px",
    inViewOnce = true,
    text,
    triggerOnHover = false,
    ...props
}: RollingTextProps) {
    const localRef = React.useRef<HTMLSpanElement>(null)
    const [isHovered, setIsHovered] = React.useState(false)
    const [animationKey, setAnimationKey] = React.useState(0)
    
    // Handle forwarded ref if provided
    React.useEffect(() => {
        if (ref) {
            if (typeof ref === 'function') {
                ref(localRef.current)
            } else {
                ref.current = localRef.current
            }
        }
    }, [ref])

    // Reset animation key on hover to force re-animation
    React.useEffect(() => {
        if (triggerOnHover && isHovered) {
            setAnimationKey(prev => prev + 1)
        }
    }, [isHovered, triggerOnHover])

    const inViewResult = useInView(localRef, {
        once: inViewOnce,
        margin: inViewMargin,
    })
    
    // Use hover state if triggerOnHover is true, otherwise use inView
    const isInView = triggerOnHover 
        ? isHovered 
        : (!inView || inViewResult)

    const characters = React.useMemo(() => text.split(""), [text])

    return (
        <span 
            data-slot="rolling-text" 
            {...(props as any)} 
            ref={localRef}
            onMouseEnter={() => triggerOnHover && setIsHovered(true)}
            onMouseLeave={() => triggerOnHover && setIsHovered(false)}
        >
            {characters.map((char, idx) => (
                <span
                    aria-hidden="true"
                    className="relative inline-block perspective-[9999999px] transform-3d w-auto"
                    key={`${idx}-${animationKey}`}
                >
                    <motion.span
                        key={`entry-${idx}-${animationKey}`}
                        animate={isInView ? ENTRY_ANIMATION.animate : ENTRY_ANIMATION.initial}
                        className="absolute inline-block backface-hidden origin-[50%_25%]"
                        initial={ENTRY_ANIMATION.initial}
                        transition={{
                            ...transition,
                            delay: idx * (transition?.delay ?? 0),
                        }}
                    >
                        {formatCharacter(char)}
                    </motion.span>
                    <motion.span
                        key={`exit-${idx}-${animationKey}`}
                        animate={isInView ? EXIT_ANIMATION.animate : EXIT_ANIMATION.initial}
                        className="absolute inline-block backface-hidden origin-[50%_100%]"
                        initial={EXIT_ANIMATION.initial}
                        transition={{
                            ...transition,
                            delay: idx * (transition?.delay ?? 0) + 0.15,
                        }}
                    >
                        {formatCharacter(char)}
                    </motion.span>
                    <span className="invisible">{formatCharacter(char)}</span>
                </span>
            ))}

            <span className="sr-only">{text}</span>
        </span>
    )
}

export { RollingText, type RollingTextProps }
export default RollingText
