export const framerSidebarBackground = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.2 } },
    transition: { duration: 0.3 },
}

export const framerSidebarPanel = {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { duration: 0.3 },
}

export const framerText = delay => {
    return {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        transition: {
            delay: 0.5 + delay / 10,
        },
    }
}

export const framerButton = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 1,
    },
}