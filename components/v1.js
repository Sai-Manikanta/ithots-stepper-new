import React, { useState, useEffect, useRef } from 'react'; 
// Removed flex between
function StepperProductNew() {
    const [activeStep, setActiveStep] = useState(null);
    const [visibilityPercentage, setVisibilityPercentage] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        const element = scrollRef.current;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const elementHeight = rect.bottom - rect.top;
            const visiblePercentage = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
            const percentage = (visiblePercentage / elementHeight) * 100;
            setVisibilityPercentage(Math.min(100, Math.max(0, percentage)));
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const steps = [
        {
            id: 'step-1',
            title: 'Create your Pay.com account.',
            description: 'Fill out the quick form and click the button.',
            image: 'https://assets-global.website-files.com/60d1a7bfc316d6ff624f643c/63b6b933133ca720b91c72bd_Step%2001.webp'
        },
        {
            id: 'step-2',
            title: 'Check your email.',
            description: 'Open the message from Pay.com and click the link to open your business account activation form.',
            image: 'https://assets-global.website-files.com/60d1a7bfc316d6ff624f643c/63b6b933eb475a2de30743a8_Step%2002.webp'
        },
        {
            id: 'step-3',
            title: 'Answer a few questions',
            description: 'about your business and submit the required documentation.',
            image: 'https://assets-global.website-files.com/60d1a7bfc316d6ff624f643c/63b6b933133ca705711c72be_Step%2003.webp'
        },
        {
            id: 'step-4',
            title: 'We’ll review your application',
            description: 'and get back to you as soon as possible. In the meantime, you can start setting up your API integration.',
            image: 'https://assets-global.website-files.com/60d1a7bfc316d6ff624f643c/63b6b933e43b6b923e88fe52_Step%2004.webp'
        },
        {
            id: 'step-5',
            title: 'You can start receiving payments',
            description: 'once your account is approved!',
            image: 'https://assets-global.website-files.com/60d1a7bfc316d6ff624f643c/63bc2f7b32803f83952f30e8_Step%2005.png'
        }
    ];

    useEffect(() => {
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                console.log('Entry:', entry)
                if (entry.isIntersecting) {
                    const index = steps.findIndex(step => step.id === entry.target.id);
                    setActiveStep(index);
                } 
            });
        };

        const observerOptions = {
            threshold: 1
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        steps.forEach(step => observer.observe(document.getElementById(step.id)));

        return () => {
            observer.disconnect();
        };
    }, [steps]);

    const handleStepClick = (e,index) => {
        e.preventDefault();
        // setActiveStep(index);
        document.getElementById(steps[index].id).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="section sticky-split-stepper">
            <div className="container">
                <h2 className="centerd mb-20">How to start accepting online payments</h2>
                <div className="sticky-steps-section-wrapper" style={{ border: '2px solid gold'}}>
                    {/* ref={scrollRef} */}
                    <div className="wrapper-sticky-colum-steps" style={{ border: '1px solid blue' }}>
                        <div className="flex-horizontal">
                            <div className="stepper-text-links-wrapper" ref={scrollRef}>
                                {steps.map((step, index) => (
                                    <a key={index} href="#" className={`cursor-pointer stepper-num-link w-inline-block ${index === activeStep ? 'w--current' : ''}`} onClick={(e) => handleStepClick(e,index)}>
                                        <div className='cursor-pointer'>{index + 1}</div>
                                    </a>
                                ))}
                                <div className="grid-filler-inside-stepper" style={{ height: `${74 * (activeStep + 1)}px`}}></div>
                            </div>
                            <div className="stepper-text-links-wrapper no-bg">
                                {steps.map((step, index) => (
                                    <button key={index} style={{ backgroundColor: 'inherit'}} className={`cursor-pointer stepper-text-link w-inline-block ${index === activeStep ? 'w--current' : ''}`} onClick={(e) => handleStepClick(e,index)}>
                                        <div>{step.title}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="aside-sticky-content"  style={{ border: '1px solid blue', flexGrow: 1 }}>
                        {steps.map((step, index) => (
                            // , opacity: visibilityPercentage === 100 ? 1 : 0
                            <div key={index} id={step.id} className={`step-feature-wrapper`} style={{ willChange: "opacity", border: '1px solid white', opacity: visibilityPercentage >= 80 ? 1 : 0 }}>
                                {/* step-feature-wrapper */}
                                {/* split-content-wrapper new-id fixed-inside-step active-op */}
                                <div className={`split-content-wrapper new-id fixed-inside-step ${index === activeStep ? 'active-op' : ''}`} style={{ border: '1px solid white' }}>
                                    <div className="z-index-1">
                                        <h3 className='text-xl'>{step.title}<br /></h3>
                                        <p className="hide-on-mobile">{step.description}<br /></p>
                                    </div>
                                    <div className="image-z-inex-2">
                                        <img src={step.image} loading="lazy" width="290" alt="Step" className="image-stepper-mobile-mockup" />
                                    </div>
                                    <img src="https://assets-global.website-files.com/60d1a7bfc316d6ff624f643c/6203e943f4c9f1850c4e6b7c_Grid-2-dot.svg"
                                        loading="lazy" alt="" className="image-absolute opacity-20p hide-on-mobile" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StepperProductNew;
