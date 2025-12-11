const { useState, useEffect } = React;

function AnimatedHeadline({ children }){
  // simple letter fade-in with delay
  const letters = children.split("");
  return (
    <div aria-hidden="false" className="headline">
      <span className="animated-gradient">{letters.map((ch, i) => (
        <span key={i} style={{display:'inline-block', animation:`fadeIn .6s ${i*45}ms both`}}>{ch}</span>
      ))}</span>
      <span className="spark" style={{fontSize:'1.1em'}}>✈️</span>
    </div>
  );
}

function Hero(){
  return (
    <section className="hero" aria-labelledby="tripmind-hero">
      <div className="hero-grid">
        <div className="hero-card" style={{paddingRight: '2rem'}}>
          <div style={{display:'flex',gap:'1rem',alignItems:'center',marginBottom:'0.9rem'}}>
            <div className="lead-badge">AI · Travel</div>
            <div style={{color:'rgba(255,255,255,0.9)',fontWeight:600}}>Welcome to TripMind</div>
          </div>

          <h1 id="tripmind-hero">
            <AnimatedHeadline>Plan Your Next Adventure with AI</AnimatedHeadline>
          </h1>

          <p className="subtitle">Smart itineraries, real-time travel insights, and AI-powered planning.</p>

          <div className="cta-row">
            <button className="btn-primary" aria-label="Plan my trip">Plan My Trip</button>
            <button className="btn-ghost" aria-label="Learn more">Learn More</button>
          </div>

          <p className="small-note">Try TripMind — get tailored itineraries in seconds with live updates and recommendations.</p>
        </div>

        <aside className="info-stack" aria-label="Sample insights">
          <div className="info-card">
            <div className="info-title">Personalized Itineraries</div>
            <div className="info-desc">AI creates day-by-day plans based on your tastes and pace.</div>
          </div>
          <div className="info-card">
            <div className="info-title">Real-Time Alerts</div>
            <div className="info-desc">Weather, transit delays, and local events — updated live.</div>
          </div>
          <div className="info-card">
            <div className="info-title">Budget Smart</div>
            <div className="info-desc">Get recommendations that match your budget and priorities.</div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function App(){
  return (
    <div>
      <Hero />
      {/* future sections could go here */}
    </div>
  );
}

// Basic global animations via injecting style tag (keeps everything in one place)
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn{from{opacity:0; transform: translateY(6px)} to{opacity:1; transform:translateY(0)}}`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
