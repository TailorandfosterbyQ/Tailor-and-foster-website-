const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Who We Are
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8">
            A Unique Group of <span className="font-semibold">Experts</span>
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mb-10" />
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Tailor & Foster provides expert advice and project management in real estate. 
            We are not influenced by any predetermined supply route. Our path is our own 
            and decisions are yours to make.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
