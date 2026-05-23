import { Wrench, History, Lock, ShieldCheck } from 'lucide-react';
import { WHY_CHOOSE } from '../data';

export default function WhyChoose() {
  const getIcon = (name: string, className: string) => {
    switch (name) {
      case 'Wrench': return <Wrench className={className} />;
      case 'History': return <History className={className} />;
      case 'Lock': return <Lock className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  return (
    <section 
      id="why-choose-section"
      className="py-16 md:py-24 bg-white border-y border-slate-100 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Title and subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <span className="text-xs uppercase tracking-widest text-brand-500 font-bold block">
            The Super Cleaners Difference
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-slate-900 tracking-tight leading-tight">
            Why Choose <span className="italic font-serif text-brand-500">Super Cleaners</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto">
            We hold ourselves to absolute pristine standards, aligning state-of-the-art machinery with vetted professionals.
          </p>
        </div>

        {/* Why Choose Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CHOOSE.map((item, index) => (
            <div
              key={item.id}
              className="group relative p-8 rounded-2xl bg-white border border-slate-100/80 hover:border-brand-500/30 hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center justify-between"
            >
              <div className="space-y-4">
                {/* Floating animated icon outline */}
                <div className="mb-6 mx-auto w-12 h-12 flex items-center justify-center rounded-xl bg-brand-50 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  {getIcon(item.iconName, "w-5 h-5")}
                </div>

                <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Action helper line */}
              <div className="mt-6 w-6 h-1 bg-slate-100 group-hover:w-12 group-hover:bg-brand-500 rounded-full transition-all duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
