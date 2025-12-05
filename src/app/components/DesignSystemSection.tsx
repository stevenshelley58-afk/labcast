"use client";

import { useState, useEffect } from "react";
import { PageSection } from "@/ui/PageSection";
import { DesktopWidget, MobileWidget, DesktopFullDesigner, MobileFullDesigner } from "../../../DesignSystemComponents.jsx";

/**
 * Build/Design System services section featuring an interactive design system widget.
 * Shows auto-cycling color previews and allows users to open a full designer modal.
 *
 * @example
 * ```tsx
 * <DesignSystemSection />
 * ```
 */
export function DesignSystemSection() {
  const [showDesktopModal, setShowDesktopModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    const mq = window.matchMedia("(max-width: 768px)");
    mq.addEventListener("change", checkMobile);
    return () => mq.removeEventListener("change", checkMobile);
  }, []);

  return (
    <>
      <PageSection tone="surface" border="top">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm text-muted mb-4">Build</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-[1.15] mb-6">
              Sites built as systems, not one-off pages
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Websites and apps that convert, not just look good. Clean code, fast load times, built for real business outcomes.
            </p>
            <ul className="space-y-3 text-base text-muted">
              <li className="flex items-start">
                <span className="mr-3 text-foreground">—</span>
                <span>Design systems that keep your brand consistent</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-foreground">—</span>
                <span>Shopify &amp; custom builds tuned for speed</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-foreground">—</span>
                <span>Launch pages without starting from a blank canvas each time</span>
              </li>
            </ul>
          </div>
          <div className="w-full overflow-hidden">
            {isMobile ? (
              <div className="max-w-sm mx-auto [&>section]:!p-0 [&>section_h2]:!hidden">
                <MobileWidget onOpenFullDesigner={() => setShowMobileModal(true)} />
              </div>
            ) : (
              <div className="max-w-lg mx-auto [&>section]:!p-0 [&>section_h2]:!hidden">
                <DesktopWidget onOpenFullDesigner={() => setShowDesktopModal(true)} />
              </div>
            )}
          </div>
        </div>
      </PageSection>

      {/* Modals */}
      {showDesktopModal && (
        <DesktopFullDesigner onClose={() => setShowDesktopModal(false)} />
      )}
      {showMobileModal && (
        <MobileFullDesigner onClose={() => setShowMobileModal(false)} />
      )}
    </>
  );
}