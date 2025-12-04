/**
 * Hero section headline used on the Render Vault landing page.
 *
 * @example
 * ```tsx
 * <Hero />
 * ```
 */
export default function Hero() {
    return (
        <section className="min-h-screen flex items-center pt-8 pb-20 px-6 md:px-0">
            <div className="max-w-[900px] mx-auto w-full flex flex-col items-center text-center gap-6">
                <div className="flex flex-col gap-2">
                    <div className="text-4xl md:text-6xl font-medium tracking-tight text-text-ink leading-[1.1]">
                        No models
                    </div>
                    <div className="text-4xl md:text-6xl font-medium tracking-tight text-text-ink leading-[1.1]">
                        No venue
                    </div>
                    <div className="text-4xl md:text-6xl font-medium tracking-tight text-text-ink leading-[1.1]">
                        No photographer
                    </div>
                </div>
                <p className="text-lg md:text-xl text-text-subtle leading-relaxed max-w-2xl">
                    Digitally generated images for all business
                </p>
            </div>
        </section>
    );
}
