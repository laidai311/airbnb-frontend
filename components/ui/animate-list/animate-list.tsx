import { AnimatePresence, motion } from "framer-motion"
import _ from "lodash"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AnimateListProvider } from "./animate-list-context"
import * as transitionList from "./animate-list-transtion"
import { useAnimateList, UseAnimateListProps, UseAnimateListReturn } from "./use-animate-list"

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export interface AnimateListProps extends UseAnimateListProps {
  children: React.ReactNode | ((value: UseAnimateListReturn) => React.ReactNode)
  transitionName?: "horizontalLinear" | "fade"
  className?: string
}

export const AnimateList = ({ children, transitionName = "fade", className, ...otherProps }: AnimateListProps) => {
  const context = useAnimateList(otherProps)

  return (
    <div className={cn("relative min-h-[320px]", className)}>
      <AnimateListProvider value={context}>
        <AnimatePresence initial={false} custom={context.direction}>
          <motion.div
            key={context.page}
            custom={context.direction}
            variants={transitionList[transitionName]}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              ease: "easeOut",
              opacity: { duration: 0.2 },
            }}
            className={"absolute inset-0"}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                context.paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                context.paginate(-1)
              }
            }}
          >
            {_.isFunction(children) ? children(context) : children}
          </motion.div>
        </AnimatePresence>
      </AnimateListProvider>
    </div>
  )
}
