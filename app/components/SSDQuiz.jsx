import React, { useState, useEffect } from 'react';

// Funnel Analytics Module
const FunnelAnalytics = {
  events: [],
  
  track(event, data = {}) {
    const entry = {
      event,
      data,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    };
    this.events.push(entry);
    console.log('📊 Funnel Event:', entry);
  },
  
  getSessionId() {
    if (!window.sessionId) {
      window.sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
    }
    return window.sessionId;
  }
};

// Testimonials Data
const testimonials = [
  {
    name: "Aurora Filipescu",
    reviews: "4 reviews",
    timeAgo: "2 months ago",
    text: "I just got a letter that my case has a favourable decision and I am so happy to finally get an answer I waited for almost 2 years to receive. I couldn't do it without my lawyer, Charles G. and his team, Rebecca, the medical record specialist, Lisa and Caitlin. Thank you so much for all your help!",
    initials: "AF",
    color: "#4CAF50"
  },
  {
    name: "Sheila Gorden",
    reviews: "3 reviews",
    timeAgo: "5 months ago",
    text: "I am very satisfied although it took awhile the team continued to fight on my behalf until I was approved for my Disability benefits. So, I am very grateful for their services and would recommend them to anyone having a difficult time getting their case approved for Disability.",
    initials: "SG",
    color: "#9C27B0"
  },
  {
    name: "Lisa Tesmer",
    reviews: "6 reviews · 3 photos",
    timeAgo: "6 months ago",
    text: "This firm was excellent! It took a long time, but with an excellent outcome. I am thrilled to have you by my side. I have been recommending people to this firm and will continue to do so. Thank you so much for all the help. The trial lawyer was excellent as well. She really spoke up for me and we received a favorable decision on the spot. Amazing Lady!",
    initials: "LT",
    color: "#2196F3"
  },
  {
    name: "Linda Kennedy",
    reviews: "1 review",
    timeAgo: "2 months ago",
    text: "I appreciated having the legal support in assisting me with applying for disability. I felt reassured in knowing they were there for me. I was approved & I am very grateful. I would highly recommend them to others. Thank you so much!",
    initials: "LK",
    color: "#FF9800"
  }
];

