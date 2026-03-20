'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface AgentItem {
  name: string;
  description: string;
  icon: string;
  href: string;
  image: string;
}

interface CircularGalleryProps {
  items: AgentItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

export function CircularGallery({ items, radius: radiusProp = 520, autoRotateSpeed = 0.15 }: CircularGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [radius, setRadius] = useState(radiusProp);
  const dragStartRef = useRef(0);
  const rotationStartRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive radius
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 480) setRadius(280);
      else if (w < 768) setRadius(380);
      else setRadius(radiusProp);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, [radiusProp]);

  // Auto-rotation
  useEffect(() => {
    const autoRotate = () => {
      if (!isDragging && !isHovering) {
        setRotation(prev => prev + autoRotateSpeed);
      }
      animationFrameRef.current = requestAnimationFrame(autoRotate);
    };

    animationFrameRef.current = requestAnimationFrame(autoRotate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, isHovering, autoRotateSpeed]);

  // Drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = e.clientX;
    rotationStartRef.current = rotation;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [rotation]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartRef.current;
    setRotation(rotationStartRef.current + delta * 0.3);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Wheel handler for horizontal scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only intercept horizontal-ish scrolls or when hovering
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        setRotation(prev => prev + e.deltaX * 0.3);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const anglePerItem = 360 / items.length;

  return (
    <div
      ref={containerRef}
      className="circular-gallery"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div
        className="circular-gallery__scene"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem;

          // Calculate opacity based on how "front-facing" the card is
          const totalRotation = ((rotation % 360) + 360) % 360;
          const relativeAngle = ((itemAngle + totalRotation) % 360);
          const normalizedAngle = relativeAngle > 180 ? 360 - relativeAngle : relativeAngle;
          const opacity = Math.max(0.15, 1 - (normalizedAngle / 160));
          const scale = 0.7 + 0.3 * (1 - normalizedAngle / 180);

          return (
            <a
              key={item.name}
              href={item.href}
              className="circular-gallery__card"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                opacity,
              }}
              onClick={(e) => {
                // Prevent navigation if user was dragging
                if (Math.abs(rotation - rotationStartRef.current) > 5) {
                  e.preventDefault();
                }
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="circular-gallery__card-bg"
                draggable={false}
              />
              <div className="circular-gallery__card-overlay">
                <div className="circular-gallery__card-icon">
                  <i className={item.icon}></i>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="circular-gallery__card-link">
                  Saiba mais <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
