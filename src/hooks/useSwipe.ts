import { TouchEvent, useState } from 'react';

interface SwipeInput {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
}

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeInput) {
    const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);

    const onTouchStart = (e: TouchEvent) => {
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const onTouchEnd = (e: TouchEvent) => {
        if (!touchStart) return;
        
        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        };

        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;
        
        const isLeftSwipe = distanceX > 50;
        const isRightSwipe = distanceX < -50;
        const isVerticalSwipe = Math.abs(distanceY) > 50;

        if (!isVerticalSwipe) {
            if (isLeftSwipe && onSwipeLeft) {
                onSwipeLeft();
            } else if (isRightSwipe && onSwipeRight) {
                onSwipeRight();
            }
        }
        
        setTouchStart(null);
    };

    return { onTouchStart, onTouchEnd };
}