// Star Rating Component
const StarRating = ({ rating = 5 }) => (
  <div className="flex gap-0.5">
    {[...Array(rating)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ testimonial, isActive }) => (
  <div 
    className={`bg-white rounded-xl p-5 shadow-lg border border-slate-100 transition-all duration-500 ${
      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'
    }`}
  >
    <div className="flex items-start gap-3 mb-3">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
        style={{ backgroundColor: testimonial.color }}
      >
        {testimonial.initials}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-slate-800 text-sm">{testimonial.name}</h4>
        <p className="text-xs text-slate-400">{testimonial.reviews}</p>
      </div>
      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
    </div>
    <div className="flex items-center gap-2 mb-2">
      <StarRating />
      <span className="text-xs text-slate-400">{testimonial.timeAgo}</span>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
      {testimonial.text}
    </p>
  </div>
);

// Testimonials Carousel Component
const TestimonialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8">
      <div className="text-center mb-4">
        <p className="text-sm text-slate-500 font-medium">
          ⭐ Trusted by thousands of clients
        </p>
      </div>
      
      <div className="relative min-h-[180px]">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={index} 
            testimonial={testimonial} 
            isActive={index === activeIndex}
          />
        ))}
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-green-600 w-6' 
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Static Testimonials Grid (for results page)
const TestimonialsGrid = () => (
  <div className="mt-8">
    <h4 className="text-center text-slate-700 font-semibold mb-4">
      What Our Clients Say
    </h4>
    <div className="grid gap-4">
      {testimonials.slice(0, 2).map((testimonial, index) => (
        <div key={index} className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
              style={{ backgroundColor: testimonial.color }}
            >
              {testimonial.initials}
            </div>
            <div>
              <p className="font-medium text-slate-800 text-sm">{testimonial.name}</p>
              <StarRating />
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
            "{testimonial.text}"
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default function SSDQualificationQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [qualification, setQualification] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [animating, setAnimating] = useState(false);

  const steps = [
    {
      id: 'condition',
      question: 'Do you have a medical condition that prevents you from working?',
      subtext: 'This includes physical, mental, or emotional conditions',
      options: [
        { value: 'yes', label: 'Yes, I have a disabling condition', icon: '✓' },
        { value: 'no', label: 'No, I can still work', icon: '✗' }
      ]
    },
    {
      id: 'duration',
      question: 'Has your condition lasted or will it last at least 12 months?',
      subtext: 'Social Security requires conditions to be long-term',
      options: [
        { value: 'yes', label: 'Yes, 12 months or longer', icon: '📅' },
        { value: 'no', label: 'No, less than 12 months', icon: '⏱' }
      ]
    },
    {
      id: 'work_history',
      question: 'Have you worked and paid Social Security taxes?',
      subtext: 'Generally, you need work credits to qualify for SSDI',
      options: [
        { value: 'yes_recent', label: 'Yes, within the last 5-10 years', icon: '💼' },
        { value: 'yes_older', label: 'Yes, but it was a long time ago', icon: '📋' },
        { value: 'no', label: 'No or very little work history', icon: '🏠' }
      ]
    },
    {
      id: 'treatment',
      question: 'Are you receiving medical treatment for your condition?',
      subtext: 'Medical records are crucial for your claim',
      options: [
        { value: 'yes_regular', label: 'Yes, I see doctors regularly', icon: '🏥' },
        { value: 'yes_some', label: 'Some, but not consistently', icon: '💊' },
        { value: 'no', label: 'No, I cannot afford treatment', icon: '❌' }
      ]
    },
    {
      id: 'applied',
      question: 'Have you already applied for Social Security Disability?',
      subtext: 'We help at all stages of the process',
      options: [
        { value: 'no', label: 'No, I haven\'t applied yet', icon: '🆕' },
        { value: 'pending', label: 'Yes, my application is pending', icon: '⏳' },
        { value: 'denied', label: 'Yes, but I was denied', icon: '📝' }
      ]
    }
  ];

  useEffect(() => {
    FunnelAnalytics.track('quiz_started', { totalSteps: steps.length });
  }, []);

  const handleAnswer = (value) => {
    setAnimating(true);
    const newAnswers = { ...answers, [steps[currentStep].id]: value };
    setAnswers(newAnswers);
    
    FunnelAnalytics.track('question_answered', {
      step: currentStep + 1,
      questionId: steps[currentStep].id,
      answer: value
    });

    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setAnimating(false);
      } else {
        calculateQualification(newAnswers);
        setShowResult(true);
        setAnimating(false);
      }
    }, 300);
  };

  const calculateQualification = (ans) => {
    let score = 0;
    let factors = [];

    if (ans.condition === 'yes') { score += 30; factors.push('disabling condition'); }
    if (ans.duration === 'yes') { score += 25; factors.push('long-term condition'); }
    if (ans.work_history === 'yes_recent') { score += 20; factors.push('recent work history'); }
    else if (ans.work_history === 'yes_older') { score += 10; factors.push('work history'); }
    if (ans.treatment === 'yes_regular') { score += 15; factors.push('medical documentation'); }
    else if (ans.treatment === 'yes_some') { score += 8; }
    if (ans.applied === 'denied') { score += 10; factors.push('prior denial (appeals possible)'); }
    else if (ans.applied === 'no') { score += 5; }

    let result;
    if (score >= 70) {
      result = { level: 'high', message: 'You May Strongly Qualify', color: '#2E7D32' };
    } else if (score >= 40) {
      result = { level: 'medium', message: 'You May Qualify', color: '#F9A825' };
    } else {
      result = { level: 'low', message: 'We Should Review Your Case', color: '#6B21A8' };
    }

    result.factors = factors;
    result.score = score;
    setQualification(result);

    FunnelAnalytics.track('quiz_completed', {
      score,
      qualificationLevel: result.level,
      factors
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    FunnelAnalytics.track('lead_submitted', {
      qualificationLevel: qualification?.level,
      hasPhone: !!formData.phone,
      hasEmail: !!formData.email
    });

    console.log('📧 Lead Data:', { ...formData, ...answers, qualification });
    setSubmitted(true);
  };

  const handleExit = () => {
    FunnelAnalytics.track('exit_intent', {
      currentStep: currentStep + 1,
      lastQuestionId: steps[currentStep]?.id,
      answeredQuestions: Object.keys(answers).length
    });
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleExit);
    return () => window.removeEventListener('beforeunload', handleExit);
  }, [currentStep, answers]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100" style={{ fontFamily: "'Libre Franklin', 'Helvetica Neue', sans-serif" }}>
      {/* Header */}
      <header className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D8C3C 0%, #228B22 50%, #1E7A1E 100%)' }}>
        <div className="h-2" style={{ background: 'linear-gradient(90deg, #6B21A8 0%, #7C3AED 50%, #6B21A8 100%)' }} />
        
        <div className="relative">
          <div className="hidden md:block absolute left-0 top-0 h-full w-1/4 overflow-hidden opacity-90">
            <img src="/partner-left.png" alt="Partner" className="h-full w-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-green-600/50" />
          </div>
          
          <div className="hidden md:block absolute right-0 top-0 h-full w-1/4 overflow-hidden opacity-90">
            <img src="/partner-right.png" alt="Partner" className="h-full w-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-green-600/50" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 py-6 md:py-8">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Hiller Comerford Injury & Disability Law" className="h-20 md:h-28 w-auto" />
            </div>
            
            <h2 className="text-white text-xl md:text-2xl font-light text-center mb-2">
              Free Social Security Disability Evaluation
            </h2>
            <p className="text-white/80 text-center text-sm">
              Answer 5 quick questions to see if you may qualify
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {!showResult ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>Question {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #2D8C3C 0%, #228B22 100%)' }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div 
              className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ${animating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}
              style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(107, 33, 168, 0.08)' }}
            >
              <h3 className="text-2xl font-semibold text-slate-800 mb-2 leading-tight">
                {steps[currentStep].question}
              </h3>
              <p className="text-slate-500 mb-8 text-sm">
                {steps[currentStep].subtext}
              </p>

              <div className="space-y-3">
                {steps[currentStep].options.map((option, idx) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full text-left p-5 rounded-xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200 group flex items-center gap-4"
                    style={{ animationDelay: `${idx * 100}ms`, animation: 'fadeInUp 0.4s ease-out forwards' }}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-lg text-slate-700 group-hover:text-green-700 font-medium">
                      {option.label}
                    </span>
                    <span className="ml-auto text-slate-300 group-hover:text-green-500 transition-colors">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>No Win, No Fee</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Confidential</span>
              </div>
            </div>

            {/* Testimonials Carousel */}
            <TestimonialsCarousel />
          </>
        ) : !submitted ? (
          /* Results & Lead Form */
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)' }}>
            {/* Result Banner */}
            <div 
              className="p-8 text-center text-white relative overflow-hidden"
              style={{ background: qualification?.level === 'high' ? 'linear-gradient(135deg, #2D8C3C 0%, #228B22 100%)' : qualification?.level === 'medium' ? 'linear-gradient(135deg, #F9A825 0%, #FF8F00 100%)' : 'linear-gradient(135deg, #6B21A8 0%, #7C3AED 100%)' }}
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
              </div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-4">
                  {qualification?.level === 'high' ? '🎉' : qualification?.level === 'medium' ? '👍' : '📋'}
                </div>
                <h3 className="text-3xl font-bold mb-2">{qualification?.message}</h3>
                <p className="text-white/90">Based on your answers, our team should review your case</p>
                
                {qualification?.factors.length > 0 && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {qualification.factors.map((factor, i) => (
                      <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-sm">{factor}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Lead Capture Form */}
            <div className="p-8">
              <h4 className="text-xl font-semibold text-slate-800 mb-2 text-center">
                Get Your Free Case Evaluation
              </h4>
              <p className="text-slate-500 text-center mb-6 text-sm">
                A member of our team will contact you within 24 hours
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #2D8C3C 0%, #228B22 100%)', boxShadow: '0 4px 20px rgba(45, 140, 60, 0.4)' }}
                >
                  Request Free Consultation →
                </button>

                <p className="text-xs text-slate-400 text-center mt-4">
                  By submitting, you agree to be contacted by Hiller Comerford regarding your case.
                  Your information is confidential and secure.
                </p>
              </form>

              {/* Testimonials on Results Page */}
              <TestimonialsGrid />
            </div>
          </div>
        ) : (
          /* Thank You State */
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)' }}>
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2D8C3C 0%, #228B22 100%)' }}>
              <span className="text-4xl text-white">✓</span>
            </div>
            
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Thank You, {formData.name.split(' ')[0]}!
            </h3>
            
            <p className="text-slate-600 mb-6 text-lg">
              Your free case evaluation request has been received.
            </p>
            
            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <h4 className="font-semibold text-slate-700 mb-3">What Happens Next?</h4>
              <div className="space-y-3 text-left text-sm text-slate-600">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">1</span>
                  <span>Our team will review your responses</span>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">2</span>
                  <span>An attorney will call you within 24 hours</span>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">3</span>
                  <span>We'll discuss your options at no cost</span>
                </div>
              </div>
            </div>

            {/* Featured Testimonial on Thank You */}
            <div className="bg-green-50 rounded-xl p-5 mb-6 text-left">
              <div className="flex items-center gap-2 mb-2">
                <StarRating />
                <span className="text-xs text-slate-500">Verified Client</span>
              </div>
              <p className="text-slate-600 text-sm italic">
                "{testimonials[0].text.slice(0, 150)}..."
              </p>
              <p className="text-slate-800 font-medium text-sm mt-2">— {testimonials[0].name}</p>
            </div>

            <div className="flex items-center justify-center gap-4 text-slate-500">
              <span className="text-sm">Questions? Call us:</span>
              <a href="tel:+1XXXXXXXXXX" className="font-bold text-lg" style={{ color: '#2D8C3C' }}>
                (XXX) XXX-XXXX
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Hiller Comerford Injury & Disability Law. All rights reserved.</p>
        <p className="mt-1">
          <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          {' · '}
          <a href="#" className="hover:text-slate-600">Terms of Service</a>
        </p>
      </footer>

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500;600;700&display=swap');
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        * { box-sizing: border-box; }
        
        input:focus { box-shadow: 0 0 0 3px rgba(45, 140, 60, 0.1); }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
